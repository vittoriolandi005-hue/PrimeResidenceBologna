```javascript
/* =========================================================
   PRIME RESIDENCE BOLOGNA
   PREMIUM WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. LOADER
  ======================================================= */

  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1400);
  }


  /* =======================================================
     02. NAVBAR
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });


  /* =======================================================
     03. MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener("click", () => {

      const open =
        menuToggle.classList.toggle("active");

      mobileMenu.classList.toggle(
        "active",
        open
      );

      menuToggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      document.body.style.overflow =
        open ? "hidden" : "";

    });


    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {

          menuToggle.classList.remove("active");

          mobileMenu.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.style.overflow = "";

        });

      });

  }


  /* =======================================================
     04. PREMIUM PROGRAMMED SCROLL
     
     HERO → STAY BEAUTIFULLY

     DURATA ESATTA: 2200ms

     Non è una slide.
     È uno scroll automatico e cinematografico.
  ======================================================= */

  const hero =
    document.querySelector(".hero");

  if (hero) {

    const nextSection =
      hero.nextElementSibling;

    if (nextSection) {

      const SCROLL_DURATION = 2200;

      let programmedScrollActive = false;

      let programmedScrollCompleted = false;


      /* ---------------------------------------------------
         EASING CINEMATICO

         Parte morbido,
         accelera al centro,
         rallenta elegantemente alla fine.
      --------------------------------------------------- */

      function cinematicEase(t) {

        return t < 0.5
          ? 4 * t * t * t
          : 1 -
            Math.pow(
              -2 * t + 2,
              3
            ) / 2;

      }


      /* ---------------------------------------------------
         BLOCCO DELLO SCROLL DURANTE L'ANIMAZIONE
      --------------------------------------------------- */

      function lockProgrammedScroll() {

        document.documentElement.style.overflow =
          "hidden";

        document.body.style.overflow =
          "hidden";

      }


      /* ---------------------------------------------------
         SBLOCCO DELLO SCROLL
      --------------------------------------------------- */

      function unlockProgrammedScroll() {

        document.documentElement.style.overflow =
          "";

        document.body.style.overflow =
          "";

      }


      /* ---------------------------------------------------
         SCROLL PROGRAMMATO
      --------------------------------------------------- */

      function startProgrammedScroll() {

        if (programmedScrollActive) {
          return;
        }

        if (programmedScrollCompleted) {
          return;
        }


        /*
         Deve partire solamente dalla cima
         assoluta della Home.
        */

        if (window.scrollY > 5) {
          return;
        }


        programmedScrollActive = true;


        /* -----------------------------------------------
           POSIZIONE DI PARTENZA
        ------------------------------------------------ */

        const startPosition =
          window.scrollY;


        /* -----------------------------------------------
           POSIZIONE DI ARRIVO

           È l'inizio reale della sezione
           "Stay Beautifully".
        ------------------------------------------------ */

        const targetPosition =
          nextSection.getBoundingClientRect().top +
          window.scrollY;


        /*
         Se per qualsiasi motivo la sezione fosse già
         nella posizione iniziale, non facciamo nulla.
        */

        if (
          targetPosition <= startPosition + 5
        ) {

          programmedScrollActive = false;

          return;

        }


        /* -----------------------------------------------
           BLOCCA IL CONTROLLO MANUALE
        ------------------------------------------------ */

        lockProgrammedScroll();


        /*
         Manteniamo la pagina esattamente all'inizio.
        */

        window.scrollTo(
          0,
          startPosition
        );


        /* -----------------------------------------------
           TEMPO DI PARTENZA
        ------------------------------------------------ */

        const animationStart =
          performance.now();


        /* -----------------------------------------------
           ANIMAZIONE
        ------------------------------------------------ */

        function animateScroll(currentTime) {

          const elapsed =
            currentTime -
            animationStart;


          let progress =
            elapsed /
            SCROLL_DURATION;


          progress =
            Math.max(
              0,
              Math.min(
                1,
                progress
              )
            );


          const eased =
            cinematicEase(progress);


          const currentPosition =
            startPosition +
            (
              targetPosition -
              startPosition
            ) *
            eased;


          window.scrollTo(
            0,
            currentPosition
          );


          /* ---------------------------------------------
             FINE ANIMAZIONE
          --------------------------------------------- */

          if (
            progress >= 1
          ) {

            window.scrollTo(
              0,
              targetPosition
            );


            unlockProgrammedScroll();


            programmedScrollActive =
              false;

            programmedScrollCompleted =
              true;


            return;

          }


          requestAnimationFrame(
            animateScroll
          );

        }


        /*
         PARTE IMMEDIATAMENTE.
         Nessun setTimeout.
        */

        requestAnimationFrame(
          animateScroll
        );

      }


      /* ===================================================
         MOUSE / TRACKPAD

         Primo movimento verso il basso dalla cima.
      =================================================== */

      window.addEventListener(
        "wheel",
        (event) => {

          if (
            programmedScrollActive
          ) {

            event.preventDefault();

            return;

          }


          if (
            programmedScrollCompleted
          ) {
            return;
          }


          if (
            window.scrollY <= 5 &&
            event.deltaY > 0
          ) {

            event.preventDefault();

            startProgrammedScroll();

          }

        },
        {
          passive: false
        }
      );


      /* ===================================================
         TOUCH / MOBILE
      =================================================== */

      let touchStartY = null;


      window.addEventListener(
        "touchstart",
        (event) => {

          if (
            event.touches.length !== 1
          ) {
            return;
          }


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

          if (
            touchStartY === null
          ) {
            return;
          }


          if (
            programmedScrollActive
          ) {

            event.preventDefault();

            return;

          }


          if (
            programmedScrollCompleted
          ) {
            return;
          }


          if (
            window.scrollY > 5
          ) {
            return;
          }


          const currentY =
            event.touches[0].clientY;


          const movement =
            touchStartY -
            currentY;


          /*
           Movimento verso l'alto del dito =
           scroll verso il basso.
          */

          if (
            movement > 8
          ) {

            event.preventDefault();

            touchStartY = null;

            startProgrammedScroll();

          }

        },
        {
          passive: false
        }
      );


      window.addEventListener(
        "touchend",
        () => {

          touchStartY = null;

        },
        {
          passive: true
        }
      );


      /* ===================================================
         TASTIERA
      =================================================== */

      window.addEventListener(
        "keydown",
        (event) => {

          if (
            programmedScrollActive
          ) {
            return;
          }


          if (
            programmedScrollCompleted
          ) {
            return;
          }


          if (
            window.scrollY > 5
          ) {
            return;
          }


          if (
            event.key === "ArrowDown" ||
            event.key === "PageDown" ||
            event.key === " "
          ) {

            event.preventDefault();

            startProgrammedScroll();

          }

        }
      );

    }

  }


  /* =======================================================
     05. REVEAL ANIMATIONS
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  }


  /* =======================================================
     06. ANCHOR LINKS
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute("href");


          if (!id || id === "#") {
            return;
          }


          const target =
            document.querySelector(id);


          if (!target) {
            return;
          }


          event.preventDefault();


          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;


          const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;


          window.scrollTo({
            top: position,
            behavior: "smooth"
          });

        }
      );

    });


  /* =======================================================
     07. BOOKING PAGE
  ======================================================= */

  const bookingCards =
    document.querySelectorAll(
      ".booking-residence-card"
    );

  const bookingForm =
    document.querySelector(
      "#bookingRequestForm"
    );

  const residenceInput =
    document.querySelector(
      "#residence"
    );

  const selectedResidenceText =
    document.querySelector(
      "#selectedResidenceText"
    );

  const bookingFormSection =
    document.querySelector(
      "#booking-form-section"
    );

  const checkinInput =
    document.querySelector(
      "#checkin"
    );

  const checkoutInput =
    document.querySelector(
      "#checkout"
    );

  const bookingMessage =
    document.querySelector(
      "#bookingMessage"
    );

  const bookingSubmit =
    document.querySelector(
      ".booking-submit"
    );


  /* =======================================================
     08. LOCAL DATE
  ======================================================= */

  function getLocalDateString() {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const day =
      String(
        today.getDate()
      ).padStart(
        2,
        "0"
      );


    return `${year}-${month}-${day}`;

  }


  if (checkinInput) {

    checkinInput.min =
      getLocalDateString();

  }


  if (checkoutInput) {

    checkoutInput.min =
      getLocalDateString();

  }


  /* =======================================================
     09. RESIDENCE SELECTION
  ======================================================= */

  function selectResidence(card) {

    if (!card) {
      return;
    }


    const residence =
      card.dataset.residence;


    if (!residence) {
      return;
    }


    bookingCards.forEach((item) => {

      item.classList.remove(
        "selected"
      );

    });


    card.classList.add(
      "selected"
    );


    if (residenceInput) {

      residenceInput.value =
        residence;

    }


    if (selectedResidenceText) {

      selectedResidenceText.textContent =
        residence;

    }


    if (bookingFormSection) {

      setTimeout(() => {

        bookingFormSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 150);

    }

  }


  bookingCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        selectResidence(card);

      }
    );


    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          selectResidence(card);

        }

      }
    );

  });


  /* =======================================================
     10. CHECK-IN / CHECK-OUT
  ======================================================= */

  if (
    checkinInput &&
    checkoutInput
  ) {

    checkinInput.addEventListener(
      "change",
      () => {

        const checkin =
          checkinInput.value;


        if (!checkin) {
          return;
        }


        checkoutInput.min =
          checkin;


        if (
          checkoutInput.value &&
          checkoutInput.value <= checkin
        ) {

          showBookingMessage(
            "Il check-out deve essere successivo al check-in.",
            "error"
          );


          checkoutInput.value = "";

        }

      }
    );


    checkoutInput.addEventListener(
      "change",
      () => {

        const checkin =
          checkinInput.value;

        const checkout =
          checkoutInput.value;


        if (
          checkin &&
          checkout &&
          checkout <= checkin
        ) {

          showBookingMessage(
            "Il check-out deve essere successivo al check-in.",
            "error"
          );


          checkoutInput.value = "";

        }

      }
    );

  }


  /* =======================================================
     11. BOOKING MESSAGE
  ======================================================= */

  function showBookingMessage(
    message,
    type = "error"
  ) {

    if (!bookingMessage) {
      return;
    }


    bookingMessage.textContent =
      message;


    bookingMessage.className =
      `booking-message ${type}`;


    bookingMessage.style.display =
      "block";

  }


  function hideBookingMessage() {

    if (!bookingMessage) {
      return;
    }


    bookingMessage.textContent =
      "";

    bookingMessage.className =
      "booking-message";

    bookingMessage.style.display =
      "none";

  }


  /* =======================================================
     12. BOOKING SUBMIT
  ======================================================= */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        hideBookingMessage();


        if (
          !residenceInput ||
          !residenceInput.value
        ) {

          showBookingMessage(
            "Seleziona prima una residence.",
            "error"
          );

          return;

        }


        if (
          checkinInput &&
          checkoutInput
        ) {

          if (
            !checkinInput.value ||
            !checkoutInput.value
          ) {

            showBookingMessage(
              "Inserisci le date di check-in e check-out.",
              "error"
            );

            return;

          }


          if (
            checkoutInput.value <=
            checkinInput.value
          ) {

            showBookingMessage(
              "Il check-out deve essere successivo al check-in.",
              "error"
            );

            return;

          }

        }


        const privacy =
          document.querySelector(
            "#privacy"
          );


        if (
          privacy &&
          !privacy.checked
        ) {

          showBookingMessage(
            "Devi accettare la privacy policy per inviare la richiesta.",
            "error"
          );

          return;

        }


        if (bookingSubmit) {

          bookingSubmit.disabled =
            true;

          bookingSubmit.classList.add(
            "loading"
          );

          bookingSubmit.dataset.originalText =
            bookingSubmit.textContent;

          bookingSubmit.textContent =
            "INVIO IN CORSO...";

        }


        const formData =
          new FormData(
            bookingForm
          );


        const data =
          Object.fromEntries(
            formData.entries()
          );


        try {

          const response =
            await fetch(
              "/api/booking-request",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body:
                  JSON.stringify(data)
              }
            );


          let result = {};


          try {

            result =
              await response.json();

          } catch (error) {

            result = {};

          }


          if (!response.ok) {

            throw new Error(
              result.message ||
              "Si è verificato un errore durante l'invio."
            );

          }


          showBookingMessage(
            result.message ||
            "Richiesta inviata con successo. Ti ricontatteremo al più presto.",
            "success"
          );


          const selectedResidence =
            residenceInput.value;


          bookingForm.reset();


          residenceInput.value =
            selectedResidence;


          if (selectedResidenceText) {

            selectedResidenceText.textContent =
              selectedResidence;

          }


          if (checkinInput) {

            checkinInput.min =
              getLocalDateString();

          }


          if (checkoutInput) {

            checkoutInput.min =
              getLocalDateString();

          }


        } catch (error) {

          console.error(
            "Booking error:",
            error
          );


          showBookingMessage(
            error.message ||
            "Non è stato possibile inviare la richiesta. Riprova tra poco.",
            "error"
          );


        } finally {

          if (bookingSubmit) {

            bookingSubmit.disabled =
              false;

            bookingSubmit.classList.remove(
              "loading"
            );

            bookingSubmit.textContent =
              bookingSubmit.dataset.originalText ||
              "SEND BOOKING REQUEST";

          }

        }

      }
    );

  }


  /* =======================================================
     13. FORM ERROR RESET
  ======================================================= */

  document
    .querySelectorAll(
      "#bookingRequestForm input, #bookingRequestForm select, #bookingRequestForm textarea"
    )
    .forEach((input) => {

      input.addEventListener(
        "input",
        () => {

          if (
            bookingMessage &&
            bookingMessage.classList.contains(
              "error"
            )
          ) {

            hideBookingMessage();

          }

        }
      );

    });


  /* =======================================================
     14. ESCAPE MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mobileMenu &&
        mobileMenu.classList.contains(
          "active"
        )
      ) {

        mobileMenu.classList.remove(
          "active"
        );


        if (menuToggle) {

          menuToggle.classList.remove(
            "active"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }


        document.body.style.overflow =
          "";

      }

    }
  );


  /* =======================================================
     15. RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 700 &&
        mobileMenu &&
        mobileMenu.classList.contains(
          "active"
        )
      ) {

        mobileMenu.classList.remove(
          "active"
        );


        if (menuToggle) {

          menuToggle.classList.remove(
            "active"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }


        document.body.style.overflow =
          "";

      }

    }
  );


  /* =======================================================
     16. READY
  ======================================================= */

  console.log(
    "Prime Residence Bologna — premium programmed scroll ready."
  );

});
```
