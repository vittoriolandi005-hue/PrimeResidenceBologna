/* =========================================================
   PRIME RESIDENCE BOLOGNA
   COMPLETE WEBSITE JAVASCRIPT
   Homepage + Residence Pages + Booking Page
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. LOADER
  ======================================================= */

  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1200);
  }


  /* =======================================================
     02. NAVBAR
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function handleNavbar() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  handleNavbar();

  window.addEventListener("scroll", handleNavbar, {
    passive: true
  });


  /* =======================================================
     03. MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = menuToggle.classList.toggle("active");

      mobileMenu.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.style.overflow = isOpen ? "hidden" : "";
    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

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
     04. REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

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
     05. SMOOTH ANCHOR LINKS
  ======================================================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     06. BOOKING PAGE
  ======================================================= */

  const bookingCards = document.querySelectorAll(
    ".booking-residence-card"
  );

  const bookingForm = document.querySelector(
    "#bookingRequestForm"
  );

  const residenceInput = document.querySelector(
    "#residence"
  );

  const selectedResidenceText = document.querySelector(
    "#selectedResidenceText"
  );

  const bookingFormSection = document.querySelector(
    "#booking-form-section"
  );

  const checkinInput = document.querySelector(
    "#checkin"
  );

  const checkoutInput = document.querySelector(
    "#checkout"
  );

  const bookingMessage = document.querySelector(
    "#bookingMessage"
  );

  const bookingSubmit = document.querySelector(
    ".booking-submit"
  );


  /* =======================================================
     07. TODAY'S DATE
  ======================================================= */

  function getLocalDateString() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  const todayString = getLocalDateString();


  if (checkinInput) {
    checkinInput.min = todayString;
  }

  if (checkoutInput) {
    checkoutInput.min = todayString;
  }


  /* =======================================================
     08. RESIDENCE SELECTION
  ======================================================= */

  function selectResidence(card) {

    if (!card) return;

    const residence =
      card.dataset.residence;

    if (!residence) return;


    /* Remove previous selection */

    bookingCards.forEach((item) => {
      item.classList.remove("selected");
    });


    /* Select current residence */

    card.classList.add("selected");


    /* Update hidden field */

    if (residenceInput) {
      residenceInput.value = residence;
    }


    /* Update visible residence */

    if (selectedResidenceText) {
      selectedResidenceText.textContent =
        residence;
    }


    /* Show booking form */

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

    card.addEventListener("click", () => {
      selectResidence(card);
    });


    /* Keyboard accessibility */

    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        selectResidence(card);

      }

    });

  });


  /* =======================================================
     09. CHECK-IN / CHECK-OUT DATES
  ======================================================= */

  if (checkinInput && checkoutInput) {

    checkinInput.addEventListener("change", () => {

      const checkinDate =
        checkinInput.value;

      if (!checkinDate) {
        return;
      }


      /* Checkout cannot be before check-in */

      checkoutInput.min = checkinDate;


      /* If checkout is already invalid, clear it */

      if (
        checkoutInput.value &&
        checkoutInput.value <= checkinDate
      ) {

        checkoutInput.value = "";

      }

    });


    checkoutInput.addEventListener("change", () => {

      const checkinDate =
        checkinInput.value;

      const checkoutDate =
        checkoutInput.value;


      if (
        checkinDate &&
        checkoutDate &&
        checkoutDate <= checkinDate
      ) {

        showBookingMessage(
          "Il check-out deve essere successivo al check-in.",
          "error"
        );

        checkoutInput.value = "";

      }

    });

  }


  /* =======================================================
     10. BOOKING MESSAGE
  ======================================================= */

  function showBookingMessage(
    message,
    type = "error"
  ) {

    if (!bookingMessage) return;

    bookingMessage.textContent = message;

    bookingMessage.className =
      `booking-message ${type}`;

    bookingMessage.style.display = "block";

    bookingMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }


  function hideBookingMessage() {

    if (!bookingMessage) return;

    bookingMessage.textContent = "";

    bookingMessage.className =
      "booking-message";

    bookingMessage.style.display = "none";

  }


  /* =======================================================
     11. BOOKING FORM SUBMISSION
  ======================================================= */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        hideBookingMessage();


        /* -------------------------------------------------
           Check residence
        ------------------------------------------------- */

        if (
          !residenceInput ||
          !residenceInput.value
        ) {

          showBookingMessage(
            "Seleziona prima una residence.",
            "error"
          );

          const residenceSection =
            document.querySelector(
              ".booking-choice"
            );

          if (residenceSection) {
            residenceSection.scrollIntoView({
              behavior: "smooth"
            });
          }

          return;
        }


        /* -------------------------------------------------
           Check dates
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           Check privacy
        ------------------------------------------------- */

        const privacyCheckbox =
          document.querySelector("#privacy");

        if (
          privacyCheckbox &&
          !privacyCheckbox.checked
        ) {

          showBookingMessage(
            "Devi accettare la privacy policy per inviare la richiesta.",
            "error"
          );

          return;
        }


        /* -------------------------------------------------
           Loading state
        ------------------------------------------------- */

        if (bookingSubmit) {

          bookingSubmit.disabled = true;

          bookingSubmit.classList.add(
            "loading"
          );

          bookingSubmit.dataset.originalText =
            bookingSubmit.textContent;

          bookingSubmit.textContent =
            "INVIO IN CORSO...";

        }


        /* -------------------------------------------------
           Collect form data
        ------------------------------------------------- */

        const formData =
          new FormData(bookingForm);

        const data =
          Object.fromEntries(
            formData.entries()
          );


        /* -------------------------------------------------
           Send request to Cloudflare Function
        ------------------------------------------------- */

        try {

          const response = await fetch(
            "/api/booking-request",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify(data)
            }
          );


          let result = {};

          try {

            result =
              await response.json();

          } catch (jsonError) {

            result = {};

          }


          /* -------------------------------------------------
             Error from server
          ------------------------------------------------- */

          if (!response.ok) {

            throw new Error(
              result.message ||
              "Si è verificato un errore durante l'invio."
            );

          }


          /* -------------------------------------------------
             SUCCESS
          ------------------------------------------------- */

          showBookingMessage(
            result.message ||
            "Richiesta inviata con successo. Ti ricontatteremo al più presto.",
            "success"
          );


          /* Save selected residence */

          const selectedResidence =
            residenceInput.value;


          /* Reset form */

          bookingForm.reset();


          /* Restore residence */

          if (residenceInput) {
            residenceInput.value =
              selectedResidence;
          }


          if (selectedResidenceText) {
            selectedResidenceText.textContent =
              selectedResidence;
          }


          /* Restore date limits */

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


          /* -------------------------------------------------
             Restore button
          ------------------------------------------------- */

          if (bookingSubmit) {

            bookingSubmit.disabled = false;

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
     12. BOOKING FORM FIELD VALIDATION
  ======================================================= */

  const bookingInputs = document.querySelectorAll(
    "#bookingRequestForm input, #bookingRequestForm select, #bookingRequestForm textarea"
  );


  bookingInputs.forEach((input) => {

    input.addEventListener("input", () => {

      if (
        bookingMessage &&
        bookingMessage.classList.contains("error")
      ) {

        hideBookingMessage();

      }

    });

  });


  /* =======================================================
     13. ESC KEY
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {

      mobileMenu.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

      document.body.style.overflow = "";

    }

  });


  /* =======================================================
     14. RESIZE
  ======================================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 700 &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {

      mobileMenu.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

      document.body.style.overflow = "";

    }

  });


  /* =======================================================
     15. CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "Prime Residence Bologna website loaded successfully."
  );

});
