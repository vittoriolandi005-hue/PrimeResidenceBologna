/* =========================================
   PRIME RESIDENCE BOLOGNA
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     INTRO SCREEN
     SCROLL GRADUALE
  ========================================= */

  const loader = document.querySelector(".loader");

  let introProgress = 0;
  let introFinished = false;

  const INTRO_SCROLL_DISTANCE = 900;


  function updateIntro() {

    if (introFinished) return;

    const progress = Math.min(
      Math.max(introProgress, 0),
      1
    );

    /*
      La schermata viene spinta gradualmente
      verso l'alto in base allo scroll.
    */

    loader.style.transform =
      `translate3d(0, ${-progress * 100}%, 0)`;

  }


  function finishIntro() {

    introFinished = true;

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    document.body.classList.remove(
      "intro-active"
    );

  }


  /* =========================================
     MOUSE WHEEL
  ========================================= */

  window.addEventListener(
    "wheel",
    (event) => {

      if (introFinished) return;

      /*
        Usiamo una piccola percentuale
        dello scroll del mouse.
      */

      introProgress +=
        event.deltaY / INTRO_SCROLL_DISTANCE;


      introProgress =
        Math.min(
          Math.max(introProgress, 0),
          1
        );


      updateIntro();


      /*
        Solo quando l'utente ha realmente
        completato lo scroll l'intro finisce.
      */

      if (introProgress >= 1) {

        finishIntro();

      }

    },
    {
      passive: true
    }
  );


  /* =========================================
     TOUCH / SMARTPHONE
  ========================================= */

  let touchStartY = 0;

  window.addEventListener(
    "touchstart",
    (event) => {

      if (introFinished) return;

      touchStartY =
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

      const currentY =
        event.touches[0].clientY;

      const movement =
        touchStartY - currentY;


      if (movement > 0) {

        introProgress +=
          movement / 1200;

        introProgress =
          Math.min(
            Math.max(introProgress, 0),
            1
          );

        updateIntro();

        touchStartY = currentY;

      }

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "touchend",
    () => {

      if (
        !introFinished &&
        introProgress >= 1
      ) {

        finishIntro();

      }

    },
    {
      passive: true
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

        introProgress += 0.15;

        introProgress =
          Math.min(
            introProgress,
            1
          );

        updateIntro();


        if (introProgress >= 1) {

          finishIntro();

        }

      }

    }
  );


  /* =========================================
     NAVBAR
  ========================================= */

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (window.scrollY > 60) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive: true
    }
  );


  updateNavbar();


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          const delay =
            entry.target.dataset.delay || 0;


          setTimeout(() => {

            entry.target.classList.add(
              "visible"
            );

          }, delay);


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -50px 0px"
      }
    );


  revealElements.forEach(
    (element, index) => {

      if (index % 3 === 1) {

        element.dataset.delay =
          "100";

      }


      if (index % 3 === 2) {

        element.dataset.delay =
          "180";

      }


      revealObserver.observe(
        element
      );

    }
  );


  /* =========================================
     HERO PARALLAX
  ========================================= */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );

  let ticking = false;


  function updateParallax() {

    if (!heroImage) return;


    const scroll =
      window.scrollY;


    if (
      scroll <
      window.innerHeight
    ) {

      heroImage.style.transform =
        `translate3d(
          0,
          ${scroll * 0.12}px,
          0
        ) scale(1.03)`;

    }


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    {
      passive: true
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

  const mobileLinks =
    document.querySelectorAll(
      ".mobile-menu a"
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

        document.body.classList.toggle(
          "menu-open"
        );

      }
    );

  }


  mobileLinks.forEach(
    (link) => {

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

    }
  );


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
              this.getAttribute(
                "href"
              );


            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                targetId
              );


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }
        );

      }
    );


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================
     LANGUAGE SWITCH
  ========================================= */

  const languages =
    document.querySelectorAll(
      ".language span"
    );


  languages.forEach(
    (language) => {

      language.addEventListener(
        "click",
        () => {

          languages.forEach(
            (item) => {

              item.classList.remove(
                "active"
              );

            }
          );


          language.classList.add(
            "active"
          );

        }
      );

    }
  );


  /* =========================================
     MOBILE MENU SCROLL LOCK
  ========================================= */

  const menuStyle =
    document.createElement(
      "style"
    );


  menuStyle.textContent = `

    body.menu-open {
      overflow: hidden;
    }

  `;


  document.head.appendChild(
    menuStyle
  );

});
