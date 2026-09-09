document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  /* =========================================
     INTRO SCROLL
     Un piccolo scroll avvia automaticamente
     il movimento lento verso la seconda pagina
  ========================================= */

  let introFinished = false;
  let introAnimating = false;
  let introStartTime = null;

  const INTRO_DURATION = 2200; // 2.2 secondi

  function finishIntro() {
    if (introFinished) return;

    introFinished = true;
    introAnimating = false;

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    if (scrollEnter) {
      scrollEnter.style.opacity = "0";
      scrollEnter.style.transform =
        "translate3d(-50%, 25px, 0)";
    }

    document.body.classList.remove("intro-active");
    document.body.style.overflow = "";

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  function animateIntro(timestamp) {
    if (introFinished) return;

    if (!introStartTime) {
      introStartTime = timestamp;
    }

    const elapsed = timestamp - introStartTime;

    let progress =
      Math.min(elapsed / INTRO_DURATION, 1);

    /*
      Ease-in-out molto morbido:
      parte lentamente,
      accelera leggermente,
      rallenta alla fine.
    */
    const easedProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    loader.style.transform =
      `translate3d(0, ${-easedProgress * 100}%, 0)`;

    if (scrollEnter) {
      scrollEnter.style.opacity =
        Math.max(0, 1 - easedProgress * 3);

      scrollEnter.style.transform =
        `translate3d(-50%, ${easedProgress * 25}px, 0)`;
    }

    if (progress >= 1) {
      finishIntro();
      return;
    }

    requestAnimationFrame(animateIntro);
  }

  function startIntro() {
    if (introFinished || introAnimating) return;

    introAnimating = true;
    introStartTime = null;

    requestAnimationFrame(animateIntro);
  }

  /*
    PRIMO SCROLL

    Qualsiasi scroll verso il basso durante
    l'intro avvia l'animazione automatica.
  */
  window.addEventListener(
    "wheel",
    (event) => {

      if (introFinished) return;

      event.preventDefault();

      if (event.deltaY > 0) {
        startIntro();
      }

    },
    {
      passive: false
    }
  );


  /* =========================================
     TOUCH / MOBILE
  ========================================= */

  let touchStart = 0;

  window.addEventListener(
    "touchstart",
    (event) => {

      if (introFinished) return;

      touchStart =
        event.touches[0].clientY;

    },
    {
      passive: true
    }
  );

  window.addEventListener(
    "touchmove",
    (event) => {

      if (introFinished) return;

      const currentTouch =
        event.touches[0].clientY;

      const movement =
        touchStart - currentTouch;

      if (movement > 5) {

        event.preventDefault();

        startIntro();

      }

    },
    {
      passive: false
    }
  );


  /* =========================================
     TASTIERA
  ========================================= */

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

        startIntro();

      }

    }
  );


  /* =========================================
     NAVBAR SCROLL
     NON MODIFICATO
  ========================================= */

  const navbar =
    document.querySelector(".navbar");

  window.addEventListener(
    "scroll",
    () => {

      if (!navbar) return;

      if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

      } else {

        navbar.classList.remove("scrolled");

      }

    }
  );


  /* =========================================
     REVEAL ANIMATIONS
     NON MODIFICATO
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =========================================
     MOBILE MENU
     NON MODIFICATO
  ========================================= */

  const menuButton =
    document.querySelector(".menu-button");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (
    menuButton &&
    mobileMenu
  ) {

    menuButton.addEventListener(
      "click",
      () => {

        mobileMenu.classList.toggle(
          "open"
        );

      }
    );

  }


  /* =========================================
     ANCHOR LINKS
     NON MODIFICATO
  ========================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          function(event) {

            const targetId =
              this.getAttribute(
                "href"
              );

            const target =
              document.querySelector(
                targetId
              );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth"
            });

          }
        );

      }
    );


  /* =========================================
     FOOTER YEAR
     NON MODIFICATO
  ========================================= */

  const year =
    document.querySelector("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
