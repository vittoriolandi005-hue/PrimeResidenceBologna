document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  let progress = 0;
  let targetProgress = 0;
  let introFinished = false;

  // 10% più veloce rispetto alla versione precedente
  const SCROLL_DISTANCE = 900;

  // Fluidità del movimento
  const EASE = 0.085;

  let animationFrame = null;


  // =========================
  // AGGIORNA ANIMAZIONE
  // =========================

  function animateIntro() {

    if (introFinished) return;

    // Avvicina gradualmente il movimento al punto desiderato
    progress += (targetProgress - progress) * EASE;

    // Evita micro-movimenti alla fine
    if (Math.abs(targetProgress - progress) < 0.0005) {
      progress = targetProgress;
    }

    progress = Math.max(0, Math.min(1, progress));

    // Movimento fluido della schermata
    loader.style.transform =
      `translate3d(0, ${-progress * 100}%, 0)`;

    // Scomparsa graduale della scritta
    if (scrollEnter) {

      scrollEnter.style.opacity =
        Math.max(0, 1 - progress * 3);

      scrollEnter.style.transform =
        `translate3d(-50%, ${progress * 25}px, 0)`;
    }

    // Fine intro
    if (progress >= 0.999) {
      finishIntro();
      return;
    }

    animationFrame =
      requestAnimationFrame(animateIntro);
  }


  // =========================
  // AVVIA ANIMAZIONE
  // =========================

  function startAnimation() {

    if (animationFrame) return;

    animationFrame =
      requestAnimationFrame(animateIntro);
  }


  // =========================
  // FINE INTRO
  // =========================

  function finishIntro() {

    if (introFinished) return;

    introFinished = true;

    progress = 1;
    targetProgress = 1;

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    document.body.classList.remove("intro-active");

    document.body.style.overflow = "";

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }


  // =========================
  // MOUSE WHEEL
  // =========================

  window.addEventListener(
    "wheel",
    (event) => {

      if (introFinished) return;

      event.preventDefault();

      // Aumenta progressivamente il target
      targetProgress +=
        event.deltaY / SCROLL_DISTANCE;

      targetProgress =
        Math.max(0, Math.min(1, targetProgress));

      startAnimation();

    },
    { passive: false }
  );


  // =========================
  // TOUCH
  // =========================

  let touchStart = 0;

  window.addEventListener(
    "touchstart",
    (event) => {

      if (introFinished) return;

      touchStart =
        event.touches[0].clientY;

    },
    { passive: true }
  );


  window.addEventListener(
    "touchmove",
    (event) => {

      if (introFinished) return;

      const currentTouch =
        event.touches[0].clientY;

      const movement =
        touchStart - currentTouch;

      if (Math.abs(movement) > 1) {

        event.preventDefault();

        targetProgress +=
          movement / SCROLL_DISTANCE;

        targetProgress =
          Math.max(0, Math.min(1, targetProgress));

        touchStart = currentTouch;

        startAnimation();
      }

    },
    { passive: false }
  );


  // =========================
  // TASTIERA
  // =========================

  window.addEventListener(
    "keydown",
    (event) => {

      if (introFinished) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {

        event.preventDefault();

        targetProgress += 0.15;

        targetProgress =
          Math.min(1, targetProgress);

        startAnimation();
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
      ) {

        event.preventDefault();

        targetProgress -= 0.15;

        targetProgress =
          Math.max(0, targetProgress);

        startAnimation();
      }

    }
  );


  // =========================
  // NAVBAR
  // =========================

  const navbar =
    document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });


  // =========================
  // REVEAL ANIMATIONS
  // =========================

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // =========================
  // MOBILE MENU
  // =========================

  const menuButton =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

    });

  }


  // =========================
  // SMOOTH LINKS
  // =========================

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", function(event) {

        const targetId =
          this.getAttribute("href");

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      });

    });


  // =========================
  // YEAR
  // =========================

  const year =
    document.querySelector("#year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});
