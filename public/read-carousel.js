(function () {
  const mq = window.matchMedia("(max-width: 768px)");
  const section = document.querySelector(".desktop-section-read");
  if (!section) return;

  const viewport = section.querySelector(".read-carousel-viewport");
  const dots = section.querySelectorAll(".read-dot");
  const pagination = section.querySelector(".read-pagination");
  if (!viewport || !dots.length) return;

  function isSingleSlideMobile() {
    return mq.matches && viewport.scrollWidth <= viewport.clientWidth + 2;
  }

  function slideWidth() {
    return viewport.clientWidth || 1;
  }

  function activeIndex() {
    if (isSingleSlideMobile()) return 0;
    const w = slideWidth();
    return Math.min(dots.length - 1, Math.max(0, Math.round(viewport.scrollLeft / w)));
  }

  function scrollToSlide(i) {
    if (isSingleSlideMobile()) return;
    const w = slideWidth();
    viewport.scrollTo({ left: i * w, behavior: "smooth" });
  }

  function updateDots() {
    if (!mq.matches) return;
    const idx = activeIndex();
    dots.forEach((dot, i) => {
      const on = i === idx;
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function onScroll() {
    updateDots();
  }

  function onViewportKeydown(e) {
    if (!mq.matches || isSingleSlideMobile()) return;
    const i = activeIndex();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToSlide(Math.min(dots.length - 1, i + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToSlide(Math.max(0, i - 1));
    }
  }

  viewport.addEventListener("scroll", onScroll, { passive: true });
  viewport.addEventListener("keydown", onViewportKeydown);

  pagination?.addEventListener("click", (e) => {
    const dot = e.target.closest(".read-dot");
    if (!dot || !mq.matches) return;
    const i = [...dots].indexOf(dot);
    if (i >= 0) scrollToSlide(i);
  });

  const ro = new ResizeObserver(() => {
    if (mq.matches) updateDots();
  });
  ro.observe(viewport);

  mq.addEventListener("change", () => {
    if (mq.matches) updateDots();
    else {
      viewport.scrollLeft = 0;
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === 0);
        dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      });
    }
  });

  updateDots();
})();
