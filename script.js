/* =========================================================
   PRIME RESIDENCE BOLOGNA
   PREMIUM WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER
  ======================================================= */

  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 1400);
  }

  /* =======================================================
     NAVBAR
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const open = menuToggle.classList.toggle("active");

      mobileMenu.classList.toggle("active", open);

      document.body.style.overflow = open ? "hidden" : "";

    });

    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";

      });

    });

  }

  /* =======================================================
     PREMIUM FIRST SCROLL
     Hero → Fine Hero (2.2s)
  ======================================================= */

  const hero = document.querySelector(".hero");

  if (hero) {

    const DURATION = 2200;

    let running = false;
    let completed = false;

    function ease(t) {
      return t < .5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function startHeroScroll() {

      if (running || completed) return;
      if (window.scrollY > 5) return;

      running = true;

      const start = 0;

      const target = hero.offsetHeight;

      const startTime = performance.now();

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      function frame(now) {

        const progress = Math.min((now - startTime) / DURATION, 1);

        const y = start + (target - start) * ease(progress);

        window.scrollTo(0, y);

        if (progress < 1) {

          requestAnimationFrame(frame);

        } else {

          window.scrollTo(0, target);

          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";

          running = false;
          completed = true;

        }

      }

      requestAnimationFrame(frame);

    }

    window.addEventListener("wheel", e => {

      if (running) {
        e.preventDefault();
        return;
      }

      if (!completed && window.scrollY <= 5 && e.deltaY > 0) {
        e.preventDefault();
        startHeroScroll();
      }

    }, { passive: false });

    let touchStart = 0;

    window.addEventListener("touchstart", e => {

      touchStart = e.touches[0].clientY;

    }, { passive: true });

    window.addEventListener("touchmove", e => {

      if (running) {
        e.preventDefault();
        return;
      }

      if (
        !completed &&
        window.scrollY <= 5 &&
        touchStart - e.touches[0].clientY > 8
      ) {
        e.preventDefault();
        startHeroScroll();
      }

    }, { passive: false });

    window.addEventListener("keydown", e => {

      if (running || completed) return;
      if (window.scrollY > 5) return;

      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        startHeroScroll();
      }

    });

  }

  /* =======================================================
     REVEAL
  ======================================================= */

  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    }, { threshold: .12 });

    reveals.forEach(el => observer.observe(el));

  }

  /* =======================================================
     SMOOTH LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

      const id = link.getAttribute("href");
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
     BOOKING
  ======================================================= */

  const bookingCards = document.querySelectorAll(".booking-residence-card");
  const bookingForm = document.querySelector("#bookingRequestForm");
  const residenceInput = document.querySelector("#residence");
  const selectedResidenceText = document.querySelector("#selectedResidenceText");
  const bookingFormSection = document.querySelector("#booking-form-section");
  const checkin = document.querySelector("#checkin");
  const checkout = document.querySelector("#checkout");
  const bookingMessage = document.querySelector("#bookingMessage");
  const bookingSubmit = document.querySelector(".booking-submit");

  function today() {

    const d = new Date();

    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

  }

  if (checkin) checkin.min = today();
  if (checkout) checkout.min = today();

  bookingCards.forEach(card => {

    card.addEventListener("click", () => {

      bookingCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      const name = card.dataset.residence;

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

  function message(text, type) {

    if (!bookingMessage) return;

    bookingMessage.textContent = text;
    bookingMessage.className = `booking-message ${type}`;

  }

  if (bookingForm) {

    bookingForm.addEventListener("submit", async e => {

      e.preventDefault();

      if (!residenceInput.value) {
        message("Select a residence first.", "error");
        return;
      }

      if (!checkin.value || !checkout.value) {
        message("Please select check-in and check-out.", "error");
        return;
      }

      if (checkout.value <= checkin.value) {
        message("Check-out must be after check-in.", "error");
        return;
      }

      bookingSubmit.disabled = true;
      bookingSubmit.classList.add("loading");

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

        if (!response.ok) throw new Error(result.message);

        message("Booking request sent successfully.", "success");

      } catch {

        message("Unable to send your request.", "error");

      } finally {

        bookingSubmit.disabled = false;
        bookingSubmit.classList.remove("loading");

      }

    });

  }

});
