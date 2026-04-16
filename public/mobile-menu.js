(function () {
  const mq = window.matchMedia("(max-width: 768px)");
  const menuBtn = document.querySelector(".header-menu-btn");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const panel = overlay?.querySelector(".mobile-menu-panel");
  const closeBtn = overlay?.querySelector(".mobile-menu-close");
  const menuLinks = overlay?.querySelectorAll(".mobile-menu-link") || [];

  if (!menuBtn || !overlay || !panel || !closeBtn) return;

  function openMenu() {
    if (!mq.matches) return;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      overlay.classList.add("is-open");
    });
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("mobile-menu-open");
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-menu-open");
    window.setTimeout(() => {
      if (!overlay.classList.contains("is-open")) {
        overlay.hidden = true;
      }
    }, 240);
  }

  menuBtn.setAttribute("aria-controls", "mobile-menu-panel");
  panel.id = "mobile-menu-panel";
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  mq.addEventListener("change", (event) => {
    if (!event.matches) {
      overlay.hidden = true;
      overlay.classList.remove("is-open");
      document.body.classList.remove("mobile-menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
})();
