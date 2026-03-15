// === Szene 1: Geschenk, Progressbar, Klicks ===
function sceneOne() {
    const sceneOne = document.querySelector(".sceneOne");
    const progressBar = document.querySelector(".progressBar");
    let ticker = 0;

    // Progressbar aktualisieren
    function progressUpdate() {
        if (ticker < 0) ticker = 0;
        if (ticker > 100) ticker = 100;
        progressBar.style.width = `${ticker}%`;
    }

    // Klick auf Geschenk
    sceneOne.addEventListener("click", (e) => {
        if (ticker < 100) {
            const x = e.clientX;
            const y = e.clientY;

            explodeConfetti(x, y);

            ticker += 15;
            progressUpdate();

            if (ticker >= 100) {
                giftExplode();
            }
        }
    });

    // Countdown verringert ticker automatisch
    function countdown() {
        if (ticker > 0 && ticker < 100) {
            ticker -= 2;
            progressUpdate();
        }
        setTimeout(countdown, 1000);
    }

    // Konfetti bei Klick
    function explodeConfetti(x, y) {
        for (let i = 0; i < 25; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");

            const hue = Math.random() * 360;
            confetti.style.background = `hsl(${hue}, 80%, 60%)`;

            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;

            document.body.appendChild(confetti);

            const angle = Math.random() * 2 * Math.PI;
            const distance = 100 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            confetti.animate([
                { transform: "translate(0, 0)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            });

            setTimeout(() => confetti.remove(), 1500);
        }
    }

    // Geschenk platzt in Confetti
    function giftExplode() {
        const gift = document.querySelector(".gift");
        const rect = gift.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 75; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");

            const hue = Math.random() * 360;
            confetti.style.background = `hsl(${hue}, 80%, 60%)`;

            confetti.style.left = `${centerX}px`;
            confetti.style.top = `${centerY}px`;

            document.body.appendChild(confetti);

            const angle = Math.random() * 2 * Math.PI;
            const distance = 150 + Math.random() * 100;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            confetti.animate([
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            });

            setTimeout(() => confetti.remove(), 3000);
        }

        gift.style.opacity = 0;
        setTimeout(() => {
            sceneOne.remove();
        }, 500);

        // Szene 2 starten
        sceneTwo();
    }

    countdown();
}

// === Ballons ===
function createBalloon(onEnd) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const hue = Math.random() * 360;
    balloon.style.background = `hsl(${hue}, 70%, 60%)`;

    balloon.style.left = `${Math.random() * window.innerWidth}px`;

    const scale = 0.7 + Math.random() * 0.6;
    balloon.style.width = `${40 * scale}px`;
    balloon.style.height = `${60 * scale}px`;

    document.body.appendChild(balloon);

    const duration = 4000 + Math.random() * 3000;

    balloon.animate([
        { transform: 'translateY(0)' },
        { transform: `translateY(-${window.innerHeight + 100}px)` }
    ], {
        duration: duration,
        easing: 'ease-out',
        fill: 'forwards'
    });

    setTimeout(() => {
        balloon.remove();
        if (onEnd) onEnd();
    }, duration);
}

function launchBalloons(count = 30, callback) {
    let created = 0;
    let finished = 0;

    const interval = setInterval(() => {
        createBalloon(() => {
            finished++;
            if (finished === count && callback) callback();
        });

        created++;
        if (created >= count) clearInterval(interval);
    }, 300);
}

// === HAPPY BIRTHDAY Text ===
function textSchreiben() {
    const letters = document.querySelectorAll(".textTag");
    let index = 0;

    const interval = setInterval(() => {
        if (index < letters.length) {
            letters[index].classList.add("visible");
            letters[index].style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            index++;
        } else {
            clearInterval(interval);
        }
    }, 200);
}

function createBirthdayText() {
    const textContainer = document.createElement("div");
    textContainer.classList.add("textKastenCon");

    const words = ["HAPPY", "BIRTHDAY"];

    words.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("textKasten");

        for (let char of word) {
            const letter = document.createElement("p");
            letter.classList.add("textTag");
            letter.textContent = char;
            wordDiv.appendChild(letter);
        }

        textContainer.appendChild(wordDiv);
    });

    document.body.appendChild(textContainer);
    textSchreiben();
}

// === Kuchen ===
function createCake(candleCount = 5) {
    const cakeContainer = document.createElement("div");
    cakeContainer.classList.add("cakeContainer");

    const cake = document.createElement("div");
    cake.classList.add("cake");

    const cakeTop = document.createElement("div");
    cakeTop.classList.add("cakeTop");
    cake.appendChild(cakeTop);

    for (let i = 0; i < candleCount; i++) {
        const candle = document.createElement("div");
        candle.classList.add("candle");

        const flame = document.createElement("div");
        flame.classList.add("flame");
        candle.appendChild(flame);

        candle.style.left = `${10 + i * (80 / candleCount)}%`;

        cakeTop.appendChild(candle);
    }

    cakeContainer.appendChild(cake);
    document.body.appendChild(cakeContainer);
}
function rainConfetti(count = 20, callback) {
    let finished = 0;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const hue = Math.random() * 360;
        confetti.style.background = `hsl(${hue}, 80%, 60%)`;

        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.top = `-20px`;

        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        document.body.appendChild(confetti);

        const duration = 2000 + Math.random() * 2000;
        const endX = (Math.random() - 0.5) * 200;
        const endY = window.innerHeight + 50;

        confetti.animate([
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => {
            confetti.remove();
            finished++;
            if (finished === count && callback) callback();
        }, duration);
    }
}
// === Szene 2: Ballons + Text + Kuchen ===
function sceneTwo() {
    if (document.querySelector(".sceneTwo")) return;

    const sceneTwo = document.createElement("div");
    sceneTwo.classList.add("sceneTwo");
    document.body.appendChild(sceneTwo);

    // Ballons starten
    launchBalloons(50, () => {
        // Wenn alle Ballons weg sind, Konfetti fallen lassen
        rainConfetti(20, () => {
            // Nach dem Konfetti: HAPPY BIRTHDAY + Kuchen
            createBirthdayText();
            createCake();

            // Kerzen klickbar
            document.querySelectorAll(".candle").forEach(candle => {
                candle.addEventListener("click", () => {
                    const flame = candle.querySelector(".flame");
                    flame.style.display = "none";
                });
            });
        });
    });
}

// === Starte Szene 1 ===
sceneOne();