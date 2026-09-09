/* =========================================================
   PRIME RESIDENCE BOLOGNA
   PREMIUM WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. PREMIUM INTRO SCROLL (NO TIMER)
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

      loader.style.transform = "translate3d(0,-100%,0)";
      loader.classList.add("hide");

      document.body.style.overflow = "";
    }

    function animate(now) {

      if (!startTime) startTime = now;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / INTRO_DURATION, 1);
      const eased = ease(progress);

      loader.style.transform =
        `translate3d(0,${-eased * 100}%,0)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        finishIntro();
      }
    }

    function startIntro() {

      if (introFinished || introAnimating) return;

      introAnimating = true;
      startTime = null;

      requestAnimationFrame(animate);
    }

    window.addEventListener("wheel", (e) => {

      if (introFinished) return;

      e.preventDefault();

      if (e.deltaY > 0) startIntro();

    }, { passive: false });

    window.addEventListener("touchstart", (e) => {

      touchStartY = e.touches[0].clientY;

    }, { passive: true });

    window.addEventListener("touchmove", (e) => {

      if (introFinished) return;

      const movement = touchStartY - e.touches[0].clientY;

      if (movement > 6) {

        e.preventDefault();
        startIntro();

      }

    }, { passive: false });

    window.addEventListener("keydown", (e) => {

      if (introFinished) return;

      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {

        e.preventDefault();
        startIntro();

      }

    });

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
     04. REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));

  }

  /* =======================================================
     05. SMOOTH ANCHORS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      e.preventDefault();

      const offset = navbar ? navbar.offsetHeight : 0;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });

    });

  });

  /* =======================================================
     06. BOOKING PAGE
  ======================================================= */

  const bookingCards = document.querySelectorAll(".booking-residence-card");
  const bookingForm = document.querySelector("#bookingRequestForm");
  const residenceInput = document.querySelector("#residence");
  const selectedResidenceText = document.querySelector("#selectedResidenceText");
  const bookingFormSection = document.querySelector("#booking-form-section");
  const checkinInput = document.querySelector("#checkin");
  const checkoutInput = document.querySelector("#checkout");
  const bookingMessage = document.querySelector("#bookingMessage");
  const bookingSubmit = document.querySelector(".booking-submit");

  function getToday() {

    const d = new Date();

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  }

  if (checkinInput) checkinInput.min = getToday();
  if (checkoutInput) checkoutInput.min = getToday();

  if (checkinInput && checkoutInput) {

    checkinInput.addEventListener("change", () => {

      checkoutInput.min = checkinInput.value;

      if (
        checkoutInput.value &&
        checkoutInput.value <= checkinInput.value
      ) {
        checkoutInput.value = "";
      }

    });

  }

  bookingCards.forEach(card => {

    card.addEventListener("click", () => {

      bookingCards.forEach(c => c.classList.remove("selected"));

      card.classList.add("selected");

      if (residenceInput)
        residenceInput.value = card.dataset.residence;

      if (selectedResidenceText)
        selectedResidenceText.textContent = card.dataset.residence;

      if (bookingFormSection) {

        bookingFormSection.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  });

  function showMessage(text, type) {

    if (!bookingMessage) return;

    bookingMessage.textContent = text;
    bookingMessage.className = `booking-message ${type}`;
    bookingMessage.style.display = "block";

  }

  function hideMessage() {

    if (!bookingMessage) return;

    bookingMessage.style.display = "none";

  }

  if (bookingForm) {

    bookingForm.addEventListener("submit", async e => {

      e.preventDefault();

      hideMessage();

      if (!residenceInput.value) {
        showMessage("Please select a residence first.", "error");
        return;
      }

      if (!checkinInput.value || !checkoutInput.value) {
        showMessage("Please select your dates.", "error");
        return;
      }

      if (checkoutInput.value <= checkinInput.value) {
        showMessage("Check-out must be after check-in.", "error");
        return;
      }

      const privacy = document.querySelector("#privacy");

      if (privacy && !privacy.checked) {
        showMessage("Please accept the privacy policy.", "error");
        return;
      }

      bookingSubmit.disabled = true;
      bookingSubmit.classList.add("loading");

      const originalText = bookingSubmit.textContent;
      bookingSubmit.textContent = "SENDING...";

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

        if (!response.ok)
          throw new Error(result.message);

        showMessage(
          result.message || "Booking request sent successfully.",
          "success"
        );

        const selected = residenceInput.value;

        bookingForm.reset();

        residenceInput.value = selected;

        if (selectedResidenceText)
          selectedResidenceText.textContent = selected;

      } catch (err) {

        showMessage(
          err.message || "Unable to send request.",
          "error"
        );

      } finally {

        bookingSubmit.disabled = false;
        bookingSubmit.classList.remove("loading");
        bookingSubmit.textContent = originalText;

      }

    });

  }

  /* =======================================================
     07. ESC CLOSE MENU
  ======================================================= */

  document.addEventListener("keydown", e => {

    if (
      e.key === "Escape" &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {

      mobileMenu.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }

      document.body.style.overflow = "";

    }

  });

  /* =======================================================
     READY
  ======================================================= */

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  console.log("Prime Residence Bologna — premium intro ready.");

});
