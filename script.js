/* ==========================================================
   SHIBANI BIRTHDAY WEBSITE
   COMPLETE SCRIPT
========================================================== */


/* ==========================================================
   CONFIGURATION
========================================================== */

const CONFIG = {
    firstPassword: "27092005",
    secondPassword: "1527",

    totalPhotos: 18,
    totalWhatsAppScreenshots: 8
};


/* ==========================================================
   STATE
========================================================== */

let firstPin = "";
let secondPin = "";

let musicStarted = false;

let currentWhatsApp = 0;

let finalePlayed = false;


/* ==========================================================
   GET ELEMENTS
========================================================== */

const introScreen =
    document.getElementById("introScreen");

const secondPinScreen =
    document.getElementById("secondPinScreen");

const storyWrapper =
    document.getElementById("storyWrapper");

const storyTrack =
    document.getElementById("storyTrack");

const firstPinDisplay =
    document.getElementById("firstPinDisplay");

const secondPinDisplay =
    document.getElementById("secondPinDisplay");

const firstPinError =
    document.getElementById("firstPinError");

const secondPinError =
    document.getElementById("secondPinError");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const modal =
    document.getElementById("surpriseModal");

const modalContent =
    document.getElementById("modalContent");

const modalClose =
    document.getElementById("modalClose");

const memoryRail =
    document.getElementById("memoryRail");

const photoCounter =
    document.getElementById("photoCounter");

const whatsappStage =
    document.getElementById("whatsappStage");

const messageNumber =
    document.getElementById("messageNumber");

const progressDots =
    document.querySelectorAll(".progress-dot");

const storySections =
    document.querySelectorAll(".story-section");


/* ==========================================================
   FIRST PASSWORD
========================================================== */

document
    .querySelectorAll("[data-key]")
    .forEach(button => {

        button.addEventListener("click", () => {

            addFirstPin(
                button.dataset.key
            );

        });

    });


document
    .querySelectorAll("[data-action]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const action =
                button.dataset.action;

            if (action === "clear") {
                firstPin = "";
            }

            if (action === "delete") {
                firstPin =
                    firstPin.slice(0, -1);
            }

            updateFirstPin();

        });

    });


function addFirstPin(number) {

    if (firstPin.length >= 8) {
        return;
    }

    firstPin += number;

    updateFirstPin();

    if (firstPin.length === 8) {

        setTimeout(
            validateFirstPin,
            250
        );

    }

}


function updateFirstPin() {

    if (!firstPinDisplay) {
        return;
    }

    const dots =
        firstPinDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "filled",
            index < firstPin.length
        );

    });

}


function validateFirstPin() {

    if (
        firstPin ===
        CONFIG.firstPassword
    ) {

        firstPinError.textContent = "";

        createHeartBurst();

        switchScreen(
            introScreen,
            secondPinScreen
        );

        firstPin = "";

        updateFirstPin();

    } else {

        firstPinError.textContent =
            "That's not the code ❤️ Try again...";

        firstPinDisplay.classList.remove(
            "shake"
        );

        void firstPinDisplay.offsetWidth;

        firstPinDisplay.classList.add(
            "shake"
        );

        firstPin = "";

        updateFirstPin();

    }

}


/* ==========================================================
   SECOND PASSWORD
========================================================== */

document
    .querySelectorAll("[data-second-key]")
    .forEach(button => {

        button.addEventListener("click", () => {

            addSecondPin(
                button.dataset.secondKey
            );

        });

    });


document
    .querySelectorAll("[data-second-action]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const action =
                button.dataset.secondAction;

            if (action === "clear") {
                secondPin = "";
            }

            if (action === "delete") {
                secondPin =
                    secondPin.slice(0, -1);
            }

            updateSecondPin();

        });

    });


function addSecondPin(number) {

    if (secondPin.length >= 4) {
        return;
    }

    secondPin += number;

    updateSecondPin();

    if (secondPin.length === 4) {

        setTimeout(
            validateSecondPin,
            250
        );

    }

}


function updateSecondPin() {

    if (!secondPinDisplay) {
        return;
    }

    const dots =
        secondPinDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "filled",
            index < secondPin.length
        );

    });

}


function validateSecondPin() {

    if (
        secondPin ===
        CONFIG.secondPassword
    ) {

        secondPinError.textContent = "";

        createHeartBurst();

        /*
        ======================================================
        MUSIC STARTS AFTER CORRECT SECOND PIN
        ======================================================
        */

        startMusic();

        setTimeout(() => {

            secondPinScreen.classList.remove(
                "active-screen"
            );

            storyWrapper.classList.add(
                "visible"
            );

            startBackgroundEffects();

        }, 650);

        secondPin = "";

        updateSecondPin();

    } else {

        secondPinError.textContent =
            "Not quite... try again ❤️";

        secondPinDisplay.classList.remove(
            "shake"
        );

        void secondPinDisplay.offsetWidth;

        secondPinDisplay.classList.add(
            "shake"
        );

        secondPin = "";

        updateSecondPin();

    }

}


/* ==========================================================
   SCREEN TRANSITION
========================================================== */

function switchScreen(from, to) {

    from.classList.remove(
        "active-screen"
    );

    setTimeout(() => {

        to.classList.add(
            "active-screen"
        );

    }, 250);

}


/* ==========================================================
   MUSIC
========================================================== */

/*
IMPORTANT:

Your HTML should have:

<audio
    id="backgroundMusic"
    src="assets/music.mp3"
    loop>
</audio>

The filename is MUSIC.MP3 / music.mp3
inside the assets folder.
*/

function startMusic() {

    if (
        musicStarted ||
        !music
    ) {
        return;
    }

    music.volume = 0.32;

    /*
    Start from beginning
    */

    music.currentTime = 0;

    const playPromise =
        music.play();

    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(() => {

                musicStarted = true;

                if (musicButton) {

                    musicButton.classList.add(
                        "playing"
                    );

                    musicButton.textContent =
                        "♫";

                }

                console.log(
                    "Birthday music started ❤️"
                );

            })
            .catch(error => {

                /*
                Some browsers may still block
                audio playback.

                The music button below can
                manually start it.
                */

                console.log(
                    "Music autoplay blocked:",
                    error
                );

            });

    }

}


/* ==========================================================
   MUSIC BUTTON
========================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            if (!music) {
                return;
            }


            if (music.paused) {

                music.play()
                    .then(() => {

                        musicStarted = true;

                        musicButton.classList.add(
                            "playing"
                        );

                        musicButton.textContent =
                            "♫";

                    })
                    .catch(error => {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    });

            } else {

                music.pause();

                musicButton.classList.remove(
                    "playing"
                );

                musicButton.textContent =
                    "×";

            }

        }
    );

}


/* ==========================================================
   SURPRISE CARDS
========================================================== */

document
    .querySelectorAll(".surprise-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                openSurprise(
                    card.dataset.surprise
                );

            }
        );

    });


function openSurprise(type) {

    /* ------------------------------------------
       OPEN ME
    ------------------------------------------ */

    if (type === "letter") {

        modalContent.innerHTML = `

            <div class="modal-letter">

                <div class="heart-top">
                    ♥
                </div>

                <h2>
                    Dear Shibani
                </h2>

                <div class="divider"></div>

                <p>
                    Wish you many more happy Birthday 🎂
                    Shibani ❤️
                </p>

                <p>
                    May this beautiful day bring you
                    endless happiness, peaceful moments,
                    wonderful memories and everything
                    your heart wishes for.
                </p>

                <p>
                    Keep smiling, keep shining and
                    always stay as wonderful as you are.
                </p>

                <div class="signature">
                    With lots of love ♥
                </div>

                <button
                    class="modal-button"
                    onclick="closeSurprise()">

                    Keep the surprise going →

                </button>

            </div>

        `;

    }


    /* ------------------------------------------
       ONE MORE SURPRISE
    ------------------------------------------ */

    if (type === "secret") {

        modalContent.innerHTML = `

            <div class="secret-surprise">

                <div class="secret-icon">
                    💝
                </div>

                <h2>
                    One More Surprise
                </h2>

                <p>
                    If you think that's all...
                    you're definitely wrong. ❤️
                </p>

                <p>
                    There are beautiful memories
                    waiting for you ahead.
                </p>

                <button
                    class="modal-button"
                    id="readyButton">

                    I'm Ready ❤️

                </button>

            </div>

        `;


        const readyButton =
            document.getElementById(
                "readyButton"
            );


        if (readyButton) {

            readyButton.addEventListener(
                "click",
                goToMemories
            );

        }

    }


    modal.classList.add("open");

}


/* ==========================================================
   CLOSE MODAL
========================================================== */

function closeSurprise() {

    modal.classList.remove(
        "open"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeSurprise
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "modal-backdrop"
                )
            ) {

                closeSurprise();

            }

        }
    );

}


/* ==========================================================
   I'M READY → PHOTO SECTION
========================================================== */

function goToMemories() {

    closeSurprise();

    const memoriesSection =
        storySections[2];

    setTimeout(() => {

        memoriesSection.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });

        setTimeout(() => {

            createPetalBurst(20);

            createHeartBurst();

        }, 700);

    }, 350);

}


/* ==========================================================
   18 NORMAL PHOTOS
========================================================== */

function createMemoryPhotos() {

    if (!memoryRail) {
        return;
    }

    memoryRail.innerHTML = "";


    for (
        let i = 1;
        i <= CONFIG.totalPhotos;
        i++
    ) {

        const imageName =
            `photo ${i}.jpg`;


        const number =
            String(i).padStart(
                2,
                "0"
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "memory-card";


        const rotation =
            ((i % 5) - 2) * 1.2;


        card.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );


        card.innerHTML = `

            <img
                src="assets/${imageName}"
                alt="Memory ${number}"
                loading="${i <= 3 ? "eager" : "lazy"}"
            >

            <span class="memory-number">
                MEMORY ${number}
            </span>

        `;


        memoryRail.appendChild(
            card
        );

    }

}


createMemoryPhotos();


/* ==========================================================
   PHOTO COUNTER
========================================================== */

let memoryCards = [];


setTimeout(() => {

    memoryCards =
        document.querySelectorAll(
            ".memory-card"
        );

}, 150);


if (memoryRail) {

    memoryRail.addEventListener(
        "scroll",
        () => {

            if (
                !memoryCards.length
            ) {
                return;
            }


            const center =
                memoryRail.scrollLeft +
                memoryRail.clientWidth / 2;


            let closestIndex = 0;

            let closestDistance =
                Infinity;


            memoryCards.forEach(
                (card, index) => {

                    const cardCenter =
                        card.offsetLeft +
                        card.offsetWidth / 2;


                    const distance =
                        Math.abs(
                            center -
                            cardCenter
                        );


                    if (
                        distance <
                        closestDistance
                    ) {

                        closestDistance =
                            distance;

                        closestIndex =
                            index;

                    }

                }
            );


            if (photoCounter) {

                photoCounter.textContent =
                    `${String(
                        closestIndex + 1
                    ).padStart(2, "0")} / 18`;

            }

        }
    );

}


/* ==========================================================
   WHATSAPP — 8 PHOTOS CONTINUOUS RUNNING BACKGROUND
========================================================== */

function createWhatsAppScreenshots() {

    if (!whatsappStage) return;

    whatsappStage.innerHTML = "";

    const track =
        document.createElement(
            "div"
        );

    track.className =
        "whatsapp-marquee-track";


    const images = [];

    for (
        let i = 1;
        i <= 8;
        i++
    ) {

        images.push(
            `whatappa ${i}.png`
        );

    }


    const allImages = [
        ...images,
        ...images
    ];


    allImages.forEach(
        (imageName, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "whatsapp-running-card";


            card.innerHTML = `
                <img
                    src="assets/${imageName}"
                    alt="Personal WhatsApp message ${
                        (index % 8) + 1
                    }"
                >
            `;


            track.appendChild(
                card
            );

        }
    );


    whatsappStage.appendChild(
        track
    );


    addWhatsAppMarqueeStyles();

}


/* ==========================================================
   WHATSAPP MARQUEE STYLE
========================================================== */

function addWhatsAppMarqueeStyles() {

    if (
        document.getElementById(
            "whatsapp-marquee-style"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "whatsapp-marquee-style";


    style.textContent = `

        #whatsappStage {
            position: relative;
            width: 100%;
            overflow: hidden;
            isolation: isolate;
        }

        #whatsappStage::before,
        #whatsappStage::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 18%;
            z-index: 5;
            pointer-events: none;
        }

        #whatsappStage::before {
            left: 0;
            background:
                linear-gradient(
                    to right,
                    rgba(10, 4, 14, 0.95),
                    rgba(10, 4, 14, 0)
                );
        }

        #whatsappStage::after {
            right: 0;
            background:
                linear-gradient(
                    to left,
                    rgba(10, 4, 14, 0.95),
                    rgba(10, 4, 14, 0)
                );
        }

        .whatsapp-marquee-track {
            display: flex;
            align-items: center;
            width: max-content;
            gap: 28px;
            padding: 30px 0;

            animation:
                whatsappMarquee
                32s
                linear
                infinite;

            will-change: transform;
        }

        .whatsapp-running-card {
            flex: 0 0 auto;

            width: 230px;
            height: 420px;

            border-radius: 24px;

            overflow: hidden;
            position: relative;

            background:
                rgba(255,255,255,0.07);

            border:
                1px solid
                rgba(255,255,255,0.18);

            box-shadow:
                0 20px 60px
                rgba(0,0,0,0.45);

            transform:
                scale(0.88);

            opacity: 0.72;

            transition:
                transform 0.5s ease,
                opacity 0.5s ease;
        }

        .whatsapp-running-card img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .whatsapp-running-card:nth-child(3),
        .whatsapp-running-card:nth-child(11) {
            transform: scale(1.02);
            opacity: 1;

            box-shadow:
                0 25px 80px
                rgba(255,90,170,0.22);
        }

        @keyframes whatsappMarquee {

            from {
                transform: translateX(0);
            }

            to {
                transform:
                    translateX(
                        calc(
                            -50% - 14px
                        )
                    );
            }

        }

        @media (hover: hover) {

            #whatsappStage:hover
            .whatsapp-marquee-track {

                animation-play-state:
                    paused;

            }

        }

        @media (max-width: 700px) {

            .whatsapp-marquee-track {

                gap: 18px;

                animation-duration:
                    26s;

            }

            .whatsapp-running-card {

                width: 170px;
                height: 310px;

            }

        }

        @media (prefers-reduced-motion: reduce) {

            .whatsapp-marquee-track {

                animation: none;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* ==========================================================
   INITIALIZE WHATSAPP
========================================================== */

createWhatsAppScreenshots();


/* ==========================================================
   STORY SECTION OBSERVER
========================================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > 0.55
                    ) {

                        const index =
                            Array.from(
                                storySections
                            ).indexOf(
                                entry.target
                            );


                        updateProgress(
                            index
                        );


                        onSectionEnter(
                            index
                        );

                    }

                }
            );

        },
        {
            root: storyTrack,
            threshold: [0.55]
        }
    );


storySections.forEach(
    section => {

        observer.observe(
            section
        );

    }
);


/* ==========================================================
   PROGRESS DOTS
========================================================== */

function updateProgress(index) {

    progressDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        }
    );

}


/* ==========================================================
   SECTION ENTER EFFECTS
========================================================== */

function onSectionEnter(index) {

    switch (index) {

        case 0:

            createPetalBurst(12);

            break;


        case 1:

            createHeartBurst();

            break;


        case 2:

            createPetalBurst(18);

            break;


        case 3:

            createPetalBurst(25);

            break;


        case 4:

            createHeartBurst();

            break;


        case 5:

            createHeartBurst();

            break;


        case 6:

            grandFinale();

            break;

    }

}


/* ==========================================================
   PARTICLES
========================================================== */

function createParticle() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) {
        return;
    }


    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        (50 + Math.random() * 50) + "%";


    particle.style.animationDuration =
        (5 + Math.random() * 7) + "s";


    particle.style.animationDelay =
        Math.random() * 2 + "s";


    const size =
        1 + Math.random() * 3;


    particle.style.width =
        size + "px";


    particle.style.height =
        size + "px";


    container.appendChild(
        particle
    );


    setTimeout(
        () => particle.remove(),
        14000
    );

}


function startBackgroundEffects() {

    setInterval(
        createParticle,
        500
    );


    setInterval(
        createFloatingHeart,
        1100
    );

}


/* ==========================================================
   FLOATING HEARTS
========================================================== */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.25
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    container.appendChild(
        heart
    );


    setTimeout(
        () => heart.remove(),
        11000
    );

}


/* ==========================================================
   PETALS
========================================================== */

function createPetal() {

    const container =
        document.getElementById(
            "petals"
        );


    if (!container) {
        return;
    }


    const petal =
        document.createElement(
            "span"
        );


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.animationDuration =
        (6 + Math.random() * 7) + "s";


    petal.style.animationDelay =
        Math.random() * 2 + "s";


    petal.style.transform =
        `rotate(
            ${Math.random() * 360}deg
        )`;


    container.appendChild(
        petal
    );


    setTimeout(
        () => petal.remove(),
        16000
    );

}


function createPetalBurst(
    amount = 15
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 80
        );

    }

}


/* ==========================================================
   HEART BURST
========================================================== */

function createHeartBurst() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "floating-heart";


        heart.textContent =
            i % 3 === 0
                ? "♥"
                : "♡";


        heart.style.left =
            45 +
            Math.random() * 10 +
            "%";


        heart.style.bottom =
            40 +
            Math.random() * 10 +
            "%";


        heart.style.fontSize =
            (12 + Math.random() * 18) +
            "px";


        const duration =
            2 +
            Math.random() * 2;


        heart.style.animationDuration =
            duration +
            "s";


        container.appendChild(
            heart
        );


        setTimeout(
            () => heart.remove(),
            duration * 1000
        );

    }

}


/* ==========================================================
   GRAND FINALE
========================================================== */

function grandFinale() {

    if (finalePlayed) {
        return;
    }


    finalePlayed = true;


    createPetalBurst(45);


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(
            createFloatingHeart,
            i * 80
        );

    }


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            createParticle,
            i * 50
        );

    }

}


/* ==========================================================
   KEYBOARD SUPPORT
========================================================== */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;


        /* FIRST PIN */

        if (
            introScreen &&
            introScreen.classList.contains(
                "active-screen"
            )
        ) {

            if (
                /^[0-9]$/.test(key)
            ) {

                addFirstPin(key);

            }


            if (
                key === "Backspace"
            ) {

                firstPin =
                    firstPin.slice(
                        0,
                        -1
                    );

                updateFirstPin();

            }


            if (
                key === "Escape"
            ) {

                firstPin = "";

                updateFirstPin();

            }

        }


        /* SECOND PIN */

        else if (
            secondPinScreen &&
            secondPinScreen.classList.contains(
                "active-screen"
            )
        ) {

            if (
                /^[0-9]$/.test(key)
            ) {

                addSecondPin(key);

            }


            if (
                key === "Backspace"
            ) {

                secondPin =
                    secondPin.slice(
                        0,
                        -1
                    );

                updateSecondPin();

            }


            if (
                key === "Escape"
            ) {

                secondPin = "";

                updateSecondPin();

            }

        }

    }
);


/* ==========================================================
   INITIALIZATION
========================================================== */

updateFirstPin();

updateSecondPin();


setTimeout(() => {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createParticle,
            i * 150
        );

    }

}, 500);