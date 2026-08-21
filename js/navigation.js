/* =========================================================
   DYLAN STUDIOS
   MOBILE NAVIGATION
========================================================= */

/* =========================================================
   GET NAVIGATION ELEMENTS
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");


/* =========================================================
   OPEN / CLOSE MOBILE MENU
========================================================= */

menuToggle.addEventListener("click", () => {

    /* Toggle the mobile navigation menu */
    navLinks.classList.toggle("active");

    /* Animate hamburger icon into X */
    menuToggle.classList.toggle("menu-open");


    /* =====================================================
       UPDATE ACCESSIBILITY ATTRIBUTE
    ===================================================== */

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


/* =========================================================
   CLOSE MENU WHEN A NAVIGATION LINK IS CLICKED
========================================================= */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        /* Close the navigation menu */
        navLinks.classList.remove("active");

        /* Change X back into hamburger */
        menuToggle.classList.remove("menu-open");

        /* Reset accessibility attributes */
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* =========================================================
   CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP SIZE
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        /* Remove mobile menu state */
        navLinks.classList.remove("active");

        /* Reset hamburger icon */
        menuToggle.classList.remove("menu-open");

        /* Reset accessibility state */
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});


/* =========================================================
   CLOSE MENU WHEN ESCAPE KEY IS PRESSED
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        /* Close the menu */
        navLinks.classList.remove("active");

        /* Reset hamburger icon */
        menuToggle.classList.remove("menu-open");

        /* Reset accessibility state */
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        /* Return keyboard focus to hamburger */
        menuToggle.focus();

    }

});