```javascript
document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  /* =========================================
     PREMIUM INTRO
     Scroll automatico lento e cinematografico
  ========================================= */

  let introFinished = false;
  let introAnimating = false;
  let introStartTime = null;

  const INTRO_DURATION = 2200;

  function finishIntro() {
    if (introFinished) return;

    introFinished = true;
    introAnimating = false;

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    if (scrollEnter) {
      scrollEnter.style.opacity = "0";
      scrollEnter.style.transform =
        "translate3d(-50%, 30px, 0)";
    }

    document.body.classList.remove("intro-active");
    document.body.style.overflow = "";

    /*
      Piccola pausa finale per evitare
      qualsiasi movimento brusco.
    */
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

    const elapsed =
      timestamp - introStartTime;

    let progress =
      Math.min(
        elapsed / INTRO_DURATION,
        1
      );


    /* =====================================
       CINEMATIC EASING
    ===================================== */

    const easedProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 -
          Math.pow(
            -2 * progress + 2,
            2
          ) / 2;


    /* =====================================
       LOADER MOVEMENT
       Movimento principale
    ===================================== */

    loader.style.transform =
      `translate3d(
        0,
        ${-easedProgress * 100}%,
        0
      )`;


    /* =====================================
       SCROLL INDICATOR
       Scompare elegantemente
    ===================================== */

    if (scrollEnter) {

      const indicatorOpacity =
        Math.max(
          0,
          1 - easedProgress * 4
        );

      const indicatorMove =
        easedProgress * 35;

      scrollEnter.style.opacity =
        indicatorOpacity;

      scrollEnter.style.transform =
        `translate3d(
          -50%,
          ${indicatorMove}px,
          0
        )`;

    }


    /* =====================================
       PREMIUM DEPTH EFFECT
       Leggerissimo zoom durante la transizione
    ===================================== */

    const loaderContent =
      loader.querySelector(
        ".loader-content"
      );

    if (loaderContent) {

      const scale =
        1 +
        easedProgress * 0.035;

      const opacity =
        Math.max(
          0,
          1 - easedProgress * 1.4
        );

      loaderContent.style.transform =
        `scale(${scale})`;

      loaderContent.style.opacity =
        opacity;

    }


    /* =====================================
       FINE ANIMAZIONE
    ===================================== */

    if (progress >= 1) {

      finishIntro();

      return;

    }

    requestAnimationFrame(
      animateIntro
    );

  }


  function startIntro() {

    if (
      introFinished ||
      introAnimating
    ) {
      return;
    }

    introAnimating = true;
    introStartTime = null;

    requestAnimationFrame(
      animateIntro
    );

  }


  /* =========================================
     DESKTOP SCROLL
     UN SOLO SCROLL → ANIMAZIONE AUTOMATICA
  ========================================= */

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
     MOBILE TOUCH
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
     KEYBOARD
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
     NAVBAR
  ========================================= */

  const navbar =
    document.querySelector(".navbar");

  window.addEventListener(
    "scroll",
    () => {

      if (!navbar) return;

      if (window.scrollY > 50) {

        navbar.classList.add(
          "scrolled"
        );

      } else {

        navbar.classList.remove(
          "scrolled"
        );

      }

    }
  );


  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

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
  ========================================= */

  const menuButton =
    document.querySelector(
      ".menu-button"
    );

  const mobileMenu =
    document.querySelector(
      ".mobile-menu"
    );


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
  ========================================= */

  const year =
    document.querySelector(
      "#year"
    );

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
```
