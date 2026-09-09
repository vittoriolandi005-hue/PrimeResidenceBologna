/* =========================================================
   PRIME RESIDENCE BOLOGNA
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     INTRO / LOADER
  ======================================================= */

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  let progress = 0;
  let targetProgress = 0;
  let introFinished = false;

  /*
    Più basso = serve più rotella per completare l'intro
    Più alto = l'intro scorre più velocemente
  */
  const SCROLL_DISTANCE = 900;

  /*
    Valore più alto rispetto a prima:
    rende il movimento molto più reattivo.
  */
  const EASE = 0.22;

  let animationFrame = null;


  /* =======================================================
     ANIMAZIONE INTRO
  ======================================================= */

  function animateIntro() {

    if (introFinished) return;

    /*
      Avvicinamento rapido al valore richiesto
    */
    progress +=
      (targetProgress - progress) * EASE;

    /*
      Quando siamo abbastanza vicini,
      raggiungiamo direttamente il valore.
    */
    if (
      Math.abs(targetProgress - progress) < 0.001
    ) {
      progress = targetProgress;
    }

    progress = Math.max(
      0,
      Math.min(1, progress)
    );


    /*
      Movimento del loader
    */
    loader.style.transform =
      `translate3d(0, ${-progress * 100}%, 0)`;


    /*
      Testo SCROLL TO ENTER
    */
    if (scrollEnter) {

      scrollEnter.style.opacity =
        Math.max(
          0,
          1 - progress * 3
        );

      scrollEnter.style.transform =
        `translate3d(-50%, ${progress * 25}px, 0)`;
    }


    /*
      Fine intro
    */
    if (progress >= 0.999) {

      finishIntro();

      return;
    }


    animationFrame =
      requestAnimationFrame(
        animateIntro
      );
  }


  function startAnimation() {

    if (animationFrame) return;

    animationFrame =
      requestAnimationFrame(
        animateIntro
      );
  }


  /* =======================================================
     FINE INTRO
  ======================================================= */

  function finishIntro() {

    if (introFinished) return;

    introFinished = true;

    progress = 1;
    targetProgress = 1;


    loader.style.transform =
      "translate3d(0, -100%, 0)";


    document.body.classList.remove(
      "intro-active"
    );

    document.body.style.overflow = "";


    if (animationFrame) {

      cancelAnimationFrame(
        animationFrame
      );

      animationFrame = null;
    }
  }


  /* =======================================================
     MOUSE WHEEL
  ======================================================= */

  window.addEventListener(
    "wheel",
    (event) => {

      if (introFinished) return;


      /*
        Blocchiamo lo scroll normale solamente
        mentre è attiva la schermata iniziale.
      */
      event.preventDefault();


      /*
        Movimento diretto della rotella
      */
      targetProgress +=
        event.deltaY / SCROLL_DISTANCE;


      targetProgress =
        Math.max(
          0,
          Math.min(1, targetProgress)
        );


      startAnimation();

    },
    {
      passive: false
    }
  );


  /* =======================================================
     TOUCH
  ======================================================= */

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


      if (Math.abs(movement) > 1) {

        event.preventDefault();


        targetProgress +=
          movement / SCROLL_DISTANCE;


        targetProgress =
          Math.max(
            0,
            Math.min(1, targetProgress)
          );


        touchStart =
          currentTouch;


        startAnimation();
      }

    },
    {
      passive: false
    }
  );


  /* =======================================================
     TASTIERA
  ======================================================= */

  window.addEventListener(
    "keydown",
    (event) => {

      if (introFinished) return;


      /*
        AVANTI
      */
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {

        event.preventDefault();


        targetProgress += 0.15;


        targetProgress =
          Math.min(
            1,
            targetProgress
          );


        startAnimation();
      }


      /*
        INDIETRO
      */
      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
      ) {

        event.preventDefault();


        targetProgress -= 0.15;


        targetProgress =
          Math.max(
            0,
            targetProgress
          );


        startAnimation();
      }

    }
  );


  /* =======================================================
     NAVBAR
  ======================================================= */

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


  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================= */

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


  /* =======================================================
     MOBILE MENU
  ======================================================= */

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


  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

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


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const year =
    document.querySelector(
      "#year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
