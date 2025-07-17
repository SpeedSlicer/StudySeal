const search = window.location.search.replace(/;/g, "&");
const params = new URLSearchParams(search);
var x = document.getElementById("studyMusic");
pause = false;
const sValue = params.get("m");
const fishEarned = document.getElementById("fishEarned");
const pausebutton = document.getElementById("pause");
let hour = 0;
let minute = 0;
let second = 0;
let timeRemaining = 0;
let timeStarted = 0;
const countdownDisplay = document.getElementById("countdownDisplay");
let seal = 0;
let sealstring = "seal1.jpg";
const sealimg = document.getElementById("sealimg");
var cookie = {
    set: function (name, value, daysToLive) {
        var cookie = name + "=" + encodeURIComponent(value);

        if (typeof daysToLive === "number") {
            cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
        }

        document.cookie = cookie;
    },

    get: function (name) {
        var cookies = document.cookie.split(";").map(function (cookie) {
            return cookie.trim();
        });

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var separatorIndex = cookie.indexOf("=");
            var cookieName = cookie.slice(0, separatorIndex);

            if (cookieName === name) {
                return decodeURIComponent(cookie.slice(separatorIndex + 1));
            }
        }

        return null;
    },

    delete: function (name) {
        document.cookie = name + "=; max-age=0";
    },

    exists: function (name) {
        var cookies = document.cookie.split(";").map(function (cookie) {
            return cookie.trim();
        });

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var separatorIndex = cookie.indexOf("=");
            var cookieName = cookie.slice(0, separatorIndex).trim();

            if (cookieName === name) {
                return true;
            }
        }

        return false;
    },
};

var cache = {
    set: function (key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error setting cache item:", e);
        }
    },

    get: function (key) {
        try {
            var item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Error getting cache item:", e);
            return null;
        }
    },

    delete: function (key) {
        try {
            sessionStorage.removeItem(key);
        } catch (e) {
            console.error("Error deleting cache item:", e);
        }
    },

    clear: function () {
        try {
            sessionStorage.clear();
        } catch (e) {
            console.error("Error clearing cache:", e);
        }
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const sources = ["audio/cruising.mp3", "audio/miffy.mp3", "audio/sumu.mp3"];
    pausebutton.style.display = "none";
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    x.src = randomSource;
    x.load();
    const endButton = document.getElementById("end");
    const startButton = document.getElementById("begin");
    endButton.style.display = "none";
    sealimg.style.display = "none";
    if (cookie.get("seal")) {
        seal = parseInt(cookie.get("seal"));
    }

    startButton.addEventListener("click", () => {
        if (seal === 0) {
            sealstring = "seal1.jpg";
        } else {
            sealstring = "seal1.jpg";
        }
        beginTimer();
        startButton.style.display = "none";
        pausebutton.style.display = "block";
        endButton.style.display = "block";
        sealimg.style.display = "block";
        sealimg.src = "img/" + sealstring;

    });
    pausebutton.addEventListener("click", () => {
        pauseToggle();
    });
    endButton.addEventListener("click", () => {
        if (cookie.exists("fish")) {
            cookie.set(
                "fish",
                parseInt(cookie.get("fish")) + Math.floor(minute / 20),
                30
            );
        } else {
            cookie.set("fish", Math.floor(minute / 20), 30);
        }

        window.location.href = "index.html";
    });
});

function beginTimer() {
    if (sValue === "true") {
        x.play();
    }
    if (seal == 0) {

    }
    time = params.get("t");
    hour = Math.floor(time / 3600);
    minute = Math.floor((time % 3600) / 60);
    second = time % 60;
    timeRemaining = time;
    timeStarted = time;
    fishEarned.textContent = "Fish Earned: 0";
    countdownDisplay.textContent = `Time Remaining: ${hour} hours and ${minute} minutes and ${
        time % 60
    } seconds`;
    window.setInterval(() => {
        if (timeRemaining > 0 && !pause) {
            updateCountdown();
        } else if (timeRemaining <= 0 && !pause) {
            countdownDisplay.textContent = "Time's up!";
            clearInterval(this);
        } else {
            countdownDisplay.textContent = "Paused";
            x.pause();
            endButton.style.display = "none";
            startButton.style.display = "block";
            pause = true;
        }
    }, 1000);
}

function updateCountdown() {
    timeRemaining--;
    hour = Math.floor(timeRemaining / 3600);
    minute = Math.floor((timeRemaining % 3600) / 60);
    second = timeRemaining % 60;
    countdownDisplay.textContent = `Time Remaining: ${hour} hours and ${minute} minutes and ${
        timeRemaining % 60
    } seconds`;
    if (timeRemaining + 2 < timeStarted) {
        fishEarned.textContent = "Fish Earned: " + Math.floor(minute / 20);
    }
}

function pauseToggle() {
    if (pause) {
        pause = false;
        x.play();
        pausebutton.textContent = "Pause";
        updateCountdown();
    } else {
        pause = true;
        x.pause();
        pausebutton.textContent = "Resume";
    }
}
