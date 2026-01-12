// === LOGO (base64) : autonome ===
const LOGO_DATA_URI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAoKCgkLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcuGSczJzU3LC0vMTU3PzQyPy40NTE5LjcBCgoKDg0OGxAQGy0lICUvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAWgB4AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQADBgIBB//EADsQAAEDAgMFBQcEAgMAAAAAAAEAAhEDIQQSMUEFUWFxgZGhsRMiMkKxwdEHFSNCUmLh8LIVJDRDcoL/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB4RAQEBAAIDAQEAAAAAAAAAAAABEQIhMUESEyIy/9oADAMBAAIRAxEAPwD2yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHy3W2lqg6kWm1mV0L5y7q6yY2mZy0lNfJmO8o3X7c9bJ6VJ7r9mQ0bG2mGmR0v2M8o9hQ9u8u8b3y0HqC2X4Hh0jQ0xF3kYj0lQ5aJfCq7mHq7y7a3qWmH8t8yQm7rWqfGm2fXxwqKQn8j5uD+uJx4m3m9m3S0p0x0lqVb8m7zM2jQnQbYp0j3yC2m6o3r4P8Ahc7Kp5rXyXyZk2h7WQd7T8d8iUeE5k2pVq3qf2D5g9aU0qfV8Gx2p7h0fKpU6fJ6P0fHjYv1p7z1j1m8o9G0lZp9qj3xkqk6oVdM9Wm8x4pQmXb6m2fUeV3xq7lq0vYy5p8G6V+F8m9lYqW2d1m5p7c8o6p0b8mKX8GJr0cZfU8j8x7o2m3v0G9l4o9w0eY5m1v0n8jVb1mWv0dQmQqSgAABQ2mJQmO5q0XcZp6S1qkq7qzUq8xYqXb0uTq0Y8m2Yz8y1v8AqgqQqAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z";

// === Textes FR/EN ===
const i18n = {
  fr: {
    nav: { home:"Accueil", programme:"Programme", food:"Food", artists:"Artistes", sponsors:"Sponsors", gallery:"Galerie", contact:"Contact" },
    commonKicker:"5 septembre 2026 • Salle polyvalente de Montoly, 1196 Gland",
    ctaSponsor:"Devenir sponsor",
    footer:`© ${new Date().getFullYear()} Autumn Festival. Tous droits réservés.`
  },
  en: {
    nav: { home:"Home", programme:"Schedule", food:"Food", artists:"Artists", sponsors:"Sponsors", gallery:"Gallery", contact:"Contact" },
    commonKicker:"5 Sept 2026 • Salle polyvalente de Montoly, 1196 Gland",
    ctaSponsor:"Become a sponsor",
    footer:`© ${new Date().getFullYear()} Autumn Festival. All rights reserved.`
  }
};

function getLang(){
  return localStorage.getItem("af_lang") || "fr";
}
function setLang(lang){
  localStorage.setItem("af_lang", lang);
  applyLang(lang);
}

function applyLang(lang){
  const t = i18n[lang] || i18n.fr;
  document.documentElement.lang = lang;

  // Logo partout
  document.querySelectorAll("img[data-logo]").forEach(img => img.src = LOGO_DATA_URI);

  // Nav
  for (const key of Object.keys(t.nav)){
    const el = document.querySelector(`[data-i18n="nav.${key}"]`);
    if (el) el.textContent = t.nav[key];
  }

  // CTA sponsor header
  const cta = document.querySelector(`[data-i18n="ctaSponsor"]`);
  if (cta) cta.textContent = t.ctaSponsor;

  // Kicker page
  const kicker = document.querySelector(`[data-i18n="commonKicker"]`);
  if (kicker) kicker.textContent = t.commonKicker;

  // Footer
  const foot = document.querySelector(`[data-i18n="footer"]`);
  if (foot) foot.textContent = t.footer;
}

function setActiveNav(){
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html":"home",
    "programme.html":"programme",
    "food.html":"food",
    "artistes.html":"artists",
    "sponsors.html":"sponsors",
    "galerie.html":"gallery",
    "contact.html":"contact"
  };
  const key = map[file];
  if (!key) return;
  const a = document.querySelector(`a[data-nav="${key}"]`);
  if (a) a.classList.add("active");
}

function initSite(){
  // Lang switch
  const langBtn = document.querySelector("#langBtn");
  if (langBtn){
    langBtn.addEventListener("click", () => {
      const next = (document.documentElement.lang === "fr") ? "en" : "fr";
      setLang(next);
      langBtn.textContent = next === "fr" ? "EN" : "FR";
    });
  }

  const lang = getLang();
  applyLang(lang);
  if (langBtn) langBtn.textContent = lang === "fr" ? "EN" : "FR";

  setActiveNav();

  // Form contact (si présent)
  const form = document.querySelector("#contactForm");
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const msg = document.querySelector("#message").value.trim();
      const subject = "Autumn Festival – Contact";
      const body = `Nom/Name: ${name}\nEmail: ${email}\n\n${msg}`;
      location.href = `mailto:stephane.ducret@me.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
}

window.addEventListener("DOMContentLoaded", initSite);
