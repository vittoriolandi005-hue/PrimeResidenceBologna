```javascript
/* =========================================
   PRIME RESIDENCE BOLOGNA
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   INTRO
========================================= */

const loader = document.querySelector(".loader");
const scrollEnter = document.querySelector(".scroll-enter");

let introProgress = 0;

const INTRO_SCROLL_DISTANCE = 900;

let introFinished = false;


/* =========================================
   UPDATE INTRO
========================================= */

function updateIntro() {

  if (!loader) return;

  const progress = Math.min(
    Math.max(introProgress, 0),
    1
  );


  /* Move the black intro upward */

  loader.style.transform =
    `translate3d(0, ${-progress * 100}%, 0)`;


  /* SCROLL TO ENTER */

  if (scrollEnter) {

    scrollEnter.style.opacity =
      Math.max(0, 1 - progress * 3);


    scrollEnter.style.transform =
      `translateX(-50%) translateY(${progress * 20}px)`;

  }


  /* Finish intro */

  if (progress >= 1 && !introFinished) {

    finishIntro();

  }

}


/* =========================================
   FINISH INTRO
========================================= */

function finishIntro() {

  if (introFinished) return;

  introFinished = true;

  introProgress = 1;

  loader.style.transform =
    "translate3d(0, -100%, 0)";


  document.body.classList.remove("intro-active");

}


/* =========================================
   MOUSE WHEEL
========================================= */

function handleWheel(event) {

  if (introFinished) return;


  event.preventDefault();


  introProgress +=
    event.deltaY / INTRO_SCROLL_DISTANCE;


  introProgress = Math.min(
    Math.max(introProgress, 0),
    1
  );


  updateIntro();

}


window.addEventListener(
  "wheel",
  handleWheel,
  {
    passive: false
  }
);


/* =========================================
   TOUCH / MOBILE
========================================= */

let touchStartY = 0;


window.addEventListener(
  "touchstart",
  function(event) {

    if (introFinished) return;

    touchStartY =
      event.touches[0].clientY;

  },
  {
    passive: true
  }
);


window.addEventListener(
  "touchmove",
  function(event) {

    if (introFinished) return;


    event.preventDefault();


    const currentY =
      event.touches[0].clientY;


    const difference =
      touchStartY - currentY;


    introProgress +=
      difference / INTRO_SCROLL_DISTANCE;


    introProgress = Math.min(
      Math.max(introProgress, 0),
      1
    );


    touchStartY = currentY;


    updateIntro();

  },
  {
    passive: false
  }
);


/* =========================================
   KEYBOARD
========================================= */

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

      introProgress += 0.15;

      introProgress = Math.min(
        introProgress,
        1
      );

      updateIntro();

    }


    if (
      event.key === "ArrowUp" ||
      event.key === "PageUp"
    ) {

      event.preventDefault();

      introProgress -= 0.15;

      introProgress = Math.max(
        introProgress,
        0
      );

      updateIntro();

    }

  }
);


/* =========================================
   NAVBAR
========================================= */

const navbar =
  document.querySelector(".navbar");


window.addEventListener(
  "scroll",
  function() {

    if (!navbar) return;

    if (window.scrollY > 60) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }
);


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    function(entries) {

      entries.forEach(
        function(entry) {

          if (entry.isIntersecting) {

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
  function(element) {

    revealObserver.observe(element);

  }
);


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
  document.querySelector(".menu-button");

const mobileMenu =
  document.querySelector(".mobile-menu");


if (menuButton && mobileMenu) {

  menuButton.addEventListener(
    "click",
    function() {

      mobileMenu.classList.toggle(
        "open"
      );

    }
  );


  const mobileLinks =
    mobileMenu.querySelectorAll("a");


  mobileLinks.forEach(
    function(link) {

      link.addEventListener(
        "click",
        function() {

          mobileMenu.classList.remove(
            "open"
          );

        }
      );

    }
  );

}


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(
  function(link) {

    link.addEventListener(
      "click",
      function(event) {

        const targetId =
          link.getAttribute("href");


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


/* =========================================
   YEAR
========================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================
   INITIAL STATE
========================================= */

updateIntro();
```
