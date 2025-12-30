/* ---------------------------
   Helpers
--------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const GLOVO_URL = "https://glovoapp.com/es/es/barcelona/stores/salette-poke-and-fresh-salads-barcelona?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action";

const HOURS = {
  monThu: "12:00–21:00",
  friSat: "13:00–22:00",
  sun: "Closed"
};

const HOURS_ES = {
  monThu: "12:00–21:00",
  friSat: "13:00–22:00",
  sun: "Cerrado"
};

const translations = {
  en: {
    "a11y.skip": "Skip to content",
    "nav.menu": "Menu",
    "nav.about": "About us",
    "nav.location": "Location",
    "nav.order": "Order",

    "hero.title": "Fresh Salads & Poke in Gràcia",
    "hero.lead": "Healthy, fast and delicious — made daily with quality ingredients.",
    "hero.ctaMenu": "Explore menu",
    "hero.ctaAbout": "Meet the team",
    "hero.ctaFind": "Find us",
    "hero.hoursLabel": "Opening hours",
    "hero.phoneLabel": "Phone",

    "menu.title": "Menu",
    "menu.orderBtn": "Order on Glovo",
    "menu.callBtn": "Call",
    "menu.tabs.all": "All",
    "menu.tabs.best": "Best sellers",
    "menu.tabs.bowls": "House poke bowls",
    "menu.tabs.combo": "Combo deals",
    "menu.tabs.drinks": "Drinks",

    "about.title": "About us",
    "about.lead": "Meet the people behind Salette — good vibes, care and consistency.",
    "about.follow": "Follow us on Instagram",

    "team.linda.text": "Calm and focused — keeps the station organized and running smoothly, bringing steady energy to every shift.",
    "team.linda.b1": "Favorite bowl: Crazy Salmon",
    "team.linda.b2": "Loves spicy sauce",
    "team.linda.b3": "Enjoys reading, videogames & painting",

    "team.zaya.text": "Warm, bright and dedicated — brings good energy and rhythm to the team, and genuinely cares about everyone’s well-being.",
    "team.zaya.b1": "Favorite dish: Korean Bibimbap",
    "team.zaya.b2": "Always brings good vibes",
    "team.zaya.b3": "When not prepping bowls, you might catch her dancing",

    "team.oriana.text": "Extroverted and welcoming — makes every guest feel at home with her contagious energy and warmth.",
    "team.oriana.b1": "Favorite poke: Chicken Karaage",
    "team.oriana.b2": "Plays the violin",
    "team.oriana.b3": "Loves chatting with customers",

    "loc.title": "Find us",
    "loc.address": "Carrer de Bailèn, 233 · Gràcia · 08037 Barcelona, Spain",
    "loc.hoursLabel": "Opening hours",
    "loc.phoneLabel": "Phone",

    "footer.tagline": "Fresh Salads & Poke · Barcelona",

    // Tooltip text for logo theme toggle
    "theme.toDark": "Choose dark theme",
    "theme.toLight": "Choose light theme",
  },

  es: {
    "a11y.skip": "Saltar al contenido",
    "nav.menu": "Menú",
    "nav.about": "Sobre nosotros",
    "nav.location": "Ubicación",
    "nav.order": "Pedir",

    "hero.title": "Ensaladas frescas y poke en Gràcia",
    "hero.lead": "Sano, rápido y delicioso — preparado a diario con ingredientes de calidad.",
    "hero.ctaMenu": "Ver menú",
    "hero.ctaAbout": "Conoce al equipo",
    "hero.ctaFind": "Cómo llegar",
    "hero.hoursLabel": "Horario",
    "hero.phoneLabel": "Teléfono",

    "menu.title": "Menú",
    "menu.orderBtn": "Pedir en Glovo",
    "menu.callBtn": "Llamar",
    "menu.tabs.all": "Todo",
    "menu.tabs.best": "Lo más vendido",
    "menu.tabs.bowls": "Poke bowls",
    "menu.tabs.combo": "Combos",
    "menu.tabs.drinks": "Bebidas",

    "about.title": "Sobre nosotros",
    "about.lead": "Conoce a las personas detrás de Salette — buena vibra, cuidado y constancia.",
    "about.follow": "Síguenos en Instagram",

    "team.linda.text": "Tranquila y centrada — mantiene la estación organizada y funcionando perfecto, con una energía constante en cada turno.",
    "team.linda.b1": "Poke favorito: Crazy Salmon",
    "team.linda.b2": "Le encanta la salsa picante",
    "team.linda.b3": "Le gusta leer, los videojuegos y pintar",

    "team.zaya.text": "Cálida, radiante y dedicada — aporta buena vibra y ritmo al equipo, y se preocupa genuinamente por el bienestar de todos.",
    "team.zaya.b1": "Plato favorito: Korean Bibimbap",
    "team.zaya.b2": "Siempre con buena vibra",
    "team.zaya.b3": "Si no está preparando bowls, probablemente esté bailando",

    "team.oriana.text": "Extrovertida y cercana — hace que cada visita se sienta especial con su energía y calidez.",
    "team.oriana.b1": "Poke favorito: Chicken Karaage",
    "team.oriana.b2": "Toca el violín",
    "team.oriana.b3": "Le encanta conversar con los clientes",

    "loc.title": "Cómo llegar",
    "loc.address": "Carrer de Bailèn, 233 · Gràcia · 08037 Barcelona, España",
    "loc.hoursLabel": "Horario",
    "loc.phoneLabel": "Teléfono",

    "footer.tagline": "Fresh Salads & Poke · Barcelona",

    // Tooltip text for logo theme toggle
    "theme.toDark": "Elegir tema oscuro",
    "theme.toLight": "Elegir tema claro",
  }
};

/* ---------------------------
   Theme (logo toggles theme)
--------------------------- */
function getTheme() {
  return localStorage.getItem("salette_theme") || "light";
}
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("salette_theme", theme);
  updateLogoForTheme(theme);
  updateThemeTooltip();
}

async function updateLogoForTheme(theme) {
  const logo = document.getElementById("brandLogo");
  if (!logo) return;

  const nextSrc = theme === "dark" ? logo.dataset.logoDark : logo.dataset.logoLight;

  // Stoppar “blink” genom att INTE sätta src om den redan är rätt
  if (logo.getAttribute("src") === nextSrc) return;

  // Preloada bilden innan vi byter src (minskar flash)
  const img = new Image();
  img.src = nextSrc;

  try { await img.decode(); } catch (_) {}

  logo.classList.add("is-swapping");
  logo.src = nextSrc;

  // liten fade-in istället för blink
  requestAnimationFrame(() => logo.classList.remove("is-swapping"));
}


function updateThemeTooltip() {
  const brand = $("#brandToggle");
  if (!brand) return;

  const lang = getLang();
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  // Tooltip describes what will happen on click (switch to the other theme)
  const key = theme === "dark" ? "theme.toLight" : "theme.toDark";
  const text = translations[lang]?.[key] || translations.en[key];
  brand.setAttribute("title", text);
}

/* ---------------------------
   Language dropdown
--------------------------- */
function getLang() {
  return localStorage.getItem("salette_lang") || "en";
}

function setLang(lang) {
  localStorage.setItem("salette_lang", lang);
  const label = $("#langLabel");
  if (label) label.textContent = lang.toUpperCase();
  applyI18n(lang);
  setOpeningHours(lang);
  updateThemeTooltip();
}

function applyI18n(lang) {
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang]?.[key] ?? translations.en[key];
    if (value) el.textContent = value;
  });

  // Update document lang
  document.documentElement.lang = lang;
}

function initLangDropdown() {
  const dd = $("#langDropdown");
  const btn = $("#langBtn");
  if (!dd || !btn) return;

  const toggle = () => {
    dd.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", dd.classList.contains("is-open") ? "true" : "false");
  };

  btn.addEventListener("click", (e) => { e.preventDefault(); toggle(); });

  $$(".menu-item", dd).forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      setLang(lang);
      dd.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------------------------
   Opening hours formatting
--------------------------- */
function setOpeningHours(lang) {
  const hero = $("#hoursValue");
  const loc = $("#locHoursValue");
  const h = (lang === "es") ? HOURS_ES : HOURS;

  const lines = [
    (lang === "es") ? `Lun–Jue ${h.monThu}` : `Mon–Thu ${h.monThu}`,
    (lang === "es") ? `Vie–Sáb ${h.friSat}` : `Fri–Sat ${h.friSat}`,
    (lang === "es") ? `Dom ${h.sun}` : `Sun ${h.sun}`,
  ].join("<br>");

  if (hero) hero.innerHTML = lines;
  if (loc) loc.innerHTML = lines;
}

/* ---------------------------
   Menu data + filtering
   IMPORTANT: category ids must match tabs
   tabs: all | best | bowls | combo | drinks
--------------------------- */
const menuItems = [
  // Bowls
  { title: "Korean Bibimbap", price: "€13.50", cat: ["bowls","best"], desc: "Chicken or vegetarian, rice, mixed salad, kimchi, pickled red cabbage, carrots, tamago, fried egg, teriyaki & Korean spicy sauce, seaweed flakes & sesame." },
  { title: "Crazy Salmon (L)", price: "€12.50", cat: ["bowls","best"], desc: "Marinated salmon, sushi rice, mixed salad, edamame, wakame salad, mango, avocado, sushi ginger, cucumber. Teriyaki & sriracha mayo, crispy onion & sesame." },
  { title: "Spicy Tuna (L)", price: "€12.50", cat: ["bowls"], desc: "Marinated tuna, sushi rice, mixed salad, edamame, wakame salad, mango, avocado, sushi ginger, cucumber. Teriyaki & sriracha mayo, crispy onion & sesame." },
  { title: "Vegetarian/Vegan (L)", price: "€12.50", cat: ["bowls"], desc: "Sushi tofu, sushi rice, mixed salad, edamame, wakame salad, mango, avocado, sushi ginger, cucumber. Teriyaki & crispy onion & sesame." },
  { title: "Crispy Tempura (L)", price: "€12.50", cat: ["bowls"], desc: "Fried tempura shrimp, sushi rice, mixed salad, edamame, wakame salad, mango, avocado, sushi ginger, cucumber. Teriyaki & sriracha mayo, crispy onion & sesame." },
  { title: "Chicken Karaage (L)", price: "€12.50", cat: ["bowls"], desc: "Fried karaage chicken, sushi rice, edamame, mixed salad, wakame salad, mango, avocado, sushi ginger, cucumber. Teriyaki & sriracha mayo, crispy onion & sesame." },

  // Smaller bowls / extras (optional)
  { title: "Crazy Salmon (S)", price: "€9.50", cat: ["bowls"], desc: "Smaller size. Same ingredients as Crazy Salmon (L)." },
  { title: "Spicy Tuna (S)", price: "€9.50", cat: ["bowls"], desc: "Smaller size. Same ingredients as Spicy Tuna (L)." },
  { title: "Vegetarian/Vegan (S)", price: "€9.50", cat: ["bowls"], desc: "Smaller size. Same ingredients as Vegetarian/Vegan (L)." },

  // Combo deals (this was missing before because cat id didn’t match)
  { title: "Chicken Combo", price: "€13.00", cat: ["combo"], desc: "Chicken Karaage Poke Bowl (S) + Gyoza Chicken or/and Vegetable (3 pcs) + water or soda." },
  { title: "Veggie Combo", price: "€13.00", cat: ["combo"], desc: "Vegetarian/Vegan Poke Bowl (S) + Gyoza Vegetarian (3 pcs) + water or soda." },

  // Drinks
  { title: "Kombucha Ginger & Lime", price: "€3.90", cat: ["drinks"], desc: "Ginger and lime flavour kombucha." },
  { title: "Kombucha Piña Colada", price: "€3.90", cat: ["drinks"], desc: "Piña colada flavour kombucha." },
  { title: "Kombucha Kombujito", price: "€3.90", cat: ["drinks"], desc: "Kombujito flavour kombucha." },
  { title: "Kombucha Red Fruits", price: "€3.90", cat: ["drinks"], desc: "Red fruits flavour kombucha." },
  { title: "Kombucha Super Green", price: "€3.90", cat: ["drinks"], desc: "Super green flavour kombucha." },
  { title: "Coke Zero", price: "€3.25", cat: ["drinks"], desc: "Can." },
  { title: "Fuze Tea", price: "€3.25", cat: ["drinks"], desc: "Can." },
  { title: "Sprite", price: "€3.25", cat: ["drinks"], desc: "Can." },
  { title: "Fanta", price: "€3.25", cat: ["drinks"], desc: "Can." },
  { title: "Water", price: "€2.60", cat: ["drinks"], desc: "Water 50cl." },
];

function renderMenu(tab = "all") {
  const grid = $("#menuGrid");
  if (!grid) return;

  const items = menuItems.filter(it => tab === "all" ? true : it.cat.includes(tab));

  grid.innerHTML = items.map(it => `
    <article class="item-card">
      <div class="item-head">
        <div class="item-title">${escapeHtml(it.title)}</div>
        <div class="item-price">${escapeHtml(it.price)}</div>
      </div>
      <div class="item-desc">${escapeHtml(it.desc)}</div>
    </article>
  `).join("");
}

function initTabs() {
  const tabs = $$("#menuTabs .tab");
  if (!tabs.length) return;

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("is-active"));
      t.classList.add("is-active");
      const tab = t.dataset.tab;
      renderMenu(tab);
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* ---------------------------
   External buttons
--------------------------- */
function initActionButtons() {
  const order = $("#orderBtn");
  const orderGlovo = $("#orderGlovoBtn");
  if (order) order.href = GLOVO_URL;
  if (orderGlovo) orderGlovo.href = GLOVO_URL;
}

/* ---------------------------
   Brand click: scroll top + theme toggle
--------------------------- */
function initBrandToggle() {
  const brand = $("#brandToggle");
  if (!brand) return;

  brand.addEventListener("click", (e) => {
    e.preventDefault();

    // Smooth scroll to top (single-page feel)
    $("#top")?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Toggle theme
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

/* ---------------------------
   Boot
--------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Theme first (so logo uses correct file)
  setTheme(getTheme());

  // Lang
  initLangDropdown();
  setLang(getLang());

  // Hours
  setOpeningHours(getLang());

  // Menu
  renderMenu("all");
  initTabs();

  // Buttons
  initActionButtons();

  // Brand toggle
  initBrandToggle();
});
