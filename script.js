```javascript
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
     04. PREMIUM HERO → STAY BEAUTIFULLY
     
     SLIDE ORIGINALE
     
     - parte esclusivamente dalla cima della Home
     - primo scroll verso il basso
     - durata 2.2 secondi
     - nessun timeout per l'animazione
     - nessun ritardo prima dell'avvio
     - Hero scorre verso l'alto
     - Stay Beautifully entra dal basso
     - al termine viene ripristinato lo scroll normale
  ======================================================= */ 
 
  const hero = document.querySelector(".hero"); 
 
  if (hero) { 
 
    const nextSection = hero.nextElementSibling; 
 
    if (nextSection) { 
 
      const heroImage = 
        hero.querySelector(".hero-image"); 
 
      const heroOverlay = 
        hero.querySelector(".hero-overlay"); 
 
      const heroContent = 
        hero.querySelector(".hero-content"); 
 
      const heroScroll = 
        hero.querySelector(".hero-scroll"); 
 
 
      /* ---------------------------------------------------
         CONFIGURAZIONE
      --------------------------------------------------- */ 
 
      const SLIDE_DURATION = 2200; 
 
      let slideActive = false; 
      let slideCompleted = false; 
      let animationFrame = null; 
 
 
      /* ---------------------------------------------------
         CLASSI
      --------------------------------------------------- */ 
 
      hero.classList.add("scroll-enter"); 
      nextSection.classList.add("scroll-enter"); 
 
 
      /* ---------------------------------------------------
         PREPARAZIONE
      --------------------------------------------------- */ 
 
      hero.style.willChange = 
        "transform, opacity"; 
 
      nextSection.style.willChange = 
        "transform, opacity"; 
 
      nextSection.style.transform = 
        "translate3d(0, 100vh, 0)"; 
 
      nextSection.style.opacity = 
        "1"; 
 
 
      /* ---------------------------------------------------
         EASING EDITORIALE
      --------------------------------------------------- */ 
 
      function premiumEase(progress) { 
 
        return progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow( 
              -2 * progress + 2, 
              3 
            ) / 2; 
 
      } 
 
 
      /* ---------------------------------------------------
         AVVIO IMMEDIATO DELLO SLIDE
      --------------------------------------------------- */ 
 
      function startPremiumSlide() { 
 
        if (slideActive || slideCompleted) { 
          return; 
        } 
 
        if (window.scrollY > 5) { 
          return; 
        } 
 
        slideActive = true; 
 
 
        /* 
           Blocchiamo il normale movimento della pagina
           soltanto mentre lo slide è in corso.
        */ 
 
        document.body.style.overflow = "hidden"; 
 
 
        const startTime = 
          performance.now(); 
 
 
        function animateSlide(currentTime) { 
 
          const elapsed = 
            currentTime - startTime; 
 
          let progress = 
            elapsed / SLIDE_DURATION; 
 
          progress = Math.max( 
            0, 
            Math.min(1, progress) 
          ); 
 
          const eased = 
            premiumEase(progress); 
 
 
          /* ---------------------------------------------
             HERO — SCORRE COMPLETAMENTE VERSO L'ALTO
          --------------------------------------------- */ 
 
          hero.style.transform = 
            `translate3d(0, ${-100 * eased}%, 0)`; 
 
 
          /* ---------------------------------------------
             IMMAGINE HERO
          --------------------------------------------- */ 
 
          if (heroImage) { 
 
            const scale = 
              1 + eased * 0.08; 
 
            const imageY = 
              eased * -20; 
 
            heroImage.style.transform = 
              `scale(${scale}) translate3d(0, ${imageY}px, 0)`; 
 
          } 
 
 
          /* ---------------------------------------------
             OVERLAY
          --------------------------------------------- */ 
 
          if (heroOverlay) { 
 
            heroOverlay.style.opacity = 
              String( 
                0.15 + eased * 0.45 
              ); 
 
          } 
 
 
          /* ---------------------------------------------
             TESTO HERO
          --------------------------------------------- */ 
 
          if (heroContent) { 
 
            heroContent.style.transform = 
              `translate3d(0, ${-55 * eased}px, 0)`; 
 
            heroContent.style.opacity = 
              String( 
                1 - eased 
              ); 
 
          } 
 
 
          /* ---------------------------------------------
             SCROLL INDICATOR
          --------------------------------------------- */ 
 
          if (heroScroll) { 
 
            heroScroll.style.transform = 
              `translate3d(0, ${40 * eased}px, 0)`; 
 
            heroScroll.style.opacity = 
              String( 
                Math.max( 
                  0, 
                  1 - eased * 2.5 
                ) 
              ); 
 
          } 
 
 
          /* ---------------------------------------------
             STAY BEAUTIFULLY
             
             Parte da sotto lo schermo e sale
             contemporaneamente al movimento dell'Hero.
          --------------------------------------------- */ 
 
          const nextY = 
            100 * (1 - eased); 
 
          nextSection.style.transform = 
            `translate3d(0, ${nextY}vh, 0)`; 
 
 
          /* ---------------------------------------------
             CONTINUA
          --------------------------------------------- */ 
 
          if (progress < 1) { 
 
            animationFrame = 
              requestAnimationFrame( 
                animateSlide 
              ); 
 
            return; 
 
          } 
 
 
          /* ---------------------------------------------
             POSIZIONE FINALE
          --------------------------------------------- */ 
 
          hero.style.transform = 
            "translate3d(0, -100%, 0)"; 
 
          hero.style.opacity = 
            "0"; 
 
          nextSection.style.transform = 
            "translate3d(0, 0, 0)"; 
 
          nextSection.style.opacity = 
            "1"; 
 
 
          /* 
             Portiamo la finestra esattamente
             all'inizio della sezione successiva.
          */ 
 
          window.scrollTo( 
            0, 
            nextSection.offsetTop 
          ); 
 
 
          /* 
             Fine dello slide.
          */ 
 
          slideActive = false; 
          slideCompleted = true; 
 
          document.body.style.overflow = ""; 
 
          animationFrame = null; 
 
        } 
 
 
        animationFrame = 
          requestAnimationFrame( 
            animateSlide 
          ); 
 
      } 
 
 
      /* ===================================================
         MOUSE / TRACKPAD
      =================================================== */ 
 
      window.addEventListener( 
        "wheel", 
        (event) => { 
 
          /* 
             Se lo slide è già stato fatto,
             lasciamo il browser completamente libero.
          */ 
 
          if (slideCompleted) { 
            return; 
          } 
 
 
          /* 
             Durante lo slide impediamo che il browser
             faccia uno scroll aggiuntivo.
          */ 
 
          if (slideActive) { 
 
            event.preventDefault(); 
            return; 
 
          } 
 
 
          /* 
             Lo slide parte SOLO dalla cima.
          */ 
 
          if ( 
            window.scrollY <= 5 && 
            event.deltaY > 0 
          ) { 
 
            event.preventDefault(); 
 
            startPremiumSlide(); 
 
          } 
 
        }, 
        { 
          passive: false 
        } 
      ); 
 
 
      /* ===================================================
         TOUCH
      =================================================== */ 
 
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
            slideCompleted 
          ) { 
            return; 
          } 
 
          if (slideActive) { 
 
            event.preventDefault(); 
            return; 
 
          } 
 
          if (window.scrollY > 5) { 
            return; 
          } 
 
          const currentY = 
            event.touches[0].clientY; 
 
          const difference = 
            touchStartY - currentY; 
 
          if (difference > 8) { 
 
            event.preventDefault(); 
 
            touchStartY = null; 
 
            startPremiumSlide(); 
 
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
 
 
      /* ===================================================
         TASTIERA
      =================================================== */ 
 
      window.addEventListener( 
        "keydown", 
        (event) => { 
 
          if ( 
            slideCompleted || 
            slideActive 
          ) { 
            return; 
          } 
 
          if (window.scrollY > 5) { 
            return; 
          } 
 
          if ( 
            event.key === "ArrowDown" || 
            event.key === "PageDown" || 
            event.key === " " 
          ) { 
 
            event.preventDefault(); 
 
            startPremiumSlide(); 
 
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
```

