// kõigepealt söötsin ette esialgse ülesande kirjelduse.
// Siis söötsin ette nõuded ja gpt tegi minimaalseid muudatusi (kellale lisandus kuupäeva ja nädala kuvamine, teksti värv, tausta värv ja sekundid, autori ja giti viide)
// viimasega lisandusid ja alla document.addEventlistener alla colorpicker, bgcolorpicker ja toggleseconds

document.addEventListener("DOMContentLoaded", function () {
    const clockElement = document.getElementById("clock");
    const dateElement = document.getElementById("date");
    const dayElement = document.getElementById("day");
    const sizeSlider = document.getElementById("size-slider");
    const colorPicker = document.getElementById("color-picker");
    const bgColorPicker = document.getElementById("bg-color-picker");
    const toggleSecondsBtn = document.getElementById("toggle-seconds");
    const changeBgBtn = document.getElementById("change-background"); // "Lisasin samasse folderisse kausta "pictures" piltidega, neid võiks kasutada värvilise backgroundi asemel ning võiks saada muuta neid".
    const clockAndDateElements = [clockElement, dateElement, dayElement]; //"Veel võiks näiteks kellaajale vajutades saada muuta fonti rohkem "arcade"likuks. Samuti kellaajale vajutades võiks ka kuupäeva font samasuguseks muutuda. Algne font võiks ka alles jääda"

    //"Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale" mõlemad alumised
    const toggleFormatBtn = document.getElementById("toggle-format");
    const toggleLanguageBtn = document.getElementById("toggle-language");

    let showSeconds = true;
    let bgImages = ["pictures/bg1.jpg", "pictures/bg2.jpg", "pictures/bg3.jpg"]; // "Lisasin samasse folderisse kausta "pictures" piltidega, neid võiks kasutada värvilise backgroundi asemel ning võiks saada muuta neid".
    let currentBgIndex = 0; //"Lisasin samasse folderisse kausta "pictures" piltidega, neid võiks kasutada värvilise backgroundi asemel ning võiks saada muuta neid".
    let isArcadeFont = false; // "Veel võiks näiteks kellaajale vajutades saada muuta fonti rohkem "arcade"likuks. Samuti kellaajale vajutades võiks ka kuupäeva font samasuguseks muutuda. Algne font võiks ka alles jääda"

    //" Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale " mõlemad alumised
    let is24HourFormat = true;
    let isEnglish = false;

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");


        //"Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale"
        let period = "";
        if (!is24HourFormat) {
        period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Muudab 0 -> 12
        }
        hours = String(hours).padStart(2, "0");

        // "Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale"
        const dayNamesET = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
        const dayNamesEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayNames = isEnglish ? dayNamesEN : dayNamesET;

        clockElement.textContent = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
        dateElement.textContent = now.toLocaleDateString(isEnglish ? "en-US" : "et-EE");
        dayElement.textContent = dayNames[now.getDay()];
    }
    //lisandus koos nõuetega
    sizeSlider.addEventListener("input", function () {
        clockElement.style.fontSize = (this.value / 8) + "vw";
    });
    //lisandus koos nõuetega
    // "See on juba päris korralik, aga hetkel teksti värvi muutes muutub ainult kell. Võiks saada ka kuupäeva jne värvi muuta. "
    colorPicker.addEventListener("input", function () {
        const textElements = [clockElement, dateElement, dayElement];
        textElements.forEach(element => element.style.color = this.value);
    });
    //lisandus koos nõuetega
    bgColorPicker.addEventListener("input", function () {
        document.body.style.backgroundColor = this.value;
        document.body.style.backgroundImage = "none"; 
    });
    //lisandus koos nõuetega
    toggleSecondsBtn.addEventListener("click", function () {
        showSeconds = !showSeconds;
        updateClock();
    });
    // "Lisasin samasse folderisse kausta "pictures" piltidega, neid võiks kasutada värvilise backgroundi asemel ning võiks saada muuta neid."
    changeBgBtn.addEventListener("click", function () {
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        document.body.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    });
    // "Veel võiks näiteks kellaajale vajutades saada muuta fonti rohkem "arcade"likuks. Samuti kellaajale vajutades võiks ka kuupäeva font samasuguseks muutuda. Algne font võiks ka alles jääda"
    clockElement.addEventListener("click", function () {
        isArcadeFont = !isArcadeFont;
        const font = isArcadeFont ? "'Press Start 2P', cursive" : "Arial, sans-serif";
        clockAndDateElements.forEach(element => element.style.fontFamily = font);
    });
    //"Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale"
    toggleFormatBtn.addEventListener("click", function () {
        is24HourFormat = !is24HourFormat;
        updateClock();
    });
    //"Veel võiks saada vahetada kella formaati am/pm mitte meie tavapärane 24h formaat ning võimalus ka inglise keelseks tõlkeks päevale"
    toggleLanguageBtn.addEventListener("click", function () {
        isEnglish = !isEnglish;
        updateClock();
    });

    setInterval(updateClock, 1000);
    updateClock();
});
