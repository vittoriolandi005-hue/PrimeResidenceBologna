/* =========================================================
   PRIME RESIDENCE BOLOGNA
   PREMIUM WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     01. PREMIUM INTRO SCROLL
     NON MODIFICARE
  ======================================================= */

  const loader = document.querySelector(".loader");
  const hero = document.querySelector(".hero");

  if (loader && hero) {

    const INTRO_DURATION = 2200;

    let introFinished = false;
    let introAnimating = false;
    let startTime = null;
    let touchStartY = 0;

    document.body.style.overflow = "hidden";

    loader.style.transform = "translate3d(0,0,0)";
    loader.style.willChange = "transform";


    function ease(t) {

      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    }


    function finishIntro() {

      introFinished = true;
      introAnimating = false;

      loader.style.transform =
        "translate3d(0,-100%,0)";

      loader.classList.add("hide");

      document.body.style.overflow = "";

    }


    function animate(now) {

      if (!startTime) startTime = now;

      const elapsed =
        now - startTime;

      const progress =
        Math.min(
          elapsed / INTRO_DURATION,
          1
        );

      const eased =
        ease(progress);

      loader.style.transform =
        `translate3d(0,${-eased * 100}%,0)`;


      if (progress < 1) {

        requestAnimationFrame(
          animate
        );

      } else {

        finishIntro();

      }

    }


    function startIntro() {

      if (
        introFinished ||
        introAnimating
      ) return;

      introAnimating = true;
      startTime = null;

      requestAnimationFrame(
        animate
      );

    }


    window.addEventListener(
      "wheel",
      e => {

        if (introFinished) return;

        e.preventDefault();

        if (e.deltaY > 0) {

          startIntro();

        }

      },
      {
        passive: false
      }
    );


    window.addEventListener(
      "touchstart",
      e => {

        touchStartY =
          e.touches[0].clientY;

      },
      {
        passive: true
      }
    );


    window.addEventListener(
      "touchmove",
      e => {

        if (introFinished) return;

        const movement =
          touchStartY -
          e.touches[0].clientY;


        if (movement > 6) {

          e.preventDefault();

          startIntro();

        }

      },
      {
        passive: false
      }
    );


    window.addEventListener(
      "keydown",
      e => {

        if (introFinished) return;


        if (
          e.key === "ArrowDown" ||
          e.key === "PageDown" ||
          e.key === " "
        ) {

          e.preventDefault();

          startIntro();

        }

      }
    );

  }


  /* =======================================================
     02. NAVBAR
  ======================================================= */

  const navbar =
    document.querySelector(
      ".navbar"
    );


  function updateNavbar() {

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


  updateNavbar();


  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive: true
    }
  );


  /* =======================================================
     03. MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.querySelector(
      ".menu-toggle"
    );

  const mobileMenu =
    document.querySelector(
      ".mobile-menu"
    );


  if (
    menuToggle &&
    mobileMenu
  ) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );


    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          menuToggle.classList.toggle(
            "active"
          );


        mobileMenu.classList.toggle(
          "active",
          open
        );


        menuToggle.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        document.body.style.overflow =
          open
            ? "hidden"
            : "";

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            menuToggle.classList.remove(
              "active"
            );

            mobileMenu.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            document.body.style.overflow =
              "";

          }
        );

      });

  }


  /* =======================================================
     04. REVEAL ANIMATIONS
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (revealElements.length) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      el => {

        observer.observe(el);

      }
    );

  }


  /* =======================================================
     05. SMOOTH ANCHORS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        e => {

          const id =
            link.getAttribute(
              "href"
            );


          if (
            !id ||
            id === "#"
          ) return;


          const target =
            document.querySelector(
              id
            );


          if (!target) return;


          e.preventDefault();


          const offset =
            navbar
              ? navbar.offsetHeight
              : 0;


          window.scrollTo({

            top:
              target.offsetTop -
              offset,

            behavior:
              "smooth"

          });

        }
      );

    });


  /* =======================================================
     06. APARTMENT GALLERY
     AUTOPLAY + SWIPE + DRAG
  ======================================================= */

  const galleries =
    document.querySelectorAll(
      ".apartment-gallery"
    );


  galleries.forEach(
    gallery => {

      const slides =
        Array.from(
          gallery.querySelectorAll(
            ".apartment-slide"
          )
        );


      if (
        slides.length < 2
      ) return;


      const section =
        gallery.closest(
          ".apartment-gallery-section"
        );


      const counter =
        section
          ? section.querySelector(
              ".apartment-gallery-counter"
            )
          : null;


      let current = 0;

      let autoplay = null;

      let touchStartX = 0;

      let touchEndX = 0;

      let mouseStartX = 0;

      let mouseEndX = 0;

      let dragging = false;


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


        slides.forEach(
          slide => {

            slide.classList.remove(
              "active"
            );

          }
        );


        slides[index]
          .classList.add(
            "active"
          );


        current = index;


        if (counter) {

          counter.textContent =
            `${String(
              current + 1
            ).padStart(2, "0")} / ${String(
              slides.length
            ).padStart(2, "0")}`;

        }

      }


      function nextSlide() {

        showSlide(
          current + 1
        );

      }


      function previousSlide() {

        showSlide(
          current - 1
        );

      }


      function stopAutoplay() {

        if (autoplay) {

          clearInterval(
            autoplay
          );

          autoplay = null;

        }

      }


      function startAutoplay() {

        stopAutoplay();


        autoplay =
          setInterval(
            nextSlide,
            5000
          );

      }


      function handleSwipe(
        start,
        end
      ) {

        const difference =
          start - end;


        if (
          Math.abs(difference) <
          45
        ) return;


        if (
          difference > 0
        ) {

          nextSlide();

        } else {

          previousSlide();

        }


        startAutoplay();

      }


      gallery.addEventListener(
        "touchstart",
        e => {

          touchStartX =
            e.touches[0].clientX;

        },
        {
          passive: true
        }
      );


      gallery.addEventListener(
        "touchend",
        e => {

          touchEndX =
            e.changedTouches[0].clientX;


          handleSwipe(
            touchStartX,
            touchEndX
          );

        },
        {
          passive: true
        }
      );


      gallery.addEventListener(
        "mousedown",
        e => {

          dragging = true;

          mouseStartX =
            e.clientX;

          mouseEndX =
            e.clientX;

          gallery.style.userSelect =
            "none";

        }
      );


      gallery.addEventListener(
        "mousemove",
        e => {

          if (!dragging) return;

          mouseEndX =
            e.clientX;

        }
      );


      gallery.addEventListener(
        "mouseup",
        e => {

          if (!dragging) return;


          dragging = false;

          mouseEndX =
            e.clientX;

          gallery.style.userSelect =
            "";


          handleSwipe(
            mouseStartX,
            mouseEndX
          );

        }
      );


      gallery.addEventListener(
        "mouseleave",
        () => {

          if (!dragging) return;


          dragging = false;

          gallery.style.userSelect =
            "";


          handleSwipe(
            mouseStartX,
            mouseEndX
          );

        }
      );


      showSlide(0);

      startAutoplay();

    }
  );


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


  function getToday() {

    const d =
      new Date();


    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  }


  if (checkinInput) {

    checkinInput.min =
      getToday();

  }


  if (checkoutInput) {

    checkoutInput.min =
      getToday();

  }


  if (
    checkinInput &&
    checkoutInput
  ) {

    checkinInput.addEventListener(
      "change",
      () => {

        checkoutInput.min =
          checkinInput.value;


        if (
          checkoutInput.value &&
          checkoutInput.value <=
            checkinInput.value
        ) {

          checkoutInput.value =
            "";

        }

      }
    );

  }


  bookingCards.forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          bookingCards.forEach(
            c => {

              c.classList.remove(
                "selected"
              );

            }
          );


          card.classList.add(
            "selected"
          );


          if (residenceInput) {

            residenceInput.value =
              card.dataset.residence;

          }


          if (
            selectedResidenceText
          ) {

            selectedResidenceText.textContent =
              card.dataset.residence;

          }


          if (
            bookingFormSection
          ) {

            bookingFormSection
              .scrollIntoView({

                behavior:
                  "smooth"

              });

          }

        }
      );

    }
  );


  function showMessage(
    text,
    type
  ) {

    if (!bookingMessage) return;


    bookingMessage.textContent =
      text;

    bookingMessage.className =
      `booking-message ${type}`;

    bookingMessage.style.display =
      "block";

  }


  function hideMessage() {

    if (!bookingMessage) return;


    bookingMessage.style.display =
      "none";

  }


  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      async e => {

        e.preventDefault();

        hideMessage();


        if (
          !residenceInput.value
        ) {

          showMessage(
            "Please select a residence first.",
            "error"
          );

          return;

        }


        if (
          !checkinInput.value ||
          !checkoutInput.value
        ) {

          showMessage(
            "Please select your dates.",
            "error"
          );

          return;

        }


        if (
          checkoutInput.value <=
          checkinInput.value
        ) {

          showMessage(
            "Check-out must be after check-in.",
            "error"
          );

          return;

        }


        const privacy =
          document.querySelector(
            "#privacy"
          );


        if (
          privacy &&
          !privacy.checked
        ) {

          showMessage(
            "Please accept the privacy policy.",
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

        }


        const originalText =
          bookingSubmit
            ? bookingSubmit.textContent
            : "";


        if (bookingSubmit) {

          bookingSubmit.textContent =
            "SENDING...";

        }


        const data =
          Object.fromEntries(
            new FormData(
              bookingForm
            ).entries()
          );


        try {

          const response =
            await fetch(
              "/api/booking-request",
              {

                method:
                  "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify(
                    data
                  )

              }
            );


          const result =
            await response.json();


          if (!response.ok) {

            throw new Error(
              result.message
            );

          }


          showMessage(
            result.message ||
            "Booking request sent successfully.",
            "success"
          );


          const selected =
            residenceInput.value;


          bookingForm.reset();


          residenceInput.value =
            selected;


          if (
            selectedResidenceText
          ) {

            selectedResidenceText.textContent =
              selected;

          }


        } catch (err) {

          showMessage(
            err.message ||
            "Unable to send request.",
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
              originalText;

          }

        }

      }
    );

  }


  /* =======================================================
     08. PRIME RESIDENCE ASSISTANT
  ======================================================= */

  const assistant =
    document.querySelector(
      ".prime-assistant"
    );


  if (assistant) {

    const page =
      assistant.dataset.assistantPage ||
      "home";

    const residence =
      assistant.dataset.assistantResidence ||
      "";


    const launcher =
      assistant.querySelector(
        ".prime-assistant-launcher"
      );

    const chatWindow =
      assistant.querySelector(
        ".prime-assistant-window"
      );

    const closeChat =
      assistant.querySelector(
        ".prime-assistant-close"
      );

    const prompt =
      assistant.querySelector(
        ".prime-assistant-prompt"
      );

    const promptMain =
      assistant.querySelector(
        ".assistant-prompt-main"
      );

    const promptClose =
      assistant.querySelector(
        ".assistant-prompt-close"
      );

    const messages =
      assistant.querySelector(
        ".prime-assistant-messages"
      );

    const form =
      assistant.querySelector(
        ".prime-assistant-form"
      );

    const input =
      assistant.querySelector(
        ".prime-assistant-input"
      );

    const suggestionButtons =
      assistant.querySelectorAll(
        ".assistant-suggestion"
      );


    const promptStorageKey =
      `primeAssistantPromptClosed_${page}`;


    /* =====================================================
       ASSISTANT DATA
    ===================================================== */

    const residences = {

      gastone: {

        name:
          "Gastone Rossi 12",

        bedrooms:
          3,

        bathrooms:
          2,

        guests:
          6,

        address:
          "Via Gastone Rossi 12, Bologna",

        description:
          "Gastone Rossi 12 is a spacious residence in Bologna with 3 bedrooms, 2 bathrooms and space for up to 6 guests.",

        booking:
          "booking.html"

      },


      barontini: {

        name:
          "Barontini 8",

        bedrooms:
          2,

        bathrooms:
          1,

        guests:
          6,

        address:
          "Via Barontini 8, Bologna",

        description:
          "Barontini 8 is a refined two-bedroom residence in Bologna with 1 bathroom and space for up to 6 guests.",

        booking:
          "booking.html"

      }

    };


    /* =====================================================
       LANGUAGE
    ===================================================== */

    function isItalian(
      text
    ) {

      const words = [

        "ciao",
        "salve",
        "buongiorno",
        "buonasera",
        "appartamento",
        "camere",
        "camera",
        "bagni",
        "bagno",
        "ospiti",
        "prenot",
        "prezzo",
        "costa",
        "quanto",
        "dove",
        "indirizzo",
        "parcheggio",
        "animali",
        "cani",
        "gatti",
        "wifi",
        "aria condizionata",
        "check in",
        "check-in",
        "check out",
        "check-out",
        "disponibil",
        "famiglia",
        "famiglie",
        "gruppo",
        "persone",
        "grazie",
        "contatto",
        "whatsapp"

      ];


      const lower =
        text.toLowerCase();


      return words.some(
        word => {

          return lower.includes(
            word
          );

        }
      );

    }


    /* =====================================================
       MESSAGE CREATION
    ===================================================== */

    function scrollMessages() {

      if (!messages) return;


      requestAnimationFrame(
        () => {

          messages.scrollTop =
            messages.scrollHeight;

        }
      );

    }


    function addMessage(
      text,
      type = "bot",
      actions = []
    ) {

      if (!messages) return;


      const wrapper =
        document.createElement(
          "div"
        );


      wrapper.className =
        `assistant-message assistant-message-${type}`;


      const label =
        document.createElement(
          "span"
        );


      label.className =
        "assistant-message-label";


      label.textContent =
        type === "user"
          ? "YOU"
          : "PRIME ASSISTANT";


      const paragraph =
        document.createElement(
          "p"
        );


      paragraph.textContent =
        text;


      wrapper.appendChild(
        label
      );


      wrapper.appendChild(
        paragraph
      );


      actions.forEach(
        action => {

          const link =
            document.createElement(
              "a"
            );


          link.href =
            action.href;


          link.textContent =
            action.label;


          if (
            action.external
          ) {

            link.target =
              "_blank";

            link.rel =
              "noopener noreferrer";

          }


          wrapper.appendChild(
            link
          );

        }
      );


      messages.appendChild(
        wrapper
      );


      scrollMessages();

    }


    /* =====================================================
       OPEN / CLOSE
    ===================================================== */

    function hidePrompt() {

      if (!prompt) return;


      prompt.classList.remove(
        "visible"
      );


      prompt.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    function openChat() {

      if (!chatWindow) return;


      hidePrompt();


      assistant.classList.add(
        "chat-open"
      );


      chatWindow.classList.add(
        "open"
      );


      chatWindow.setAttribute(
        "aria-hidden",
        "false"
      );


      if (launcher) {

        launcher.setAttribute(
          "aria-expanded",
          "true"
        );

      }


      setTimeout(
        () => {

          if (input) {

            input.focus();

          }

        },
        250
      );

    }


    function closeAssistant() {

      if (!chatWindow) return;


      assistant.classList.remove(
        "chat-open"
      );


      chatWindow.classList.remove(
        "open"
      );


      chatWindow.setAttribute(
        "aria-hidden",
        "true"
      );


      if (launcher) {

        launcher.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }


    if (launcher) {

      launcher.addEventListener(
        "click",
        openChat
      );

    }


    if (closeChat) {

      closeChat.addEventListener(
        "click",
        closeAssistant
      );

    }


    if (promptMain) {

      promptMain.addEventListener(
        "click",
        openChat
      );

    }


    if (promptClose) {

      promptClose.addEventListener(
        "click",
        e => {

          e.stopPropagation();


          hidePrompt();


          try {

            sessionStorage.setItem(
              promptStorageKey,
              "1"
            );

          } catch (error) {

            /* sessionStorage unavailable */

          }

        }
      );

    }


    /* =====================================================
       AUTOMATIC RESIDENCE BANNER
       HOME = NEVER AUTOMATIC
    ===================================================== */

    if (
      page !== "home" &&
      prompt
    ) {

      let closed =
        false;


      try {

        closed =
          sessionStorage.getItem(
            promptStorageKey
          ) === "1";

      } catch (error) {

        closed = false;

      }


      if (!closed) {

        setTimeout(
          () => {

            if (
              !assistant.classList.contains(
                "chat-open"
              )
            ) {

              prompt.classList.add(
                "visible"
              );


              prompt.setAttribute(
                "aria-hidden",
                "false"
              );

            }

          },
          2500
        );

      }

    }


    /* =====================================================
       ANSWERS
    ===================================================== */

    function getResponse(
      originalQuestion
    ) {

      const question =
        originalQuestion
          .toLowerCase()
          .trim();


      const italian =
        isItalian(
          originalQuestion
        );


      const current =
        residences[page] ||
        null;


      const actions = [];


      /* GREETING */

      if (
        /^(hi|hello|hey|ciao|salve|buongiorno|buonasera)\b/.test(
          question
        )
      ) {

        return {

          text:
            italian
              ? "Benvenuto a Prime Residence Bologna. Posso aiutarti con gli appartamenti, la prenotazione, la posizione e le informazioni sul soggiorno."
              : "Welcome to Prime Residence Bologna. I can help with our residences, booking, location and information about your stay.",

          actions

        };

      }


      /* THANK YOU */

      if (
        question.includes(
          "thank"
        ) ||
        question.includes(
          "grazie"
        )
      ) {

        return {

          text:
            italian
              ? "È un piacere. Se vuoi sapere altro su Prime Residence Bologna, chiedimi pure."
              : "You're very welcome. If there's anything else you'd like to know about Prime Residence Bologna, just ask.",

          actions

        };

      }


      /* ITALIAN / ENGLISH */

      if (
        question.includes(
          "speak italian"
        ) ||
        question.includes(
          "parli italiano"
        )
      ) {

        return {

          text:
            "Sì. Possiamo continuare in italiano.",

          actions

        };

      }


      if (
        question.includes(
          "speak english"
        ) ||
        question.includes(
          "parli inglese"
        )
      ) {

        return {

          text:
            "Yes. I can assist you in English.",

          actions

        };

      }


      /* LIST RESIDENCES */

      if (
        question.includes(
          "which residences"
        ) ||
        question.includes(
          "what residences"
        ) ||
        question.includes(
          "the residences"
        ) ||
        question.includes(
          "quali appartamenti"
        ) ||
        question.includes(
          "quali residence"
        )
      ) {

        return {

          text:
            italian
              ? "Prime Residence Bologna dispone di due residence: Gastone Rossi 12 e Barontini 8. Posso aiutarti anche a confrontarli."
              : "Prime Residence Bologna currently offers two residences: Gastone Rossi 12 and Barontini 8. I can also help you compare them.",

          actions

        };

      }


      /* SPECIFIC GASTONE */

      if (
        question.includes(
          "gastone"
        ) &&
        (
          question.includes(
            "tell"
          ) ||
          question.includes(
            "about"
          ) ||
          question.includes(
            "inform"
          ) ||
          question.includes(
            "descriv"
          )
        )
      ) {

        return {

          text:
            italian
              ? "Gastone Rossi 12 è un residence spazioso a Bologna con 3 camere da letto, 2 bagni e spazio per un massimo di 6 ospiti."
              : residences.gastone.description,

          actions: [

            {
              label:
                italian
                  ? "VEDI GASTONE ROSSI 12 →"
                  : "VIEW GASTONE ROSSI 12 →",

              href:
                "gastone-rossi-12.html"

            }

          ]

        };

      }


      /* SPECIFIC BARONTINI */

      if (
        question.includes(
          "barontini"
        ) &&
        (
          question.includes(
            "tell"
          ) ||
          question.includes(
            "about"
          ) ||
          question.includes(
            "inform"
          ) ||
          question.includes(
            "descriv"
          )
        )
      ) {

        return {

          text:
            italian
              ? "Barontini 8 è un residence con 2 camere da letto, 1 bagno e spazio per un massimo di 6 ospiti."
              : residences.barontini.description,

          actions: [

            {
              label:
                italian
                  ? "VEDI BARONTINI 8 →"
                  : "VIEW BARONTINI 8 →",

              href:
                "barontini-8.html"

            }

          ]

        };

      }


      /* CURRENT RESIDENCE DETAILS */

      if (
        current &&
        (
          question.includes(
            "residence-details"
          ) ||
          question.includes(
            "this residence"
          ) ||
          question.includes(
            "this apartment"
          ) ||
          question.includes(
            "questo appartamento"
          ) ||
          question.includes(
            "questa struttura"
          )
        )
      ) {

        return {

          text:
            italian
              ? `${current.name} dispone di ${current.bedrooms} camere da letto, ${current.bathrooms} ${current.bathrooms === 1 ? "bagno" : "bagni"} e può ospitare fino a ${current.guests} persone.`
              : `${current.name} has ${current.bedrooms} bedrooms, ${current.bathrooms} ${current.bathrooms === 1 ? "bathroom" : "bathrooms"} and can accommodate up to ${current.guests} guests.`,

          actions

        };

      }


      /* BEDROOMS */

      if (
        question.includes(
          "bedroom"
        ) ||
        question.includes(
          "bedrooms"
        ) ||
        question.includes(
          "camera"
        ) ||
        question.includes(
          "camere"
        )
      ) {

        let target =
          current;


        if (
          question.includes(
            "gastone"
          )
        ) {

          target =
            residences.gastone;

        }


        if (
          question.includes(
            "barontini"
          )
        ) {

          target =
            residences.barontini;

        }


        if (target) {

          return {

            text:
              italian
                ? `${target.name} dispone di ${target.bedrooms} camere da letto.`
                : `${target.name} has ${target.bedrooms} bedrooms.`,

            actions

          };

        }


        return {

          text:
            italian
              ? "Gastone Rossi 12 dispone di 3 camere da letto, mentre Barontini 8 ne dispone di 2."
              : "Gastone Rossi 12 has 3 bedrooms, while Barontini 8 has 2.",

          actions

        };

      }


      /* BATHROOMS */

      if (
        question.includes(
          "bathroom"
        ) ||
        question.includes(
          "bathrooms"
        ) ||
        question.includes(
          "bagno"
        ) ||
        question.includes(
          "bagni"
        )
      ) {

        let target =
          current;


        if (
          question.includes(
            "gastone"
          )
        ) {

          target =
            residences.gastone;

        }


        if (
          question.includes(
            "barontini"
          )
        ) {

          target =
            residences.barontini;

        }


        if (target) {

          return {

            text:
              italian
                ? `${target.name} dispone di ${target.bathrooms} ${target.bathrooms === 1 ? "bagno" : "bagni"}.`
                : `${target.name} has ${target.bathrooms} ${target.bathrooms === 1 ? "bathroom" : "bathrooms"}.`,

            actions

          };

        }


        return {

          text:
            italian
              ? "Gastone Rossi 12 dispone di 2 bagni, mentre Barontini 8 dispone di 1 bagno."
              : "Gastone Rossi 12 has 2 bathrooms, while Barontini 8 has 1.",

          actions

        };

      }


      /* GUESTS */

      if (
        question.includes(
          "guest"
        ) ||
        question.includes(
          "guests"
        ) ||
        question.includes(
          "ospiti"
        ) ||
        question.includes(
          "persone"
        ) ||
        question.includes(
          "people"
        ) ||
        question.includes(
          "sleep"
        )
      ) {

        if (
          current &&
          !question.includes(
            "both"
          )
        ) {

          return {

            text:
              italian
                ? `${current.name} può ospitare fino a ${current.guests} persone.`
                : `${current.name} can accommodate up to ${current.guests} guests.`,

            actions

          };

        }


        return {

          text:
            italian
              ? "Entrambi i residence Prime Residence possono ospitare fino a 6 persone."
              : "Both Prime Residence apartments can accommodate up to 6 guests.",

          actions

        };

      }


      /* COMPARE */

      if (
        question.includes(
          "compare"
        ) ||
        question.includes(
          "difference"
        ) ||
        question.includes(
          "which is better"
        ) ||
        question.includes(
          "better apartment"
        ) ||
        question.includes(
          "differenza"
        ) ||
        question.includes(
          "quale scegliere"
        ) ||
        question.includes(
          "quale è meglio"
        ) ||
        question.includes(
          "quale e meglio"
        )
      ) {

        return {

          text:
            italian
              ? "Gastone Rossi 12 offre 3 camere da letto e 2 bagni, mentre Barontini 8 offre 2 camere da letto e 1 bagno. Entrambi possono ospitare fino a 6 persone. Se desideri più camere separate e un bagno aggiuntivo, Gastone Rossi 12 può essere la soluzione più comoda."
              : "Gastone Rossi 12 offers 3 bedrooms and 2 bathrooms, while Barontini 8 offers 2 bedrooms and 1 bathroom. Both accommodate up to 6 guests. If you prefer more separate bedrooms and an additional bathroom, Gastone Rossi 12 may be the more convenient choice.",

          actions

        };

      }


      /* GROUP OF SIX + BATHROOMS */

      if (
        (
          question.includes(
            "6"
          ) ||
          question.includes(
            "six"
          ) ||
          question.includes(
            "sei"
          )
        ) &&
        (
          question.includes(
            "bathroom"
          ) ||
          question.includes(
            "bagni"
          ) ||
          question.includes(
            "bathrooms"
          )
        )
      ) {

        return {

          text:
            italian
              ? "Entrambi possono ospitare fino a 6 persone, ma Gastone Rossi 12 dispone di 3 camere e 2 bagni, rispetto alle 2 camere e 1 bagno di Barontini 8. Per un gruppo di sei persone che desidera maggiore privacy, Gastone Rossi 12 può essere più comodo."
              : "Both residences accommodate up to 6 guests, but Gastone Rossi 12 offers 3 bedrooms and 2 bathrooms compared with 2 bedrooms and 1 bathroom at Barontini 8. For a group of six wanting more privacy, Gastone Rossi 12 may be more convenient.",

          actions

        };

      }


      /* FAMILY */

      if (
        question.includes(
          "family"
        ) ||
        question.includes(
          "families"
        ) ||
        question.includes(
          "famiglia"
        ) ||
        question.includes(
          "famiglie"
        )
      ) {

        return {

          text:
            italian
              ? "Entrambi i residence possono ospitare gruppi fino a 6 persone. Gastone Rossi 12, con 3 camere da letto e 2 bagni, può risultare particolarmente comodo per famiglie che desiderano più spazi separati."
              : "Both residences can accommodate groups of up to 6 guests. Gastone Rossi 12, with 3 bedrooms and 2 bathrooms, may be particularly comfortable for families needing more separate spaces.",

          actions

        };

      }


      /* GROUP */

      if (
        question.includes(
          "group"
        ) ||
        question.includes(
          "friends"
        ) ||
        question.includes(
          "gruppo"
        ) ||
        question.includes(
          "amici"
        )
      ) {

        return {

          text:
            italian
              ? "Sì. Entrambi i residence possono ospitare fino a 6 persone. Per gruppi che desiderano più camere e un secondo bagno, Gastone Rossi 12 offre maggiore separazione degli spazi."
              : "Yes. Both residences accommodate up to 6 guests. For groups wanting more bedrooms and a second bathroom, Gastone Rossi 12 offers more separation between spaces.",

          actions

        };

      }


      /* LOCATION */

      if (
        question.includes(
          "location"
        ) ||
        question.includes(
          "address"
        ) ||
        question.includes(
          "where"
        ) ||
        question.includes(
          "dove"
        ) ||
        question.includes(
          "indirizzo"
        )
      ) {

        let target =
          current;


        if (
          question.includes(
            "gastone"
          )
        ) {

          target =
            residences.gastone;

        }


        if (
          question.includes(
            "barontini"
          )
        ) {

          target =
            residences.barontini;

        }


        if (target) {

          return {

            text:
              italian
                ? `${target.name} si trova in ${target.address}. Nella pagina del residence trovi anche la mappa interattiva con la posizione.`
                : `${target.name} is located at ${target.address}. The residence page also includes an interactive map showing its location.`,

            actions: [

              {
                label:
                  "GOOGLE MAPS ↗",

                href:
                  target.name ===
                  "Gastone Rossi 12"
                    ? "https://www.google.com/maps/search/?api=1&query=Via%20Gastone%20Rossi%2012%20Bologna"
                    : "https://www.google.com/maps/search/?api=1&query=Via%20Barontini%208%20Bologna",

                external:
                  true

              }

            ]

          };

        }


        return {

          text:
            italian
              ? "Entrambi i Prime Residence si trovano a Bologna, Italia: Gastone Rossi 12 in Via Gastone Rossi 12 e Barontini 8 in Via Barontini 8."
              : "Both Prime Residence properties are located in Bologna, Italy: Gastone Rossi 12 at Via Gastone Rossi 12 and Barontini 8 at Via Barontini 8.",

          actions

        };

      }


      /* NEARBY */

      if (
        question.includes(
          "nearby"
        ) ||
        question.includes(
          "around"
        ) ||
        question.includes(
          "attractions"
        ) ||
        question.includes(
          "vicino"
        ) ||
        question.includes(
          "dintorni"
        ) ||
        question.includes(
          "attrazioni"
        )
      ) {

        return {

          text:
            italian
              ? current
                ? `Nella pagina di ${current.name} trovi la sezione “Dintorni della struttura”, con luoghi e attrazioni vicine e la relativa distanza indicativa dal residence.`
                : "Ogni pagina residence include una mappa interattiva e una sezione con attrazioni e luoghi vicini."
              : current
                ? `The ${current.name} page includes an “Around the residence” section with nearby landmarks and their approximate distance from the property.`
                : "Each residence page includes an interactive map and a selection of nearby landmarks and attractions.",

          actions

        };

      }


      /* BOOKING */

      if (
        question.includes(
          "booking"
        ) ||
        question.includes(
          "book"
        ) ||
        question.includes(
          "reserve"
        ) ||
        question.includes(
          "reservation"
        ) ||
        question.includes(
          "prenot"
        )
      ) {

        return {

          text:
            italian
              ? current
                ? `Puoi inviare una richiesta per ${current.name} tramite la pagina Book Your Stay. Inserisci il residence, le date e i tuoi dati. La richiesta non costituisce una conferma automatica.`
                : "Puoi inviare una richiesta direttamente tramite la pagina Book Your Stay, scegliendo il residence, le date e inserendo i tuoi dati. La richiesta non costituisce una conferma automatica."
              : current
                ? `You can send a request for ${current.name} through the Book Your Stay page. Select the residence, enter your dates and details. A request is not an automatic booking confirmation.`
                : "You can submit a request directly through the Book Your Stay page by selecting the residence, dates and entering your details. A request is not an automatic booking confirmation.",

          actions: [

            {
              label:
                italian
                  ? "PRENOTA IL TUO SOGGIORNO →"
                  : "BOOK YOUR STAY →",

              href:
                "booking.html"

            }

          ]

        };

      }


      /* AVAILABILITY */

      if (
        question.includes(
          "available"
        ) ||
        question.includes(
          "availability"
        ) ||
        question.includes(
          "disponibil"
        )
      ) {

        return {

          text:
            italian
              ? "La disponibilità dipende dalle date richieste. Utilizza la pagina Book Your Stay per inviare le date del soggiorno: Prime Residence potrà verificare la disponibilità."
              : "Availability depends on your requested dates. Please use the Book Your Stay page to send your dates so Prime Residence can check availability.",

          actions: [

            {
              label:
                italian
                  ? "CONTROLLA LE DATE →"
                  : "SEND YOUR DATES →",

              href:
                "booking.html"

            }

          ]

        };

      }


      /* PRICE */

      if (
        question.includes(
          "price"
        ) ||
        question.includes(
          "cost"
        ) ||
        question.includes(
          "rate"
        ) ||
        question.includes(
          "quanto costa"
        ) ||
        question.includes(
          "prezzo"
        ) ||
        question.includes(
          "tariff"
        )
      ) {

        return {

          text:
            italian
              ? "Le tariffe possono variare in base al residence, alle date e alla durata del soggiorno. Invia le tue date tramite Book Your Stay per ricevere le informazioni relative alla richiesta."
              : "Rates can vary depending on the residence, dates and length of stay. Send your dates through the Book Your Stay page to receive the relevant information.",

          actions: [

            {
              label:
                italian
                  ? "INVIA LE DATE →"
                  : "SEND YOUR DATES →",

              href:
                "booking.html"

            }

          ]

        };

      }


      /* LONG STAY */

      if (
        question.includes(
          "long stay"
        ) ||
        question.includes(
          "long period"
        ) ||
        question.includes(
          "extended"
        ) ||
        question.includes(
          "lungo periodo"
        ) ||
        question.includes(
          "lungo soggiorno"
        )
      ) {

        return {

          text:
            italian
              ? "Gastone Rossi 12 è particolarmente adatto a soggiorni più lunghi grazie agli spazi generosi. Per un periodo specifico puoi inviare le tue date tramite la pagina Book Your Stay."
              : "Gastone Rossi 12 is particularly suited to comfortable longer stays thanks to its generous spaces. For a specific period, send your dates through the Book Your Stay page.",

          actions: [

            {
              label:
                italian
                  ? "BOOK YOUR STAY →"
                  : "BOOK YOUR STAY →",

              href:
                "booking.html"

            }

          ]

        };

      }


      /* CHECK-IN */

      if (
        question.includes(
          "checkin"
        ) ||
        question.includes(
          "check-in"
        ) ||
        question.includes(
          "check in"
        ) ||
        question.includes(
          "arrive"
        ) ||
        question.includes(
          "arrival"
        ) ||
        question.includes(
          "arrivo"
        )
      ) {

        return {

          text:
            italian
              ? "Le informazioni e le istruzioni precise per il check-in vengono comunicate agli ospiti prima dell'arrivo. Per richieste particolari, come un check-in anticipato, contatta direttamente Prime Residence."
              : "Exact check-in details and arrival instructions are provided to guests before arrival. For special requests such as early check-in, please contact Prime Residence directly.",

          actions

        };

      }


      /* CHECK-OUT */

      if (
        question.includes(
          "checkout"
        ) ||
        question.includes(
          "check-out"
        ) ||
        question.includes(
          "check out"
        ) ||
        question.includes(
          "late check"
        )
      ) {

        return {

          text:
            italian
              ? "Le informazioni precise per il check-out vengono comunicate per il soggiorno. Un eventuale late check-out dipende dalla disponibilità e deve essere richiesto a Prime Residence."
              : "Exact check-out information is provided for your stay. Late check-out depends on availability and should be requested directly from Prime Residence.",

          actions

        };

      }


      /* CANCELLATION */

      if (
        question.includes(
          "cancel"
        ) ||
        question.includes(
          "cancellation"
        ) ||
        question.includes(
          "cancell"
        ) ||
        question.includes(
          "annull"
        )
      ) {

        return {

          text:
            italian
              ? "Le condizioni di cancellazione dipendono dai termini associati alla prenotazione. Contatta Prime Residence per conoscere le condizioni applicabili al tuo soggiorno."
              : "Cancellation conditions depend on the terms associated with your reservation. Please contact Prime Residence for the conditions applicable to your stay.",

          actions

        };

      }


      /* PARKING */

      if (
        question.includes(
          "parking"
        ) ||
        question.includes(
          "parcheggio"
        )
      ) {

        return {

          text:
            italian
              ? "Non dispongo ancora di informazioni confermate sul parcheggio per questa struttura. Per evitare di darti un'informazione inesatta, ti consiglio di contattare direttamente Prime Residence."
              : "I don't currently have confirmed parking information for this residence. To avoid giving you inaccurate information, please contact Prime Residence directly.",

          actions

        };

      }


      /* PETS */

      if (
        question.includes(
          "pet"
        ) ||
        question.includes(
          "pets"
        ) ||
        question.includes(
          "dog"
        ) ||
        question.includes(
          "cat"
        ) ||
        question.includes(
          "animali"
        ) ||
        question.includes(
          "cane"
        ) ||
        question.includes(
          "gatto"
        )
      ) {

        return {

          text:
            italian
              ? "Non dispongo ancora di informazioni confermate sulla politica relativa agli animali. Contatta Prime Residence prima della prenotazione per avere una risposta precisa."
              : "I don't currently have confirmed information about the pet policy. Please contact Prime Residence before booking for an accurate answer.",

          actions

        };

      }


      /* WIFI */

      if (
        question.includes(
          "wifi"
        ) ||
        question.includes(
          "wi-fi"
        ) ||
        question.includes(
          "internet"
        )
      ) {

        return {

          text:
            italian
              ? "Questa informazione non è ancora confermata nei dati dell'assistente. Preferisco non indicarti un servizio finché non è stato verificato da Prime Residence."
              : "This amenity is not yet confirmed in the assistant's information. I prefer not to state that a service is available until Prime Residence has verified it.",

          actions

        };

      }


      /* AIR CONDITIONING */

      if (
        question.includes(
          "air conditioning"
        ) ||
        question.includes(
          "air conditioner"
        ) ||
        question.includes(
          "aria condizionata"
        )
      ) {

        return {

          text:
            italian
              ? "Non dispongo ancora di informazioni confermate sull'aria condizionata. Prime Residence può fornirti la lista aggiornata dei servizi del residence."
              : "I don't currently have confirmed information about air conditioning. Prime Residence can provide the current amenity information for your residence.",

          actions

        };

      }


      /* WASHING MACHINE */

      if (
        question.includes(
          "washing machine"
        ) ||
        question.includes(
          "washer"
        ) ||
        question.includes(
          "lavatrice"
        )
      ) {

        return {

          text:
            italian
              ? "Non dispongo ancora di informazioni confermate sulla lavatrice. Per evitare informazioni inesatte, ti consiglio di chiedere direttamente a Prime Residence."
              : "I don't currently have confirmed information about a washing machine. To avoid inaccurate information, please ask Prime Residence directly.",

          actions

        };

      }


      /* PROBLEM DURING STAY */

      if (
        question.includes(
          "problem"
        ) ||
        question.includes(
          "issue"
        ) ||
        question.includes(
          "emergency"
        ) ||
        question.includes(
          "problema"
        ) ||
        question.includes(
          "aiuto"
        )
      ) {

        return {

          text:
            italian
              ? "Per qualsiasi problema che richieda assistenza durante il soggiorno, contatta direttamente Prime Residence. Puoi utilizzare WhatsApp per metterti in contatto rapidamente."
              : "For anything requiring assistance during your stay, please contact Prime Residence directly. You can use WhatsApp to get in touch quickly.",

          actions: [

            {
              label:
                "WHATSAPP ↗",

              href:
                "https://wa.me/393917055625",

              external:
                true

            }

          ]

        };

      }


      /* HUMAN / CONTACT */

      if (
        question.includes(
          "contact"
        ) ||
        question.includes(
          "person"
        ) ||
        question.includes(
          "human"
        ) ||
        question.includes(
          "whatsapp"
        ) ||
        question.includes(
          "email"
        ) ||
        question.includes(
          "contatt"
        ) ||
        question.includes(
          "persona"
        ) ||
        question.includes(
          "operatore"
        )
      ) {

        return {

          text:
            italian
              ? "Certo. Puoi contattare direttamente Prime Residence tramite WhatsApp o email."
              : "Of course. You can contact Prime Residence directly via WhatsApp or email.",

          actions: [

            {
              label:
                "WHATSAPP ↗",

              href:
                "https://wa.me/393917055625",

              external:
                true

            },

            {
              label:
                "EMAIL ↗",

              href:
                "mailto:vittoriolandi005@gmail.com"

            }

          ]

        };

      }


      /* FALLBACK */

      return {

        text:
          italian
            ? "Non dispongo ancora di informazioni confermate su questo argomento. Preferisco non darti una risposta inesatta. Se vuoi, puoi contattare direttamente Prime Residence tramite WhatsApp o email."
            : "I don't have confirmed information about that yet, and I prefer not to give you an inaccurate answer. You can contact Prime Residence directly via WhatsApp or email.",

        actions: [

          {
            label:
              "WHATSAPP ↗",

            href:
              "https://wa.me/393917055625",

            external:
              true

          },

          {
            label:
              "EMAIL ↗",

            href:
              "mailto:vittoriolandi005@gmail.com"

          }

        ]

      };

    }


    /* =====================================================
       PROCESS QUESTION
    ===================================================== */

    function processQuestion(
      question
    ) {

      if (
        !question ||
        !question.trim()
      ) return;


      const clean =
        question.trim();


      addMessage(
        clean,
        "user"
      );


      const response =
        getResponse(
          clean
        );


      setTimeout(
        () => {

          addMessage(
            response.text,
            "bot",
            response.actions
          );

        },
        320
      );

    }


    /* =====================================================
       FORM
    ===================================================== */

    if (
      form &&
      input
    ) {

      form.addEventListener(
        "submit",
        e => {

          e.preventDefault();


          const question =
            input.value;


          input.value =
            "";


          processQuestion(
            question
          );

        }
      );

    }


    /* =====================================================
       SUGGESTION BUTTONS
    ===================================================== */

    suggestionButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const type =
              button.dataset.question ||
              "";


            let question = "";


            switch (type) {

              case "residences":

                question =
                  "Which residences do you have?";

                break;


              case "residence-details":

                question =
                  "Tell me about this residence";

                break;


              case "compare":

                question =
                  "What is the difference between the two apartments?";

                break;


              case "booking":

                question =
                  "How can I book?";

                break;


              case "location":

                question =
                  currentPageQuestion(
                    page,
                    "location"
                  );

                break;


              case "checkin":

                question =
                  "How does check-in work?";

                break;


              default:

                question =
                  type;

            }


            processQuestion(
              question
            );

          }
        );

      }
    );


    function currentPageQuestion(
      currentPage,
      subject
    ) {

      if (
        subject === "location"
      ) {

        if (
          currentPage ===
          "gastone"
        ) {

          return "Where is Gastone Rossi 12?";

        }


        if (
          currentPage ===
          "barontini"
        ) {

          return "Where is Barontini 8?";

        }


        return "Where are the residences?";

      }


      return subject;

    }


    /* =====================================================
       ESCAPE CLOSE ASSISTANT
    ===================================================== */

    document.addEventListener(
      "keydown",
      e => {

        if (
          e.key === "Escape" &&
          assistant.classList.contains(
            "chat-open"
          )
        ) {

          closeAssistant();

        }

      }
    );

  }


  /* =======================================================
     09. ESC CLOSE MOBILE MENU
  ======================================================= */

  document.addEventListener(
    "keydown",
    e => {

      if (
        e.key === "Escape" &&
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
     10. YEAR
  ======================================================= */

  const year =
    document.querySelector(
      "#year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     READY
  ======================================================= */

  console.log(
    "Prime Residence Bologna — website ready."
  );

});
