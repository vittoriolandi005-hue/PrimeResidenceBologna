document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader");
  const scrollEnter = document.querySelector(".scroll-enter");

  if (!loader) return;

  let progress = 0;
  let introFinished = false;

  // Più alto = intro più lento
  const SCROLL_DISTANCE = 1800;

  function updateIntro() {

    progress = Math.max(0, Math.min(1, progress));

    // Sposta gradualmente la schermata verso l'alto
    loader.style.transform =
      `translate3d(0, ${-progress * 100}%, 0)`;

    // Fa scomparire gradualmente la scritta
    if (scrollEnter) {
      scrollEnter.style.opacity =
        Math.max(0, 1 - progress * 3);

      scrollEnter.style.transform =
        `translateX(-50%) translateY(${progress * 30}px)`;
    }

    // Fine intro
    if (progress >= 1) {
      finishIntro();
    }
  }

  function finishIntro() {

    if (introFinished) return;

    introFinished = true;
    progress = 1;

    loader.style.transform =
      "translate3d(0, -100%, 0)";

    document.body.classList.remove("intro-active");

    // Permette nuovamente lo scroll normale
    document.body.style.overflow = "";
  }

  // =========================
  // MOUSE WHEEL
  // =========================

  window.addEventListener(
    "wheel",
    function(event) {

      if (introFinished) return;

      event.preventDefault();

      // Scroll verso il basso
      if (event.deltaY > 0) {
        progress += event.deltaY / SCROLL_DISTANCE;
      }

      // Scroll verso l'alto
      if (event.deltaY < 0) {
        progress += event.deltaY / SCROLL_DISTANCE;
      }

      updateIntro();

    },
    {
      passive: false
    }
  );


  // =========================
  // TOUCH
  // =========================

  let touchStart = 0;

  window.addEventListener(
    "touchstart",
    function(event) {

      if (introFinished) return;

      touchStart = event.touches[0].clientY;

    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    function(event) {

      if (introFinished) return;

      const currentTouch = event.touches[0].clientY;
      const movement = touchStart - currentTouch;

      if (Math.abs(movement) > 1) {

        event.preventDefault();

        progress += movement / 1200;

        touchStart = currentTouch;

        updateIntro();
      }

    },
    { passive: false }
  );


  // =========================
  // TASTIERA
  // =========================

  window.addEventListener(
    "keydown",
    function(event) {

      if (introFinished) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {

        event.preventDefault();

        progress += 0.12;

        updateIntro();
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {

        event.preventDefault();

        progress -= 0.12;

        updateIntro();
      }

    }
  );


  // =========================
  // NAVBAR
  // =========================

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });


  // =========================
  // REVEAL ANIMATIONS
  // =========================

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // =========================
  // MOBILE MENU
  // =========================

  const menuButton =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

    });

  }


  // =========================
  // SMOOTH ANCHOR LINKS
  // =========================

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

      const targetId =
        this.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });


  // =========================
  // YEAR
  // =========================

  const year =
    document.querySelector("#year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});
