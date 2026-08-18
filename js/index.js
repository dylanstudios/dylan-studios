/* =========================================================
   DYLAN STUDIO
   INDEX.JS
   ========================================================= */


/* =========================================================
   01. HERO SERVICE CARD PARALLAX
   ========================================================= */

const hero = document.querySelector(".hero");
const serviceCards = document.querySelectorAll(".service-card");

if (hero && serviceCards.length) {

    hero.addEventListener("mousemove", function (e) {

        const heroRect = hero.getBoundingClientRect();

        const mouseX = e.clientX - heroRect.left;
        const mouseY = e.clientY - heroRect.top;

        serviceCards.forEach(card => {

            const cardRect = card.getBoundingClientRect();

            const cardCenterX =
                cardRect.left +
                cardRect.width / 2 -
                heroRect.left;

            const cardCenterY =
                cardRect.top +
                cardRect.height / 2 -
                heroRect.top;

            const distanceX =
                mouseX - cardCenterX;

            const distanceY =
                mouseY - cardCenterY;

            const distance =
                Math.sqrt(
                    distanceX * distanceX +
                    distanceY * distanceY
                );

            const influence =
                Math.max(
                    0,
                    1 - distance / 350
                );

            const moveX =
                ((mouseX - heroRect.width / 2) /
                    heroRect.width) *
                18 *
                influence;

            const moveY =
                ((mouseY - heroRect.height / 2) /
                    heroRect.height) *
                18 *
                influence;

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


    hero.addEventListener("mouseleave", function () {

        serviceCards.forEach(card => {

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


/* =========================================================
   02. WHAT WE DO CAROUSEL
   ========================================================= */

const carousel =
    document.querySelector(".services-carousel");

const track =
    carousel?.querySelector(".services-track");

const prevButton =
    document.querySelector(".carousel-prev");

const nextButton =
    document.querySelector(".carousel-next");

const dotsContainer =
    document.getElementById("carouselDots");


if (carousel && track) {

    const originalCards =
        Array.from(
            track.querySelectorAll(".what-we-do-card")
        );

    const originalCount =
        originalCards.length;


    const cardWidth = 450;
    const gap = 18;

    const slideDistance =
        cardWidth + gap;

    const slideDuration = 700;
    const autoplayDelay = 3000;


    let currentIndex =
        originalCount;

    let autoplay = null;


    /* ---------------------------------------------------------
       CLONE CARDS
       --------------------------------------------------------- */

    originalCards.forEach(card => {

        const clone =
            card.cloneNode(true);

        clone.classList.add(
            "carousel-clone"
        );

        track.insertBefore(
            clone,
            track.firstChild
        );

    });


    originalCards.forEach(card => {

        const clone =
            card.cloneNode(true);

        clone.classList.add(
            "carousel-clone"
        );

        track.appendChild(clone);

    });


    const allCards =
        Array.from(
            track.querySelectorAll(
                ".what-we-do-card"
            )
        );


    /* ---------------------------------------------------------
       CREATE DOTS
       --------------------------------------------------------- */

    originalCards.forEach(
        (card, index) => {

            const dot =
                document.createElement("button");

            dot.classList.add(
                "carousel-dot"
            );

            dot.setAttribute(
                "aria-label",
                `Show card ${index + 1} in center`
            );

            dot.addEventListener(
                "click",
                () => {

                    goToSlide(index);

                }
            );

            dotsContainer.appendChild(dot);

        }
    );


    const dots =
        Array.from(
            dotsContainer.querySelectorAll(
                ".carousel-dot"
            )
        );


    /* ---------------------------------------------------------
       UPDATE DOTS
       --------------------------------------------------------- */

    function updateDots() {

        let centerIndex =
            currentIndex + 1;

        let activeIndex =
            (centerIndex - originalCount)
            % originalCount;

        if (activeIndex < 0) {

            activeIndex += originalCount;

        }

        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === activeIndex
                );

            }
        );

    }


    /* ---------------------------------------------------------
       UPDATE CARD POSITION CLASSES
       --------------------------------------------------------- */

    function updatePositionClasses() {

        allCards.forEach(card => {

            card.classList.remove(
                "position-1",
                "position-2",
                "position-3"
            );

        });


        for (
            let position = 0;
            position < 3;
            position++
        ) {

            const index =
                currentIndex + position;

            if (allCards[index]) {

                allCards[index].classList.add(
                    `position-${position + 1}`
                );

            }

        }

    }


    /* ---------------------------------------------------------
       MOVE CAROUSEL
       --------------------------------------------------------- */

    function moveCarousel(
        animate = true
    ) {

        if (animate) {

            track.style.transition =
                `transform ${slideDuration}ms
                 cubic-bezier(.4, 0, .2, 1)`;

        } else {

            track.style.transition =
                "none";

        }


        track.style.transform =
            `translateX(
                -${currentIndex * slideDistance}px
            )`;


        updatePositionClasses();
        updateDots();

    }


    /* ---------------------------------------------------------
       NEXT
       --------------------------------------------------------- */

    function nextSlide() {

        currentIndex++;

        moveCarousel(true);


        if (
            currentIndex >=
            originalCount * 2
        ) {

            setTimeout(() => {

                currentIndex =
                    originalCount;

                moveCarousel(false);

            }, slideDuration);

        }

    }


    /* ---------------------------------------------------------
       PREVIOUS
       --------------------------------------------------------- */

    function previousSlide() {

        currentIndex--;

        moveCarousel(true);


        if (
            currentIndex < originalCount
        ) {

            setTimeout(() => {

                currentIndex =
                    originalCount * 2 - 1;

                moveCarousel(false);

            }, slideDuration);

        }

    }


    /* ---------------------------------------------------------
       GO TO SLIDE
       --------------------------------------------------------- */

    function goToSlide(index) {

        currentIndex =
            originalCount + index - 1;


        if (currentIndex < 0) {

            currentIndex =
                originalCount - 1;

        }


        moveCarousel(true);

        startAutoplay();

    }


    /* ---------------------------------------------------------
       AUTOPLAY
       --------------------------------------------------------- */

    function startAutoplay() {

        stopAutoplay();

        autoplay =
            setInterval(
                nextSlide,
                autoplayDelay
            );

    }


    function stopAutoplay() {

        if (autoplay !== null) {

            clearInterval(autoplay);

            autoplay = null;

        }

    }


    /* ---------------------------------------------------------
       BUTTONS
       --------------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                startAutoplay();

            }
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();

                startAutoplay();

            }
        );

    }


    /* ---------------------------------------------------------
       PAUSE ON HOVER
       --------------------------------------------------------- */

    carousel.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    carousel.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /* ---------------------------------------------------------
       INITIALIZE
       --------------------------------------------------------- */

    moveCarousel(false);

    startAutoplay();

}


/* =========================================================
   03. HERO SCROLL INDICATOR
   ========================================================= */

const scrollIndicator =
    document.querySelector(
        ".hero-scroll-indicator"
    );


if (scrollIndicator) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                scrollIndicator.classList.add(
                    "hidden"
                );

            } else {

                scrollIndicator.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   04. MARQUEE VISIBILITY CONTROL
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        const marqueeTracks =
            document.querySelectorAll(
                ".marquee-track"
            );


        marqueeTracks.forEach(track => {

            track.style.animationPlayState =
                document.hidden
                    ? "paused"
                    : "running";

        });

    }
);