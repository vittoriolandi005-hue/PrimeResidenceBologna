```javascript
document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  let introFinished = false;
  let introAnimating = false;

  const INTRO_DURATION = 2200;

  /* =========================================
     FINISH INTRO
  ========================================= */

  function finishIntro() {

    if (introFinished) return;

    introFinished = true;
    introAnimating = false;

    document.body.classList.remove("intro-active");
    document.body.style.overflow = "";

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    loader.style.pointerEvents = "none";

    if (scrollEnter) {
      scrollEnter.style.opacity = "0";
    }
  }


  /* =========================================
     AUTOMATIC INTRO SCROLL
  ========================================= */

  function startIntro() {

    if (
      introFinished ||
      introAnimating
    ) {
      return;
    }

    introAnimating = true;

    /*
      Sblocchiamo temporaneamente lo scroll
      per permettere alla pagina di muoversi.
    */

    document.body.style.overflow = "";

    const startPosition = window.scrollY;

    const targetPosition =
      document.querySelector("#home")
        ? document.querySelector("#home").offsetTop
        : window.innerHeight;

    const distance =
      targetPosition - startPosition;

    const startTime = performance.now();


    function animateScroll(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / INTRO_DURATION,
          1
        );


      /*
        Movimento cinematico:
        lento all'inizio,
        fluido al centro,
        rallenta alla fine.
      */

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 -
            Math.pow(
              -2 * progress + 2,
              2
            ) / 2;


      window.scrollTo(
        0,
        startPosition +
        distance * eased
      );


      /*
        Il pannello nero dell'intro
        scivola via contemporaneamente.
      */

      loader.style.transform =
        `translate3d(
          0,
          ${-eased * 100}%,
          0
        )`;


      if (scrollEnter) {

        scrollEnter.style.opacity =
          Math.max(
            0,
            1 - eased * 3
          );

      }


      if (progress < 1) {

        requestAnimationFrame(
          animateScroll
        );

      } else {

        finishIntro();

      }

    }


    requestAnimationFrame(
      animateScroll
    );

  }


  /* =========================================
     MOUSE WHEEL
     UN SOLO SCROLL
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
     TOUCH
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
    document.querySelectorAll(".reveal");

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
     SMOOTH ANCHOR LINKS
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
              this.getAttribute("href");

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
     YEAR
  ========================================= */

  const year =
    document.querySelector("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
```
