document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  // =====================================================
  // INTRO / SCROLL TO ENTER
  // =====================================================

  let progress = 0;
  let targetProgress = 0;
  let introFinished = false;

  const SCROLL_DISTANCE = 900;
  const EASE = 0.085;

  let animationFrame = null;


  function animateIntro() {

    if (introFinished) return;

    progress += (targetProgress - progress) * EASE;

    if (Math.abs(targetProgress - progress) < 0.0005) {
      progress = targetProgress;
    }

    progress = Math.max(0, Math.min(1, progress));

    loader.style.transform =
      `translate3d(0, ${-progress * 100}%, 0)`;

    if (scrollEnter) {

      scrollEnter.style.opacity =
        Math.max(0, 1 - progress * 3);

      scrollEnter.style.transform =
        `translate3d(-50%, ${progress * 25}px, 0)`;
    }

    if (progress >= 0.999) {
      finishIntro();
      return;
    }

    animationFrame =
      requestAnimationFrame(animateIntro);
  }


  function startAnimation() {

    if (animationFrame) return;

    animationFrame =
      requestAnimationFrame(animateIntro);
  }


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


  // =====================================================
  // MOUSE WHEEL INTRO
  // =====================================================

  window.addEventListener(
    "wheel",
    (event) => {

      if (introFinished) return;

      event.preventDefault();

      targetProgress +=
        event.deltaY / SCROLL_DISTANCE;

      targetProgress =
        Math.max(0, Math.min(1, targetProgress));

      startAnimation();

    },
    { passive: false }
  );


  // =====================================================
  // TOUCH INTRO
  // =====================================================

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


  // =====================================================
  // KEYBOARD INTRO
  // =====================================================

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


  // =====================================================
  // NAVBAR
  // =====================================================

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }
  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  // =====================================================
  // REVEAL ANIMATIONS
  // =====================================================

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px"
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  // =====================================================
  // RESIDENCE CARDS
  // =====================================================

  const residenceCards =
    document.querySelectorAll(".residence-card");


  const residenceObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "residence-visible"
            );

            residenceObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px"
      }
    );


  residenceCards.forEach((card) => {

    residenceObserver.observe(card);

  });


  // =====================================================
  // MOBILE MENU
  // =====================================================

  const menuButton =
    document.querySelector(".menu-button");

  const mobileMenu =
    document.querySelector(".mobile-menu");


  if (menuButton && mobileMenu) {

    menuButton.addEventListener(
      "click",
      () => {

        mobileMenu.classList.toggle("open");

        document.body.classList.toggle(
          "menu-open"
        );

      }
    );


    // Chiude il menu quando viene
    // selezionata una voce

    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            mobileMenu.classList.remove(
              "open"
            );

            document.body.classList.remove(
              "menu-open"
            );

          }
        );

      });
  }


  // =====================================================
  // SMOOTH LINKS
  // =====================================================

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        function(event) {

          const targetId =
            this.getAttribute("href");

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  // =====================================================
  // YEAR
  // =====================================================

  const year =
    document.querySelector("#year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  // =====================================================
  // INITIAL NAVBAR STATE
  // =====================================================

  updateNavbar();

});
