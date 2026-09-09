/* =========================================
   PRIME RESIDENCE BOLOGNA
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     INTRO SCREEN
     L'intro rimane fino allo scroll
  ========================================= */

  const loader = document.querySelector(".loader");

  let introFinished = false;

  document.body.classList.add("intro-active");


  function closeIntro() {

    if (introFinished) return;

    introFinished = true;

    loader.classList.add("hidden");

    document.body.classList.remove("intro-active");

  }


  /* Scroll con mouse */

  window.addEventListener("wheel", (event) => {

    if (introFinished) return;

    if (event.deltaY > 0) {
      closeIntro();
    }

  }, { passive: true });


  /* Scroll con tastiera */

  window.addEventListener("keydown", (event) => {

    if (introFinished) return;

    if (
      event.key === "ArrowDown" ||
      event.key === "PageDown" ||
      event.key === " "
    ) {

      event.preventDefault();

      closeIntro();

    }

  });


  /* Scroll su smartphone */

  let touchStartY = 0;

  window.addEventListener("touchstart", (event) => {

    touchStartY = event.touches[0].clientY;

  }, { passive: true });


  window.addEventListener("touchend", (event) => {

    if (introFinished) return;

    const touchEndY = event.changedTouches[0].clientY;

    if (touchStartY - touchEndY > 30) {
      closeIntro();
    }

  }, { passive: true });


  /* =========================================
     NAVBAR
  ========================================= */

  const navbar = document.querySelector(".navbar");


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
    { passive: true }
  );


  updateNavbar();


  /* =========================================
     SCROLL REVEAL ANIMATIONS
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;


          const delay =
            entry.target.dataset.delay || 0;


          setTimeout(() => {

            entry.target.classList.add("visible");

          }, delay);


          observer.unobserve(entry.target);

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }

    );


  revealElements.forEach((element, index) => {

    if (index % 3 === 1) {
      element.dataset.delay = "100";
    }

    if (index % 3 === 2) {
      element.dataset.delay = "180";
    }

    revealObserver.observe(element);

  });


  /* =========================================
     HERO PARALLAX
  ========================================= */

  const heroImage =
    document.querySelector(".hero-image");

  let ticking = false;


  function updateParallax() {

    if (!heroImage) return;


    const scroll =
      window.scrollY;


    if (scroll < window.innerHeight) {

      heroImage.style.transform =
        `translate3d(0, ${scroll * 0.12}px, 0) scale(1.03)`;

    }


    ticking = false;

  }


  window.addEventListener("scroll", () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateParallax
      );

      ticking = true;

    }

  }, { passive: true });


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuButton =
    document.querySelector(".menu-button");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");


  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

      document.body.classList.toggle(
        "menu-open"
      );

    });

  }


  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

    });

  });


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", function(event) {

        const targetId =
          this.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year =
    document.getElementById("year");


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


  languages.forEach((language) => {

    language.addEventListener("click", () => {

      languages.forEach((item) => {

        item.classList.remove("active");

      });


      language.classList.add("active");

    });

  });


  /* =========================================
     PREVENT SCROLL WHEN MOBILE MENU IS OPEN
  ========================================= */

  const menuStyle =
    document.createElement("style");


  menuStyle.textContent = `

    body.menu-open {
      overflow: hidden;
    }

  `;


  document.head.appendChild(menuStyle);

});
