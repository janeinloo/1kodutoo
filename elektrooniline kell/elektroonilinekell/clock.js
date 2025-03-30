document.addEventListener("DOMContentLoaded", function () {
    const clockElement = document.getElementById("clock");
    const dateElement = document.getElementById("date");
    const dayElement = document.getElementById("day");
    const sizeSlider = document.getElementById("size-slider");
    const colorPicker = document.getElementById("color-picker");
    const bgColorPicker = document.getElementById("bg-color-picker");
    const toggleSecondsBtn = document.getElementById("toggle-seconds");
    const changeBgBtn = document.getElementById("change-background");
    const clockAndDateElements = [clockElement, dateElement, dayElement];
    const toggleFormatBtn = document.getElementById("toggle-format");
    const toggleLanguageBtn = document.getElementById("toggle-language");

    let showSeconds = true;
    let bgImages = ["pictures/bg1.jpg", "pictures/bg2.jpg", "pictures/bg3.jpg"]; 
    let currentBgIndex = 0;
    let isArcadeFont = false;
    let is24HourFormat = true;
    let isEnglish = false;

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        let period = "";
        if (!is24HourFormat) {
        period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Muudab 0 -> 12
        }
        hours = String(hours).padStart(2, "0");

        const dayNamesET = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
        const dayNamesEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayNames = isEnglish ? dayNamesEN : dayNamesET;

        clockElement.textContent = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
        dateElement.textContent = now.toLocaleDateString(isEnglish ? "en-US" : "et-EE");
        dayElement.textContent = dayNames[now.getDay()];
    }

    sizeSlider.addEventListener("input", function () {
        clockElement.style.fontSize = (this.value / 8) + "vw";
    });

    colorPicker.addEventListener("input", function () {
        const textElements = [clockElement, dateElement, dayElement];
        textElements.forEach(element => element.style.color = this.value);
    });

    bgColorPicker.addEventListener("input", function () {
        document.body.style.backgroundColor = this.value;
        document.body.style.backgroundImage = "none"; 
    });

    toggleSecondsBtn.addEventListener("click", function () {
        showSeconds = !showSeconds;
        updateClock();
    });

    changeBgBtn.addEventListener("click", function () {
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        document.body.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    });

    clockElement.addEventListener("click", function () {
        isArcadeFont = !isArcadeFont;
        const font = isArcadeFont ? "'Press Start 2P', cursive" : "Arial, sans-serif";
        clockAndDateElements.forEach(element => element.style.fontFamily = font);
    });

    toggleFormatBtn.addEventListener("click", function () {
        is24HourFormat = !is24HourFormat;
        updateClock();
    });

    toggleLanguageBtn.addEventListener("click", function () {
        isEnglish = !isEnglish;
        updateClock();
    });

    setInterval(updateClock, 1000);
    updateClock();
});
