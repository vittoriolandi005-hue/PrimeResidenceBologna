document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     INTRO
  ====================================================== */

  const loader =
    document.querySelector(".loader");

  const scrollEnter =
    document.querySelector(".scroll-enter");


  if (loader) {

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
          "translate3d(-50%, 25px, 0)";

      }


      document.body.classList.remove(
        "intro-active"
      );


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


      const elapsed =
        timestamp - introStartTime;


      const progress =
        Math.min(
          elapsed / INTRO_DURATION,
          1
        );


      const easedProgress =
        progress < 0.5

          ? 2 * progress * progress

          : 1 -
            Math.pow(
              -2 * progress + 2,
              2
            ) / 2;


      loader.style.transform =
        `translate3d(0, ${-easedProgress * 100}%, 0)`;


      if (scrollEnter) {

        scrollEnter.style.opacity =
          Math.max(
            0,
            1 - easedProgress * 3
          );


        scrollEnter.style.transform =
          `translate3d(-50%, ${easedProgress * 25}px, 0)`;

      }


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


    /* =========================
       MOUSE / WHEEL
    ========================== */

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


    /* =========================
       TOUCH
    ========================== */

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
          touchStart -
          currentTouch;


        if (movement > 5) {

          event.preventDefault();

          startIntro();

        }

      },
      {
        passive: false
      }
    );


    /* =========================
       KEYBOARD
    ========================== */

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

  }


  /* =====================================================
     NAVBAR
  ====================================================== */

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


  /* =====================================================
     REVEAL ANIMATIONS
  ====================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window
  ) {

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

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =====================================================
     MOBILE MENU
  ====================================================== */

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


    mobileMenu
      .querySelectorAll("a")
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            () => {

              mobileMenu.classList.remove(
                "open"
              );

            }
          );

        }
      );

  }


  /* =====================================================
     ANCHOR LINKS
  ====================================================== */

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
              behavior: "smooth"
            });

          }
        );

      }
    );


  /* =====================================================
     FOOTER YEAR
  ====================================================== */

  const year =
    document.querySelector("#year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     APARTMENT GALLERY
  ====================================================== */

  const galleries =
    document.querySelectorAll(
      ".apartment-gallery"
    );


  galleries.forEach(
    (gallery) => {

      const slides =
        gallery.querySelectorAll(
          ".apartment-slide"
        );


      const previousButton =
        gallery.querySelector(
          ".gallery-arrow.prev"
        );


      const nextButton =
        gallery.querySelector(
          ".gallery-arrow.next"
        );


      const gallerySection =
        gallery.closest(
          ".apartment-gallery-section"
        );


      const counter =
        gallerySection
          ? gallerySection.querySelector(
              ".apartment-gallery-counter"
            )
          : null;


      if (!slides.length) return;


      let currentSlide = 0;


      function showSlide(index) {

        if (index < 0) {

          index =
            slides.length - 1;

        }


        if (
          index >= slides.length
        ) {

          index = 0;

        }


        currentSlide = index;


        slides.forEach(
          (slide, slideIndex) => {

            slide.classList.toggle(
              "active",
              slideIndex === currentSlide
            );

          }
        );


        if (counter) {

          counter.textContent =
            String(
              currentSlide + 1
            ).padStart(2, "0") +
            " / " +
            String(
              slides.length
            ).padStart(2, "0");

        }

      }


      if (previousButton) {

        previousButton.addEventListener(
          "click",
          () => {

            showSlide(
              currentSlide - 1
            );

          }
        );

      }


      if (nextButton) {

        nextButton.addEventListener(
          "click",
          () => {

            showSlide(
              currentSlide + 1
            );

          }
        );

      }


      /* =========================
         SWIPE
      ========================== */

      let galleryTouchStart = 0;


      gallery.addEventListener(
        "touchstart",
        (event) => {

          galleryTouchStart =
            event.touches[0].clientX;

        },
        {
          passive: true
        }
      );


      gallery.addEventListener(
        "touchend",
        (event) => {

          const galleryTouchEnd =
            event.changedTouches[0].clientX;


          const distance =
            galleryTouchStart -
            galleryTouchEnd;


          if (
            Math.abs(distance) < 40
          ) {

            return;

          }


          if (distance > 0) {

            showSlide(
              currentSlide + 1
            );

          } else {

            showSlide(
              currentSlide - 1
            );

          }

        },
        {
          passive: true
        }
      );


      showSlide(0);

    }
  );

});
