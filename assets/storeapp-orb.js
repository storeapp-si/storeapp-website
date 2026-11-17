(() => {
  "use strict";
  // Google AdSense publisher code. The homepage also includes the static tag in its HTML.
  // This shared script runs on the other site pages that load storeapp-orb.js.
  if (!document.querySelector('script[src*="adsbygoogle.js?client=ca-pub-4438206647405776"]')) {
    const adsenseScript = document.createElement("script");
    adsenseScript.async = true;
    adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4438206647405776";
    adsenseScript.crossOrigin = "anonymous";
    document.head.appendChild(adsenseScript);
  }


  // Google Analytics 4 — shared site script loaded by the site's HTML pages.
  const STOREAPP_GA4_ID = "G-GDLCV9JWV7";
  if (!window.__storeAppGA4Loaded) {
    window.__storeAppGA4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", STOREAPP_GA4_ID);
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + STOREAPP_GA4_ID;
    document.head.appendChild(gaScript);
  }


  // Shared purple-violet theme for all pages loading this site-wide script.
  if (!document.getElementById("storeapp-purple-theme")) {
    const themeStyle = document.createElement("style");
    themeStyle.id = "storeapp-purple-theme";
    themeStyle.textContent = `
      :root {
        color-scheme: dark;
        --bg: #100720;
        --panel: #241044;
        --panel-hover: #35145f;
        --border: #4b2b78;
        --text: #f7f2ff;
        --muted: #c0b2d8;
        --accent: #8b45f5;
        --green: #71e6c1;
      }
      html, body {
        background-color: #100720;
        color: #f7f2ff;
      }
      body {
        background-image:
          radial-gradient(ellipse at 50% 8%, rgba(111,35,190,.24), transparent 48%),
          linear-gradient(155deg,#100720 0%,#1b0a36 52%,#120824 100%);
      }
      header {
        background-color: rgba(20,7,42,.94);
        border-color: rgba(151,99,224,.28);
      }
      footer {
        background-color: #0c0618;
        border-color: rgba(151,99,224,.25);
      }
      main, section { color: #f7f2ff; }
      .panel, .tile, .card, .info-card, .principle, .faq-item,
      .answer, .synthesis, .comparison-card, .feature-card, .tool-card,
      .guide-card, .discovery-card, .partner-band, .closing-box {
        background-color: rgba(48,20,82,.82);
        border-color: rgba(157,111,220,.34);
      }
      .panel, .tile, .card, .info-card, .answer, .synthesis {
        box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
      }
      a { text-decoration-color: rgba(194,157,255,.55); }
      a:not(.button):not(.brand) { color: #d8c4ff; }
      h1, h2, h3, .brand span { text-decoration-color: rgba(181,132,255,.3); }
      .button, button, input[type="submit"], input[type="button"] {
        border-color: rgba(169,119,235,.42);
      }
      .primary, .button-primary, .search-button, button[type="submit"] {
        background: linear-gradient(135deg,#a34bff,#7134e8);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 4px 16px rgba(124,53,231,.24);
      }
      .button:not(.primary), .secondary, .page-button, .visit {
        background-color: rgba(78,39,126,.42);
        color: #eee5ff;
      }
      input, textarea, select {
        background-color: rgba(20,9,43,.88);
        border-color: rgba(151,105,211,.4);
        color: #f7f2ff;
      }
      th { background-color: rgba(76,39,121,.68); color: #e6d8ff; }
      td, th { border-color: rgba(151,105,211,.28); }
      .note, .callout, blockquote {
        background-color: rgba(72,35,112,.38);
        border-color: #a56aff;
      }
      ::selection { background: #8544d8; color: #fff; }
      @media (max-width: 700px) {
        body { background-image: linear-gradient(160deg,#100720,#1a0a32 58%,#100720); }
      }
    `;
    document.head.appendChild(themeStyle);
  }


  // Shared instant language selector. Google Website Translator handles page translation.
  if (!document.getElementById("sa-language-switcher")) {
    const languageStyle = document.createElement("style");
    languageStyle.textContent = `
      #sa-language-switcher{position:relative!important;z-index:10020!important;display:inline-flex!important;align-items:center;flex:0 0 auto;margin:4px 8px;font:600 13px/1.2 system-ui,sans-serif}
      #sa-language-trigger{display:flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid rgba(180,140,255,.48);border-radius:999px;background:rgba(39,17,68,.96);color:#fff;cursor:pointer;font:inherit;box-shadow:0 3px 14px #0003}
      #sa-language-trigger:focus-visible,#sa-language-options button:focus-visible{outline:2px solid #c6a4ff;outline-offset:2px}
      #sa-language-options{position:absolute;top:calc(100% + 8px);right:0;display:none;min-width:190px;max-height:min(70vh,420px);overflow:auto;padding:6px;border:1px solid rgba(180,140,255,.42);border-radius:14px;background:#1b0d30;box-shadow:0 12px 36px #0009}
      #sa-language-switcher.sa-language-open #sa-language-options{display:block}
      #sa-language-options button{display:flex;width:100%;align-items:center;gap:10px;padding:10px;border:0;border-radius:9px;background:transparent;color:#f7f2ff;text-align:left;font:500 14px system-ui,sans-serif;cursor:pointer}
      #sa-language-options button:hover{background:#43216b}
      #sa-language-options .sa-lang-flag{font-size:19px;width:25px;text-align:center}
      #sa-google-translate{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip-path:inset(50%)!important;white-space:nowrap!important}
      .goog-te-banner-frame,.skiptranslate iframe{display:none!important}
      body{top:0!important}
      @media(max-width:600px){#sa-language-switcher{margin:2px 0}#sa-language-trigger{padding:7px 9px}}
    `;
    document.head.appendChild(languageStyle);

    const languages = [
      {code:"en",name:"English",flag:"🇺🇸"},
      {code:"fr",name:"Français",flag:"🇫🇷"},
      {code:"es",name:"Español",flag:"🇪🇸"},
      {code:"pt",name:"Português",flag:"🇵🇹"},
      {code:"de",name:"Deutsch",flag:"🇩🇪"},
      {code:"ar",name:"العربية",flag:"🇸🇦"},
      {code:"zh-CN",name:"中文（简体）",flag:"🇨🇳"},
      {code:"ru",name:"Русский",flag:"🇷🇺"}
    ];
    const switcher = document.createElement("div");
    switcher.id = "sa-language-switcher";
    switcher.innerHTML = '<button id="sa-language-trigger" type="button" aria-haspopup="true" aria-expanded="false"><span id="sa-language-current-flag">🌐</span><span id="sa-language-current-name">Language</span><span aria-hidden="true">▾</span></button><div id="sa-language-options" role="menu" aria-label="Choose language"></div>';
    const nav = document.querySelector("header .wrap.nav, header .nav, header");
    if (nav) { const links = nav.querySelector(".nav-links"); if (links) nav.insertBefore(switcher, links); else nav.appendChild(switcher); }
    else document.body.insertBefore(switcher, document.body.firstChild);

    const trigger = switcher.querySelector("#sa-language-trigger");
    const options = switcher.querySelector("#sa-language-options");
    const currentFlag = switcher.querySelector("#sa-language-current-flag");
    const currentName = switcher.querySelector("#sa-language-current-name");
    let translateReady = false;
    let pendingLanguage = null;

    function setCurrent(code) {
      const selected = languages.find(item => item.code === code) || languages[0];
      currentFlag.textContent = selected.flag;
      currentName.textContent = selected.name;
    }
    function chooseLanguage(code) {
      setCurrent(code);
      switcher.classList.remove("sa-language-open");
      trigger.setAttribute("aria-expanded","false");
      if (code === "en") {
        document.cookie = "googtrans=/en/en;path=/;max-age=31536000;SameSite=Lax";
        document.cookie = "googtrans=/en/en;path=/;domain=" + location.hostname + ";max-age=31536000;SameSite=Lax";
        location.reload();
        return;
      }
      if (!translateReady) { pendingLanguage = code; return; }
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event("change",{bubbles:true}));
      } else {
        pendingLanguage = code;
      }
    }
    languages.forEach(item => {
      const option = document.createElement("button");
      option.type = "button";
      option.setAttribute("role","menuitem");
      option.innerHTML = '<span class="sa-lang-flag"></span><span></span>';
      option.children[0].textContent = item.flag;
      option.children[1].textContent = item.name;
      option.addEventListener("click",() => chooseLanguage(item.code));
      options.appendChild(option);
    });
    trigger.addEventListener("click",() => {
      const isOpen = switcher.classList.toggle("sa-language-open");
      trigger.setAttribute("aria-expanded",String(isOpen));
    });
    document.addEventListener("click",event => {
      if (!switcher.contains(event.target)) {
        switcher.classList.remove("sa-language-open");
        trigger.setAttribute("aria-expanded","false");
      }
    });
    const saved = (document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/) || [])[1];
    const savedLanguage = saved ? decodeURIComponent(saved) : "en";
    setCurrent(savedLanguage);

    const translateHost = document.createElement("div");
    translateHost.id = "sa-google-translate";
    document.body.appendChild(translateHost);
    window.googleTranslateElementInit = function() {
      if (!window.google || !google.translate) return;
      new google.translate.TranslateElement({
        pageLanguage:"en",
        includedLanguages:"fr,es,pt,de,ar,zh-CN,ru",
        autoDisplay:false
      },"sa-google-translate");
      translateReady = true;
      if (pendingLanguage) {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
          combo.value = pendingLanguage;
          combo.dispatchEvent(new Event("change",{bubbles:true}));
          pendingLanguage = null;
        }
      }
    };
    const translateScript = document.createElement("script");
    translateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    translateScript.async = true;
    document.head.appendChild(translateScript);
  }

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
    .sa-menu-item:nth-of-type(1){top:0;left:50%;transform:translateX(-50%)}
    .sa-menu-item:nth-of-type(2){top:23%;right:-1%}
    .sa-menu-item:nth-of-type(3){bottom:23%;right:-1%}
    .sa-menu-item:nth-of-type(4){bottom:0;left:50%;transform:translateX(-50%)}
    .sa-menu-item:nth-of-type(5){bottom:23%;left:-1%}
    .sa-menu-item:nth-of-type(6){top:23%;left:-1%}
    #sa-orb-close{position:absolute;top:4%;right:4%;width:43px;height:43px;border:1px solid #2b7cff;border-radius:50%;background:#091a3b;color:#fff;font-size:25px;cursor:pointer;box-shadow:0 0 18px #176bff66}
    @media(max-width:420px){.sa-menu-wheel{width:88vw;height:88vw}.sa-menu-item:nth-of-type(2){right:-3%}.sa-menu-item:nth-of-type(3){right:-3%}.sa-menu-item:nth-of-type(5){left:-3%}.sa-menu-item:nth-of-type(6){left:-3%}}
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
      <a class="sa-menu-item" href="/"><span class="sa-menu-icon" aria-hidden="true">⌂</span><span>Home</span></a>
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
    if (Math.hypot(dx, dy) > 14) moved = true;
    if (!moved) return;
    const x = Math.max(8, Math.min(window.innerWidth - launcher.offsetWidth - 8, offsetX + dx));
    const y = Math.max(8, Math.min(window.innerHeight - launcher.offsetHeight - 8, offsetY + dy));
    launcher.style.left = x + "px"; launcher.style.top = y + "px";
    launcher.style.right = "auto"; launcher.style.bottom = "auto";
  });
  launcher.addEventListener("pointerup", event => {
    if (event.pointerId !== pointerId) return;
    const wasDragged = moved;
    dragging = false;
    pointerId = null;
    moved = false;
    if (!wasDragged) openMenu();
  });
  // Pointer events handle touch and mouse taps. Keep click only for
  // keyboard and assistive-technology activation (detail === 0).
  launcher.addEventListener("click", event => {
    event.preventDefault();
    if (event.detail === 0) openMenu();
  });
  launcher.addEventListener("pointercancel", () => {
    dragging = false;
    pointerId = null;
    moved = false;
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