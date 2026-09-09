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
  window.addEventListener("scroll", updateNavbar, { passive: true });

  /* =======================================================
     03. MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const open = menuToggle.classList.toggle("active");

      mobileMenu.classList.toggle("active", open);

      menuToggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      document.body.style.overflow = open ? "hidden" : "";

    });

    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

      });

    });

  }

  /* =======================================================
     04. PREMIUM FIRST SCROLL (2200ms)
  ======================================================= */

  const hero = document.querySelector(".hero");

  if (hero && hero.nextElementSibling) {

    const intro = hero.nextElementSibling;

    const DURATION = 2200;

    let introFinished = false;
    let introAnimating = false;

    function ease(t) {

      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    }

    function startIntro() {

      if (introFinished || introAnimating) return;
      if (window.scrollY > 5) return;

      introAnimating = true;

      const startY = window.scrollY;
      const targetY = intro.offsetTop;
      const startTime = performance.now();

      function animate(now) {

        const elapsed = now - startTime;

        const progress = Math.min(elapsed / DURATION, 1);

        const y = startY + (targetY - startY) * ease(progress);

        window.scrollTo(0, y);

        if (progress < 1) {

          requestAnimationFrame(animate);

        } else {

          window.scrollTo(0, targetY);

          introAnimating = false;
          introFinished = true;

        }

      }

      requestAnimationFrame(animate);

    }

    /* ---------- Mouse ---------- */

    window.addEventListener("wheel", (event) => {

      if (introAnimating) {
        event.preventDefault();
        return;
      }

      if (
        !introFinished &&
        window.scrollY <= 5 &&
        event.deltaY > 0
      ) {

        event.preventDefault();
        startIntro();

      }

    }, { passive: false });

    /* ---------- Touch ---------- */

    let touchStartY = 0;

    window.addEventListener("touchstart", (event) => {

      touchStartY = event.touches[0].clientY;

    }, { passive: true });

    window.addEventListener("touchmove", (event) => {

      if (introAnimating) {
        event.preventDefault();
        return;
      }

      if (introFinished) return;
      if (window.scrollY > 5) return;

      const move = touchStartY - event.touches[0].clientY;

      if (move > 8) {

        event.preventDefault();
        startIntro();

      }

    }, { passive: false });

    /* ---------- Keyboard ---------- */

    window.addEventListener("keydown", (event) => {

      if (introAnimating || introFinished) return;
      if (window.scrollY > 5) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {

        event.preventDefault();
        startIntro();

      }

    });

  }

  /* =======================================================
     05. REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          obs.unobserve(entry.target);

        }

      });

    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

  }

  /* =======================================================
     06. ANCHOR LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const offset = navbar ? navbar.offsetHeight : 0;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });

    });

  });

  /* =======================================================
     07. BOOKING
  ======================================================= */

  const bookingCards = document.querySelectorAll(".booking-residence-card");
  const bookingForm = document.querySelector("#bookingRequestForm");
  const residenceInput = document.querySelector("#residence");
  const selectedResidenceText = document.querySelector("#selectedResidenceText");
  const bookingFormSection = document.querySelector("#booking-form-section");
  const checkin = document.querySelector("#checkin");
  const checkout = document.querySelector("#checkout");
  const bookingMessage = document.querySelector("#bookingMessage");
  const submit = document.querySelector(".booking-submit");

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  if (checkin) checkin.min = today();
  if (checkout) checkout.min = today();

  bookingCards.forEach(card => {

    card.addEventListener("click", () => {

      bookingCards.forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");

      const name = card.dataset.residence || "";

      if (residenceInput) residenceInput.value = name;
      if (selectedResidenceText) selectedResidenceText.textContent = name;

      bookingFormSection?.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

  if (checkin && checkout) {

    checkin.addEventListener("change", () => {

      checkout.min = checkin.value;

      if (checkout.value <= checkin.value) {
        checkout.value = "";
      }

    });

  }

  function showMessage(text, type) {

    if (!bookingMessage) return;

    bookingMessage.textContent = text;
    bookingMessage.className = `booking-message ${type}`;
    bookingMessage.style.display = "block";

  }

  if (bookingForm) {

    bookingForm.addEventListener("submit", async event => {

      event.preventDefault();

      if (!residenceInput?.value) {
        showMessage("Seleziona una residence.", "error");
        return;
      }

      if (!checkin?.value || !checkout?.value) {
        showMessage("Inserisci check-in e check-out.", "error");
        return;
      }

      if (checkout.value <= checkin.value) {
        showMessage("Il check-out deve essere successivo al check-in.", "error");
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.classList.add("loading");
      }

      const data = Object.fromEntries(new FormData(bookingForm).entries());

      try {

        const response = await fetch("/api/booking-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Errore");

        bookingForm.reset();

        if (residenceInput) residenceInput.value = data.residence;
        if (selectedResidenceText) selectedResidenceText.textContent = data.residence;

        showMessage("Richiesta inviata con successo.", "success");

      } catch {

        showMessage("Invio non riuscito.", "error");

      } finally {

        if (submit) {
          submit.disabled = false;
          submit.classList.remove("loading");
        }

      }

    });

  }

  /* =======================================================
     08. ESCAPE
  ======================================================= */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      mobileMenu?.classList.contains("active")
    ) {

      mobileMenu.classList.remove("active");
      menuToggle?.classList.remove("active");
      document.body.style.overflow = "";

    }

  });

  /* =======================================================
     09. RESIZE
  ======================================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 700 &&
      mobileMenu?.classList.contains("active")
    ) {

      mobileMenu.classList.remove("active");
      menuToggle?.classList.remove("active");
      document.body.style.overflow = "";

    }

  });

  /* =======================================================
     10. FOOTER YEAR
  ======================================================= */

  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  console.log("Prime Residence Bologna — premium ready.");

});
