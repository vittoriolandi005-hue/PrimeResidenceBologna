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
    setTimeout(() => loader.classList.add("hide"), 1400);
  }

  /* =======================================================
     02. NAVBAR
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  /* =======================================================
     03. MOBILE MENU
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
     04. FIRST CINEMATIC SCROLL (2200ms)

     Primo scroll dalla cima → "Stay beautifully"
  ======================================================= */

  const hero = document.querySelector(".hero");

  if (hero) {

    const stayTitle = hero.querySelector("h1");

    let introDone = false;
    let introRunning = false;

    const DURATION = 2200;

    function ease(t) {

      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    }

    function runIntroScroll() {

      if (introDone || introRunning) return;
      if (window.scrollY > 5) return;

      introRunning = true;

      const start = window.scrollY;

      const target = stayTitle
        ? stayTitle.getBoundingClientRect().top + window.scrollY - 80
        : hero.offsetHeight * 0.35;

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

          introRunning = false;
          introDone = true;

        }

      }

      requestAnimationFrame(frame);

    }

    window.addEventListener("wheel", (e) => {

      if (introDone) return;

      if (window.scrollY <= 5 && e.deltaY > 0) {

        e.preventDefault();
        runIntroScroll();

      }

    }, { passive: false });

    let touchStartY = 0;

    window.addEventListener("touchstart", e => {

      touchStartY = e.touches[0].clientY;

    }, { passive: true });

    window.addEventListener("touchmove", e => {

      if (introDone) return;

      const diff = touchStartY - e.touches[0].clientY;

      if (window.scrollY <= 5 && diff > 8) {

        e.preventDefault();
        runIntroScroll();

      }

    }, { passive: false });

    window.addEventListener("keydown", e => {

      if (introDone) return;

      if (
        window.scrollY <= 5 &&
        (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ")
      ) {

        e.preventDefault();
        runIntroScroll();

      }

    });

  }

  /* =======================================================
     05. REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

  }

  /* =======================================================
     06. SMOOTH ANCHORS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

      const id = link.getAttribute("href");
      const target = document.querySelector(id);

      if (!target || id === "#") return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - (navbar ? navbar.offsetHeight : 0),
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
  const submitButton = document.querySelector(".booking-submit");

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

      residenceInput.value = card.dataset.residence;

      if (selectedResidenceText)
        selectedResidenceText.textContent = card.dataset.residence;

      bookingFormSection?.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

  if (checkin && checkout) {

    checkin.addEventListener("change", () => {

      checkout.min = checkin.value;

      if (checkout.value && checkout.value <= checkin.value)
        checkout.value = "";

    });

  }

  function showMessage(text, type) {

    if (!bookingMessage) return;

    bookingMessage.textContent = text;
    bookingMessage.className = `booking-message ${type}`;

  }

  if (bookingForm) {

    bookingForm.addEventListener("submit", async e => {

      e.preventDefault();

      if (!residenceInput.value)
        return showMessage("Please select a residence first.","error");

      if (!checkin.value || !checkout.value)
        return showMessage("Please select check-in and check-out.","error");

      if (checkout.value <= checkin.value)
        return showMessage("Check-out must be after check-in.","error");

      submitButton.disabled = true;
      submitButton.classList.add("loading");

      try {

        const data = Object.fromEntries(new FormData(bookingForm));

        const res = await fetch("/api/booking-request",{

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(data)

        });

        const json = await res.json();

        if(!res.ok)
          throw new Error(json.message);

        bookingForm.reset();

        residenceInput.value = "";

        bookingCards.forEach(c=>c.classList.remove("selected"));

        if(selectedResidenceText)
          selectedResidenceText.textContent="Please select a residence above";

        showMessage("Booking request sent successfully.","success");

      } catch(err){

        showMessage("Unable to send your request.","error");

      } finally{

        submitButton.disabled=false;
        submitButton.classList.remove("loading");

      }

    });

  }

  /* =======================================================
     08. ESC
  ======================================================= */

  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      menuToggle?.classList.remove("active");
      mobileMenu?.classList.remove("active");
      document.body.style.overflow = "";

    }

  });

  console.log("Prime Residence Bologna ready.");

});
