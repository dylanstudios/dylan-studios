/* =========================================================
   DYLAN STUDIOS
   INDEX.JS

   WEBSITE JAVASCRIPT FEATURES

   01. Hero Service Card Parallax
   02. Hero Scroll Indicator
   03. Marquee Visibility Control
   04. What We Do Carousel
   05. Main + Featured Scroll System

========================================================= */


/* =========================================================
   INITIALIZE WEBSITE

   Runs all website JavaScript after the DOM is ready.
========================================================= */

function initializeWebsite() {


    /* =====================================================
       01. HERO SERVICE CARD PARALLAX

       Moves service cards slightly based on the mouse
       position inside the Hero section.
    ===================================================== */

    const hero = document.querySelector(".hero");

    const serviceCards =
        document.querySelectorAll(".service-card");


    if (hero && serviceCards.length) {


        /* =================================================
           MOUSE MOVEMENT
        ================================================= */

        hero.addEventListener("mousemove", function (e) {

            const heroRect =
                hero.getBoundingClientRect();


            /* Mouse position inside Hero */

            const mouseX =
                e.clientX - heroRect.left;

            const mouseY =
                e.clientY - heroRect.top;


            /* Update every service card */

            serviceCards.forEach(function (card) {

                const cardRect =
                    card.getBoundingClientRect();


                /* Find center of card */

                const cardCenterX =
                    cardRect.left +
                    cardRect.width / 2 -
                    heroRect.left;

                const cardCenterY =
                    cardRect.top +
                    cardRect.height / 2 -
                    heroRect.top;


                /* Distance from mouse to card */

                const distanceX =
                    mouseX - cardCenterX;

                const distanceY =
                    mouseY - cardCenterY;

                const distance =
                    Math.sqrt(
                        distanceX * distanceX +
                        distanceY * distanceY
                    );


                /* Cards closer to the mouse move more */

                const influence =
                    Math.max(
                        0,
                        1 - distance / 350
                    );


                /* Calculate movement */

                const moveX =
                    (
                        (
                            mouseX -
                            heroRect.width / 2
                        ) /
                        heroRect.width
                    ) *
                    18 *
                    influence;

                const moveY =
                    (
                        (
                            mouseY -
                            heroRect.height / 2
                        ) /
                        heroRect.height
                    ) *
                    18 *
                    influence;


                /* Send movement values to CSS */

                card.style.setProperty(
                    "--mouse-x",
                    `${moveX}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${moveY}px`
                );

            });

        });


        /* =================================================
           RESET CARD POSITIONS

           Return cards to their original position when
           the mouse leaves the Hero section.
        ================================================= */

        hero.addEventListener("mouseleave", function () {

            serviceCards.forEach(function (card) {

                card.style.setProperty(
                    "--mouse-x",
                    "0px"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "0px"
                );

            });

        });

    }



    /* =====================================================
       02. HERO SCROLL INDICATOR

       Hides the Hero scroll indicator after the user
       scrolls down.
    ===================================================== */

    const heroScrollIndicator =
        document.querySelector(
            ".header-scroll-indicator"
        );



    /* =====================================================
       03. MARQUEE VISIBILITY CONTROL

       Pauses marquee animations when the browser tab is
       hidden and resumes them when the user returns.
    ===================================================== */

    const marqueeTracks =
        document.querySelectorAll(".marquee-track");


    document.addEventListener(
        "visibilitychange",
        function () {

            marqueeTracks.forEach(function (track) {

                track.style.animationPlayState =
                    document.hidden
                        ? "paused"
                        : "running";

            });

        }
    );



    /* =====================================================
       04. WHAT WE DO CAROUSEL
    ===================================================== */

    const carousel =
        document.querySelector(
            ".what-we-do-carousel"
        );

    const track =
        document.querySelector(
            ".what-we-do-track"
        );

    const prevButton =
        document.querySelector(
            ".carousel-prev"
        );

    const nextButton =
        document.querySelector(
            ".carousel-next"
        );

    const dotsContainer =
        document.querySelector(
            ".carousel-dots"
        );

    const originalCards =
        Array.from(
            document.querySelectorAll(
                ".what-we-do-card"
            )
        );


    /* =====================================================
       CAROUSEL SAFETY CHECK
    ===================================================== */

    if (
        carousel &&
        track &&
        prevButton &&
        nextButton &&
        dotsContainer &&
        originalCards.length
    ) {


        /* =================================================
           CAROUSEL SETTINGS
        ================================================= */

        let currentIndex = 0;

        let autoSlide;

        let isMoving = false;

        const slideSpeed = 600;

        const autoSlideTime = 3000;



        /* =================================================
           CLONE CARDS

           Original:
           1 2 3 4

           After cloning:
           1 2 3 4 1 2 3 4

           This allows the carousel to loop infinitely.
        ================================================= */

        originalCards.forEach(function (card) {

            const clone =
                card.cloneNode(true);

            clone.classList.add(
                "carousel-clone"
            );

            track.appendChild(clone);

        });



        /* =================================================
           GET ALL CARDS
        ================================================= */

        function getCards() {

            return Array.from(
                track.querySelectorAll(
                    ".what-we-do-card"
                )
            );

        }



        /* =================================================
           GET GAP BETWEEN CARDS
        ================================================= */

        function getGap() {

            const styles =
                window.getComputedStyle(track);

            return (
                parseFloat(styles.columnGap) ||
                parseFloat(styles.gap) ||
                0
            );

        }



        /* =================================================
           GET CARD WIDTH
        ================================================= */

        function getCardWidth() {

            const cards = getCards();

            if (!cards.length) {
                return 0;
            }

            return cards[0]
                .getBoundingClientRect()
                .width;

        }



        /* =================================================
           GET TOTAL SLIDE WIDTH

           Card width + gap.
        ================================================= */

        function getSlideWidth() {

            return (
                getCardWidth() +
                getGap()
            );

        }



        /* =================================================
           CREATE NAVIGATION DOTS
        ================================================= */

        function createDots() {

            dotsContainer.innerHTML = "";


            originalCards.forEach(
                function (card, index) {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type = "button";

                    dot.classList.add(
                        "carousel-dot"
                    );


                    /* Accessibility */

                    dot.setAttribute(
                        "aria-label",
                        `Go to slide ${index + 1}`
                    );


                    /* First dot active */

                    if (index === 0) {

                        dot.classList.add(
                            "active"
                        );

                    }


                    /* Dot navigation */

                    dot.addEventListener(
                        "click",
                        function () {

                            if (isMoving) {
                                return;
                            }

                            currentIndex = index;

                            moveCarousel(true);

                            restartAutoSlide();

                        }
                    );


                    dotsContainer.appendChild(dot);

                }
            );

        }



        /* =================================================
           UPDATE ACTIVE DOT
        ================================================= */

        function updateDots() {

            const dots =
                dotsContainer.querySelectorAll(
                    ".carousel-dot"
                );


            const activeIndex =
                currentIndex %
                originalCards.length;


            dots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === activeIndex
                    );

                }
            );

        }



        /* =================================================
           MOVE CAROUSEL
        ================================================= */

        function moveCarousel(
            animate = true
        ) {

            const slideWidth =
                getSlideWidth();


            if (!slideWidth) {
                return;
            }


            const moveAmount =
                currentIndex *
                slideWidth;


            track.style.transition =
                animate
                    ? `transform ${slideSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none";


            track.style.transform =
                `translate3d(-${moveAmount}px, 0, 0)`;


            updateDots();

        }



        /* =================================================
           NEXT SLIDE
        ================================================= */

        function nextSlide() {

            if (isMoving) {
                return;
            }


            isMoving = true;

            currentIndex++;

            moveCarousel(true);


            /* Reset after reaching cloned cards */

            setTimeout(function () {

                if (
                    currentIndex >=
                    originalCards.length
                ) {

                    currentIndex = 0;

                    moveCarousel(false);

                }

                isMoving = false;

            }, slideSpeed);

        }



        /* =================================================
           PREVIOUS SLIDE
        ================================================= */

        function previousSlide() {

            if (isMoving) {
                return;
            }


            isMoving = true;


            /* If at first card, jump to clone section */

            if (currentIndex === 0) {

                currentIndex =
                    originalCards.length;

                moveCarousel(false);


                requestAnimationFrame(function () {

                    requestAnimationFrame(function () {

                        currentIndex--;

                        moveCarousel(true);


                        setTimeout(function () {

                            isMoving = false;

                        }, slideSpeed);

                    });

                });

            } else {

                currentIndex--;

                moveCarousel(true);


                setTimeout(function () {

                    isMoving = false;

                }, slideSpeed);

            }

        }



        /* =================================================
           CAROUSEL BUTTONS
        ================================================= */

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                restartAutoSlide();

            }
        );


        prevButton.addEventListener(
            "click",
            function () {

                previousSlide();

                restartAutoSlide();

            }
        );



        /* =================================================
           AUTOMATIC SLIDING
        ================================================= */

        function startAutoSlide() {

            clearInterval(autoSlide);

            autoSlide =
                setInterval(
                    nextSlide,
                    autoSlideTime
                );

        }



        /* =================================================
           RESTART AUTOMATIC SLIDING
        ================================================= */

        function restartAutoSlide() {

            startAutoSlide();

        }



        /* =================================================
           PAUSE ON HOVER
        ================================================= */

        carousel.addEventListener(
            "mouseenter",
            function () {

                clearInterval(autoSlide);

            }
        );


        carousel.addEventListener(
            "mouseleave",
            function () {

                startAutoSlide();

            }
        );



        /* =================================================
           PAUSE WHEN TAB IS HIDDEN
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    clearInterval(autoSlide);

                } else {

                    startAutoSlide();

                }

            }
        );



        /* =================================================
           WINDOW RESIZE

           Recalculate the carousel because card widths may
           change when the screen size changes.
        ================================================= */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(resizeTimer);

                resizeTimer =
                    setTimeout(function () {

                        currentIndex = 0;

                        moveCarousel(false);

                        restartAutoSlide();

                    }, 150);

            }
        );



        /* =================================================
           INITIALIZE CAROUSEL
        ================================================= */

        createDots();

        moveCarousel(false);

        startAutoSlide();

    }



    /* =====================================================
       05. MAIN + FEATURED SCROLL SYSTEM
    ===================================================== */

    const mainSection =
        document.querySelector("main");

    const featured =
        document.querySelector(".featured");


    /* =====================================================
       UPDATE SCROLL ANIMATIONS
    ===================================================== */

    function updateScrollAnimations() {


        const scrollY =
            window.scrollY;

        const screenHeight =
            window.innerHeight;



        /* =================================================
           HERO SCROLL INDICATOR
        ================================================= */

        if (heroScrollIndicator) {

            heroScrollIndicator.classList.toggle(
                "hidden",
                scrollY > 30
            );

        }



        /* =================================================
           MAIN SECTION MOVEMENT

           From:
           0vh → 100vh

           Main moves:
           0px → -100vh
        ================================================= */

        if (mainSection) {

            let mainProgress =
                scrollY / screenHeight;


            /* Keep progress between 0 and 1 */

            mainProgress =
                Math.max(
                    0,
                    Math.min(
                        mainProgress,
                        1
                    )
                );


            const mainY =
                -mainProgress *
                screenHeight;


            mainSection.style.transform =
                `translate3d(0, ${mainY}px, 0)`;

        }



        /* =================================================
           FEATURED SECTION MOVEMENT

           Starts at:
           130vh

           Ends at:
           230vh

           Featured moves:
           -100% → 0%
        ================================================= */

        if (featured) {

            const featuredStart =
                screenHeight * 1.3;

            const featuredEnd =
                screenHeight * 2.3;


            let featuredProgress =
                (
                    scrollY -
                    featuredStart
                ) /
                (
                    featuredEnd -
                    featuredStart
                );


            /* Keep progress between 0 and 1 */

            featuredProgress =
                Math.max(
                    0,
                    Math.min(
                        featuredProgress,
                        1
                    )
                );


            const featuredX =
                -100 +
                featuredProgress * 100;


            featured.style.transform =
                `translate3d(${featuredX}%, 0, 0)`;

        }

    }



    /* =====================================================
       OPTIMIZED SCROLL EVENT

       requestAnimationFrame prevents excessive animation
       calculations during scrolling.
    ===================================================== */

    let scrollTicking = false;


    window.addEventListener(
        "scroll",
        function () {

            if (scrollTicking) {
                return;
            }


            scrollTicking = true;


            window.requestAnimationFrame(
                function () {

                    updateScrollAnimations();

                    scrollTicking = false;

                }
            );

        },
        {
            passive: true
        }
    );



    /* =====================================================
       RESIZE EVENT
    ===================================================== */

    window.addEventListener(
        "resize",
        updateScrollAnimations
    );



    /* =====================================================
       INITIALIZE SCROLL SYSTEM
    ===================================================== */

    updateScrollAnimations();

}



/* =========================================================
   START WEBSITE

   If the DOM is still loading, wait until it is ready.

   Otherwise, start the website immediately.
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

}