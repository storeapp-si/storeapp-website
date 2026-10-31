const MAX_QUESTION_LENGTH = 3000;
const MAX_OUTPUT_TOKENS = 700;
const ALLOWED_ORIGIN = "https://storeapp.si";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Vary": "Origin"
    }
  });
}

async function askModel(apiKey, model, question, role, signal) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json",
      "HTTP-Referer": ALLOWED_ORIGIN,
      "X-Title": "StoreApp AI Debate"
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [
        { role: "system", content: role },
        { role: "user", content: question }
      ]
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.error?.message || "The AI provider rejected the request.";
    throw new Error(detail.slice(0, 240));
  }
  const answer = payload?.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim()) {
    throw new Error("The AI provider returned an empty answer.");
  }
  return answer.trim().slice(0, 12000);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestPost(context) {
  const request = context.request;
  const env = context.env || {};
  const origin = request.headers.get("Origin");
  if (origin && origin !== ALLOWED_ORIGIN) return json({ error: "Origin not allowed." }, 403);

  const requiredBindings = ["OPENROUTER_API_KEY", "OPENROUTER_MODEL_A", "OPENROUTER_MODEL_B"];
  const missingBindings = requiredBindings.filter((name) => {
    const value = env[name];
    return typeof value !== "string" || value.trim() === "";
  });
  if (missingBindings.length) {
    return json({
      error: "AI Debate runtime configuration is missing: " + missingBindings.join(", ") +
        ". Add these under the Pages Functions runtime Bindings / Variables and Secrets for the Production environment, then create a new deployment. Build-time variables alone are not available to Pages Functions."
    }, 503);
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Send the question as JSON." }, 415);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return json({ error: "Request is too large." }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON request." }, 400);
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return json({ error: "Enter a question first." }, 400);
  if (question.length > MAX_QUESTION_LENGTH) {
    return json({ error: "Question must be 3,000 characters or fewer." }, 400);
  }
  if (env.OPENROUTER_MODEL_A.trim() === env.OPENROUTER_MODEL_B.trim()) {
    return json({ error: "Configure two different model IDs to compare perspectives." }, 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("AI request timed out"), 55000);
  try {
    const system = "You are participating in a structured AI debate. Give a clear, independent, evidence-conscious answer. State assumptions, explain trade-offs, distinguish facts from opinions, and acknowledge uncertainty. Do not invent citations or claim to have browsed the web.";
    const [answerA, answerB] = await Promise.all([
      askModel(env.OPENROUTER_API_KEY, env.OPENROUTER_MODEL_A.trim(), question, system, controller.signal),
      askModel(env.OPENROUTER_API_KEY, env.OPENROUTER_MODEL_B.trim(), question, system, controller.signal)
    ]);

    const synthesisPrompt = "Compare the two model responses to the original question. Produce a balanced synthesis with these headings: Agreement, Key differences, Strongest points, What remains uncertain, Practical conclusion. Do not assume either answer is correct merely because it is confident. Do not invent sources.\n\nQUESTION:\n" +
      question + "\n\nMODEL A:\n" + answerA + "\n\nMODEL B:\n" + answerB;
    const synthesis = await askModel(
      env.OPENROUTER_API_KEY,
      env.OPENROUTER_MODEL_A.trim(),
      synthesisPrompt,
      "You are a neutral evaluator comparing AI answers. Be precise, fair and concise.",
      controller.signal
    );

    return json({
      models: { a: env.OPENROUTER_MODEL_A.trim(), b: env.OPENROUTER_MODEL_B.trim() },
      answers: { a: answerA, b: answerB },
      synthesis
    });
  } catch (error) {
    const message = error?.name === "AbortError"
      ? "The AI comparison timed out. Please try again."
      : (error?.message || "The AI comparison failed.");
    return json({ error: message }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
