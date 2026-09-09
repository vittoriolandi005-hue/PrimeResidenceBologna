/* ========================================================= 
   PRIME RESIDENCE BOLOGNA 
   PREMIUM WEBSITE JAVASCRIPT 
   Homepage + Premium Scroll + Booking 
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
 
          document.body.style.overflow = ""; 
 
        }); 
 
      }); 
 
  } 
 
 
  /* ======================================================= 
     04. PREMIUM HERO SCROLL
     
     IMPORTANTE:
     Questa è l'unica parte modificata.
     Primo scroll dalla HOME:
     HERO → transizione cinematografica →
     sezione successiva / "Stay Beautifully".
  ======================================================= */ 
 
  const hero = document.querySelector(".hero"); 
 
  if (hero) { 
 
    const nextSection = hero.nextElementSibling; 
 
    if (nextSection) { 
 
      const INTRO_DURATION = 2200; 
 
      let introActive = false; 
      let introFinished = false; 
      let animationFrame = null; 
 
 
      /* ---------------------------------------------------
         PREPARAZIONE DELLA TRANSIZIONE
      --------------------------------------------------- */ 
 
      hero.classList.add("scroll-enter"); 
      nextSection.classList.add("scroll-enter"); 
 
 
      /* 
         Le proprietà vengono aggiunte direttamente da JS.
         Non tocchiamo il resto del CSS del sito.
      */ 
 
      hero.style.willChange = 
        "transform, opacity, clip-path"; 
 
      nextSection.style.willChange = 
        "transform, opacity, clip-path"; 
 
 
      /* ---------------------------------------------------
         STATO INIZIALE
      --------------------------------------------------- */ 
 
      function prepareIntro() { 
 
        if (window.scrollY > 8) return; 
 
        hero.classList.remove( 
          "intro-active" 
        ); 
 
        nextSection.classList.remove( 
          "intro-active" 
        ); 
 
        hero.style.transform = 
          "translate3d(0, 0, 0)"; 
 
        hero.style.opacity = 
          "1"; 
 
        hero.style.clipPath = 
          "inset(0 0 0 0)"; 
 
        nextSection.style.transform = 
          "translate3d(0, 100vh, 0)"; 
 
        nextSection.style.opacity = 
          "1"; 
 
        nextSection.style.clipPath = 
          "inset(0 0 0 0)"; 
 
      } 
 
      prepareIntro(); 
 
 
      /* ---------------------------------------------------
         EASING PREMIUM
      --------------------------------------------------- */ 
 
      function easeInOutCubic(value) { 
 
        if (value < 0.5) { 
 
          return 4 * value * value * value; 
 
        } 
 
        return 1 - Math.pow( 
          -2 * value + 2, 
          3 
        ) / 2; 
 
      } 
 
 
      /* ---------------------------------------------------
         AVVIO DELLO SLIDE
      --------------------------------------------------- */ 
 
      function startIntro() { 
 
        if (introActive || introFinished) { 
          return; 
        } 
 
        if (window.scrollY > 12) { 
          return; 
        } 
 
        introActive = true; 
 
        hero.classList.add( 
          "intro-active" 
        ); 
 
        nextSection.classList.add( 
          "intro-active" 
        ); 
 
 
        /* 
           Blocchiamo lo scroll solamente durante
           la transizione.
        */ 
 
        const previousOverflow = 
          document.body.style.overflow; 
 
        document.body.dataset.previousOverflow = 
          previousOverflow; 
 
        document.body.style.overflow = 
          "hidden"; 
 
 
        const startTime = 
          performance.now(); 
 
 
        function animateIntro(currentTime) { 
 
          const elapsed = 
            currentTime - startTime; 
 
          let progress = 
            elapsed / INTRO_DURATION; 
 
          progress = Math.max( 
            0, 
            Math.min(1, progress) 
          ); 
 
 
          const eased = 
            easeInOutCubic(progress); 
 
 
          /* ---------------------------------------------
             HERO SCIVOLA VERSO L'ALTO
          --------------------------------------------- */ 
 
          const heroY = 
            -100 * eased; 
 
          hero.style.transform = 
            `translate3d(0, ${heroY}%, 0)`; 
 
 
          /* ---------------------------------------------
             HERO LEGGERMENTE SFUMA
          --------------------------------------------- */ 
 
          hero.style.opacity = 
            String( 
              1 - eased * 0.18 
            ); 
 
 
          /* ---------------------------------------------
             NEXT SECTION SALE DAL BASSO
          --------------------------------------------- */ 
 
          const nextY = 
            100 - (100 * eased); 
 
          nextSection.style.transform = 
            `translate3d(0, ${nextY}vh, 0)`; 
 
          nextSection.style.opacity = 
            String( 
              0.94 + eased * 0.06 
            ); 
 
 
          /* ---------------------------------------------
             CLIP PREMIUM
          --------------------------------------------- */ 
 
          const topClip = 
            Math.max( 
              0, 
              12 - eased * 12 
            ); 
 
          nextSection.style.clipPath = 
            `inset(${topClip}% 0 0 0)`; 
 
 
          if (progress < 1) { 
 
            animationFrame = 
              requestAnimationFrame( 
                animateIntro 
              ); 
 
            return; 
 
          } 
 
 
          /* ---------------------------------------------
             FINE ANIMAZIONE
          --------------------------------------------- */ 
 
          hero.style.transform = 
            "translate3d(0, -100%, 0)"; 
 
          hero.style.opacity = 
            "0"; 
 
          nextSection.style.transform = 
            "translate3d(0, 0, 0)"; 
 
          nextSection.style.opacity = 
            "1"; 
 
          nextSection.style.clipPath = 
            "inset(0 0 0 0)"; 
 
 
          /* 
             Portiamo realmente la pagina
             all'inizio della sezione successiva.
          */ 
 
          window.scrollTo({ 
            top: nextSection.offsetTop, 
            behavior: "instant" 
          }); 
 
 
          /* 
             Ripristiniamo lo scroll.
          */ 
 
          document.body.style.overflow = 
            document.body.dataset.previousOverflow || 
            ""; 
 
 
          introActive = false; 
          introFinished = true; 
 
          cancelAnimationFrame( 
            animationFrame 
          ); 
 
        } 
 
 
        animationFrame = 
          requestAnimationFrame( 
            animateIntro 
          ); 
 
      } 
 
 
      /* ---------------------------------------------------
         MOUSE WHEEL
      --------------------------------------------------- */ 
 
      function handleWheel(event) { 
 
        if (introFinished) { 
          return; 
        } 
 
        if (window.scrollY > 12) { 
          return; 
        } 
 
        if (event.deltaY > 0) { 
 
          event.preventDefault(); 
 
          startIntro(); 
 
        } 
 
      } 
 
 
      window.addEventListener( 
        "wheel", 
        handleWheel, 
        { 
          passive: false 
        } 
      ); 
 
 
      /* ---------------------------------------------------
         TOUCH
      --------------------------------------------------- */ 
 
      let touchStartY = null; 
 
      window.addEventListener( 
        "touchstart", 
        (event) => { 
 
          if (event.touches.length !== 1) { 
            return; 
          } 
 
          touchStartY = 
            event.touches[0].clientY; 
 
        }, 
        { passive: true } 
      ); 
 
 
      window.addEventListener( 
        "touchmove", 
        (event) => { 
 
          if ( 
            touchStartY === null || 
            introFinished || 
            introActive 
          ) { 
            return; 
          } 
 
          if (window.scrollY > 12) { 
            return; 
          } 
 
          const currentY = 
            event.touches[0].clientY; 
 
          const difference = 
            touchStartY - currentY; 
 
          if (difference > 12) { 
 
            event.preventDefault(); 
 
            startIntro(); 
 
            touchStartY = null; 
 
          } 
 
        }, 
        { passive: false } 
      ); 
 
 
      window.addEventListener( 
        "touchend", 
        () => { 
 
          touchStartY = null; 
 
        }, 
        { passive: true } 
      ); 
 
 
      /* ---------------------------------------------------
         TASTIERA
      --------------------------------------------------- */ 
 
      window.addEventListener( 
        "keydown", 
        (event) => { 
 
          if ( 
            introFinished || 
            introActive 
          ) { 
            return; 
          } 
 
          if ( 
            window.scrollY > 12 
          ) { 
            return; 
          } 
 
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
 
 
      /* ---------------------------------------------------
         RESIZE
      --------------------------------------------------- */ 
 
      window.addEventListener( 
        "resize", 
        () => { 
 
          if ( 
            !introActive && 
            !introFinished && 
            window.scrollY <= 12 
          ) { 
 
            prepareIntro(); 
 
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
      ).padStart(2, "0"); 
 
    const day = 
      String( 
        today.getDate() 
      ).padStart(2, "0"); 
 
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
     09. SELECT RESIDENCE 
  ======================================================= */ 
 
  function selectResidence(card) { 
 
    if (!card) return; 
 
    const residence = 
      card.dataset.residence; 
 
    if (!residence) return; 
 
 
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
 
        if (!checkin) return; 
 
        checkoutInput.min = 
          checkin; 
 
        if ( 
          checkoutInput.value && 
          checkoutInput.value <= checkin 
        ) { 
 
          checkoutInput.value = 
            ""; 
 
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
 
          checkoutInput.value = 
            ""; 
 
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
 
    if (!bookingMessage) return; 
 
    bookingMessage.textContent = 
      message; 
 
    bookingMessage.className = 
      `booking-message ${type}`; 
 
    bookingMessage.style.display = 
      "block"; 
 
    bookingMessage.scrollIntoView({ 
      behavior: "smooth", 
      block: "nearest" 
    }); 
 
  } 
 
 
  function hideBookingMessage() { 
 
    if (!bookingMessage) return; 
 
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
     14. ESCAPE 
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
    "Prime Residence Bologna — premium experience ready." 
  ); 
 
});
