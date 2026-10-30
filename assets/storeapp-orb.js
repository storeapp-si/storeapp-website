(() => {
  "use strict";
  if (window.__storeAppOrbReady) return;
  window.__storeAppOrbReady = true;

  const style = document.createElement("style");
  style.textContent = `
    #sa-orb-launcher{position:fixed;right:22px;bottom:24px;z-index:9998;width:62px;height:62px;border:0;border-radius:50%;padding:3px;cursor:grab;touch-action:none;background:linear-gradient(135deg,#08d9ff 0%,#246bff 48%,#a52cff 100%);box-shadow:0 0 0 1px #70d9ff66,0 0 24px #176dff88,0 8px 26px #0008;transition:opacity .22s,transform .22s; -webkit-tap-highlight-color:transparent}
    #sa-orb-launcher:active{cursor:grabbing;transform:scale(.94)}
    #sa-orb-launcher::before{content:"";position:absolute;inset:5px;border-radius:50%;background:radial-gradient(circle at 32% 25%,#163b9b,#07163e 72%);box-shadow:inset 0 0 18px #0c83ff55}
    #sa-orb-launcher .sa-spark{position:relative;z-index:1;display:grid;place-items:center;width:100%;height:100%;color:#fff;font-size:31px;line-height:1;text-shadow:0 0 12px #fff}
    #sa-orb-launcher .sa-spark::after{content:"✦";position:absolute;margin:19px 0 0 23px;color:#19dfff;font-size:14px;text-shadow:0 0 10px #19dfff}
    #sa-orb-launcher.sa-burst{animation:saBurst .58s ease-out forwards}
    @keyframes saBurst{0%{opacity:1;transform:scale(1)}35%{opacity:.95;transform:scale(1.18)}100%{opacity:0;transform:scale(.3);filter:blur(8px)}}
    #sa-orb-trail{position:fixed;z-index:9997;pointer-events:none;width:110px;height:110px;border-radius:50%;background:conic-gradient(from 20deg,#09eaff,#286bff,#9d35ff,#ff4bd8,#09eaff);filter:blur(18px);opacity:0;transform:translate(-50%,-50%) scale(.25)}
    #sa-orb-trail.sa-trailing{animation:saTrail .62s ease-out forwards}
    @keyframes saTrail{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}25%{opacity:.82}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8);filter:blur(27px)}}
    #sa-orb-menu{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(5,10,28,.76);backdrop-filter:blur(13px);-webkit-backdrop-filter:blur(13px);padding:22px}
    #sa-orb-menu.sa-open{display:flex;animation:saMenuIn .22s ease-out}
    @keyframes saMenuIn{from{opacity:0}to{opacity:1}}
    .sa-menu-wheel{position:relative;width:min(390px,88vw);height:min(390px,88vw);max-height:78vh;max-width:78vh;display:grid;place-items:center}
    .sa-menu-wheel::before{content:"";position:absolute;inset:7%;border-radius:50%;border:1px solid #236dff66;background:radial-gradient(circle,#09265c88 0%,#08163b44 62%,transparent 70%);box-shadow:0 0 70px #155bff22}
    .sa-menu-item{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;width:clamp(94px,25vw,116px);height:clamp(94px,25vw,116px);padding:8px;border:1px solid #1678ff;border-radius:50%;background:linear-gradient(145deg,#0b1b42f5,#07132ff5);color:#f5f8ff;text-decoration:none;text-align:center;font:600 clamp(11px,3vw,13px)/1.35 system-ui,sans-serif;box-shadow:0 0 22px #075cff35,inset 0 0 18px #0b4ed522;transition:transform .18s,border-color .18s,box-shadow .18s}
    .sa-menu-item:hover,.sa-menu-item:focus-visible{transform:scale(1.07);border-color:#22e2ff;box-shadow:0 0 30px #087dff88;outline:none}
    .sa-menu-item .sa-menu-icon{font-size:clamp(24px,7vw,31px);line-height:1;color:#65dfff;text-shadow:0 0 13px #168cff}
    .sa-menu-item:nth-child(1){top:0;left:50%;transform:translateX(-50%)}
    .sa-menu-item:nth-child(2){top:23%;right:-1%}
    .sa-menu-item:nth-child(3){bottom:5%;right:8%}
    .sa-menu-item:nth-child(4){bottom:5%;left:8%}
    .sa-menu-item:nth-child(5){top:23%;left:-1%}
    #sa-orb-close{position:absolute;top:4%;right:4%;width:43px;height:43px;border:1px solid #2b7cff;border-radius:50%;background:#091a3b;color:#fff;font-size:25px;cursor:pointer;box-shadow:0 0 18px #176bff66}
    @media(max-width:420px){.sa-menu-wheel{width:88vw;height:88vw}.sa-menu-item:nth-child(2){right:-3%}.sa-menu-item:nth-child(5){left:-3%}}
    @media(prefers-reduced-motion:reduce){#sa-orb-launcher,#sa-orb-menu,.sa-menu-item{transition:none!important;animation:none!important}#sa-orb-trail{display:none!important}}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.id = "sa-orb-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open StoreApp navigation");
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.innerHTML = '<span class="sa-spark" aria-hidden="true">✦</span>';
  document.body.appendChild(launcher);

  const trail = document.createElement("div");
  trail.id = "sa-orb-trail";
  document.body.appendChild(trail);

  const menu = document.createElement("div");
  menu.id = "sa-orb-menu";
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-modal", "true");
  menu.setAttribute("aria-label", "StoreApp quick navigation");
  menu.innerHTML = `
    <div class="sa-menu-wheel">
      <button id="sa-orb-close" type="button" aria-label="Close menu">×</button>
      <a class="sa-menu-item" href="/#directory"><span class="sa-menu-icon" aria-hidden="true">⌕</span><span>Discover tools</span></a>
      <a class="sa-menu-item" href="/tools/chatgpt/"><span class="sa-menu-icon" aria-hidden="true">✧</span><span>AI tools</span></a>
      <a class="sa-menu-item" href="/comparisons/"><span class="sa-menu-icon" aria-hidden="true">▤</span><span>Comparisons</span></a>
      <a class="sa-menu-item" href="/guides/"><span class="sa-menu-icon" aria-hidden="true">▧</span><span>Guides</span></a>
      <a class="sa-menu-item" href="/submit-tool/"><span class="sa-menu-icon" aria-hidden="true">＋</span><span>Suggest a tool</span></a>
    </div>`;
  document.body.appendChild(menu);

  const closeButton = menu.querySelector("#sa-orb-close");
  let opened = false, dragging = false, moved = false, startX = 0, startY = 0, offsetX = 0, offsetY = 0;
  let pointerId = null;

  function openMenu() {
    if (opened) return;
    opened = true;
    const rect = launcher.getBoundingClientRect();
    trail.style.left = (rect.left + rect.width / 2) + "px";
    trail.style.top = (rect.top + rect.height / 2) + "px";
    trail.classList.remove("sa-trailing");
    void trail.offsetWidth;
    trail.classList.add("sa-trailing");
    launcher.classList.add("sa-burst");
    window.setTimeout(() => { if (opened) launcher.style.display = "none"; }, 180);
    menu.classList.add("sa-open");
    closeButton.focus({preventScroll:true});
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!opened) return;
    opened = false;
    menu.classList.remove("sa-open");
    launcher.classList.remove("sa-burst");
    launcher.style.display = "block";
    document.body.style.overflow = "";
    launcher.focus({preventScroll:true});
  }

  launcher.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    dragging = true; moved = false; pointerId = event.pointerId;
    startX = event.clientX; startY = event.clientY;
    const rect = launcher.getBoundingClientRect();
    offsetX = rect.left; offsetY = rect.top;
    launcher.setPointerCapture(pointerId);
  });
  launcher.addEventListener("pointermove", event => {
    if (!dragging || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 7) moved = true;
    if (!moved) return;
    const x = Math.max(8, Math.min(window.innerWidth - launcher.offsetWidth - 8, offsetX + dx));
    const y = Math.max(8, Math.min(window.innerHeight - launcher.offsetHeight - 8, offsetY + dy));
    launcher.style.left = x + "px"; launcher.style.top = y + "px";
    launcher.style.right = "auto"; launcher.style.bottom = "auto";
  });
  launcher.addEventListener("pointerup", event => {
    if (event.pointerId !== pointerId) return;
    dragging = false;
    if (!moved) openMenu();
    pointerId = null;
  });
  launcher.addEventListener("pointercancel", () => { dragging = false; pointerId = null; });
  launcher.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMenu(); }
  });
  closeButton.addEventListener("click", closeMenu);
  menu.addEventListener("click", event => { if (event.target === menu) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && opened) closeMenu(); });
  window.addEventListener("resize", () => {
    if (launcher.style.left) {
      const x = Math.min(parseFloat(launcher.style.left), window.innerWidth - launcher.offsetWidth - 8);
      const y = Math.min(parseFloat(launcher.style.top), window.innerHeight - launcher.offsetHeight - 8);
      launcher.style.left = Math.max(8,x) + "px"; launcher.style.top = Math.max(8,y) + "px";
    }
  });
})();