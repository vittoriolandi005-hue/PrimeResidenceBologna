document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     FOOTER YEAR
  ===================================================== */

  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     HOMEPAGE INTRO
  ===================================================== */

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

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
  ===================================================== */

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
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    revealElements.length &&
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
  ===================================================== */

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
  ===================================================== */

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
     BOOKING PAGE
  ===================================================== */

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


  let selectedResidence = "";


  /* =====================================================
     SELECT RESIDENCE
  ===================================================== */

  bookingCards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        (event) => {

          event.preventDefault();


          selectedResidence =
            card.dataset.residence;


          if (residenceInput) {

            residenceInput.value =
              selectedResidence;

          }


          if (
            selectedResidenceText
          ) {

            selectedResidenceText.textContent =
              selectedResidence;

          }


          bookingCards.forEach(
            (item) => {

              item.classList.remove(
                "selected"
              );

            }
          );


          card.classList.add(
            "selected"
          );


          if (bookingFormSection) {

            bookingFormSection.scrollIntoView({
              behavior: "smooth"
            });

          }

        }
      );

    }
  );


  /* =====================================================
     DATE RESTRICTIONS
  ===================================================== */

  const checkin =
    document.querySelector(
      "#checkin"
    );

  const checkout =
    document.querySelector(
      "#checkout"
    );


  function getToday() {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");


    return `${year}-${month}-${day}`;

  }


  if (checkin) {

    checkin.min =
      getToday();

  }


  if (checkout) {

    checkout.min =
      getToday();

  }


  if (checkin && checkout) {

    checkin.addEventListener(
      "change",
      () => {

        checkout.min =
          checkin.value;

        if (
          checkout.value &&
          checkout.value <= checkin.value
        ) {

          checkout.value = "";

        }

      }
    );

  }


  /* =====================================================
     BOOKING FORM SUBMISSION
  ===================================================== */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        const bookingMessage =
          document.querySelector(
            "#bookingMessage"
          );


        if (!selectedResidence) {

          if (bookingMessage) {

            bookingMessage.textContent =
              "Please select a residence first.";

            bookingMessage.className =
              "booking-message error";

          }

          return;

        }


        if (
          !checkin ||
          !checkout ||
          !checkin.value ||
          !checkout.value
        ) {

          if (bookingMessage) {

            bookingMessage.textContent =
              "Please select your check-in and check-out dates.";

            bookingMessage.className =
              "booking-message error";

          }

          return;

        }


        if (
          checkout.value <=
          checkin.value
        ) {

          if (bookingMessage) {

            bookingMessage.textContent =
              "Check-out must be after check-in.";

            bookingMessage.className =
              "booking-message error";

          }

          return;

        }


        const submitButton =
          bookingForm.querySelector(
            ".booking-submit"
          );


        if (submitButton) {

          submitButton.disabled =
            true;

          submitButton.classList.add(
            "loading"
          );

        }


        if (bookingMessage) {

          bookingMessage.textContent =
            "Sending your request...";

          bookingMessage.className =
            "booking-message";

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


          const result =
            await response.json();


          if (!response.ok) {

            throw new Error(
              result.message ||
              "Something went wrong."
            );

          }


          bookingForm.reset();

          selectedResidence = "";


          if (residenceInput) {
            residenceInput.value = "";
          }


          if (
            selectedResidenceText
          ) {

            selectedResidenceText.textContent =
              "Please select a residence above";

          }


          bookingCards.forEach(
            (card) => {

              card.classList.remove(
                "selected"
              );

            }
          );


          if (bookingMessage) {

            bookingMessage.textContent =
              "Your booking request has been sent successfully. We will contact you shortly.";

            bookingMessage.className =
              "booking-message success";

          }

        } catch (error) {

          console.error(
            "Booking request error:",
            error
          );


          if (bookingMessage) {

            bookingMessage.textContent =
              "We could not send your request. Please try again or contact us on WhatsApp.";

            bookingMessage.className =
              "booking-message error";

          }

        } finally {

          if (submitButton) {

            submitButton.disabled =
              false;

            submitButton.classList.remove(
              "loading"
            );

          }

        }

      }
    );

  }

});
