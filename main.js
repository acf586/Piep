var numberOfFieldsInXdirection = 3;
var numberOfFieldsInZdirection = 3;

window.onload = function () {           //Erzeugen des Spiel Objekts und Aufruf der Initializierung der Webside wenn alle Daten geladen wurden
    game = new Game(5);

    createGameField();

    startButtonAddAventListener();

    fieldButtonsAddEventListener();

    showStartScreen();

}

function createGameField() {

    for (let z = 0; z < numberOfFieldsInZdirection; z++) {
        for (let x = 0; x < numberOfFieldsInXdirection; x++) {

            fieldButton = document.createElement("div");

            fieldButton.className = "fieldButton";

            var fieldId = x + "" + z;

            fieldButton.setAttribute("id", fieldId);

            document.getElementById("game-grid").appendChild(fieldButton);

        }
    }

}

function startButtonAddAventListener() {

    document.getElementById("overlayStartButton").addEventListener('click', function () {

        let gameContainer = document.getElementById("gameContainer");
        let overlay = document.getElementById("overlay");

        overlay.style.animationName = "fadeOut";

        gameContainer.style.display = "block";

        gameContainer.style.animationName = "fadeIn";

        setTimeout(function () {

            overlay.style.display = "none";

            document.getElementById("overlayProgressbar").style.display = "block";

            game.startPressed();

        }, 500);
    });
}

function fieldButtonsAddEventListener() {

    let fieldButtonArray = document.getElementsByClassName("fieldButton");

    for (let i = 0; i < fieldButtonArray.length; i++) {
        fieldButtonArray[i].id;
        fieldButtonArray[i].addEventListener('click', function (e) {
            let listenerPositionField = e.target.id;

            console.log("ActionListener listener listenerPositionField: " + listenerPositionField);

            game.fieldPressed(listenerPositionField);
        });

    }
}

function showStartScreen() {

    let gameContainer = document.getElementById("gameContainer");
    let overlay = document.getElementById("overlay");
    let button = document.getElementById("overlayStartButton");

    overlay.style.animationName = "fadeIn";
    gameContainer.style.animationName = "fadeOut";
    overlay.style.display = "block";

    setTimeout(() => {
        gameContainer.style.display = "none";
    }, 500);

    button.style.marginTop = (window.innerHeight - button.clientHeight) / 2;

    updateSize();
}

//Der folgende Abschnitt dient dazu die Anwendung responsive darzustellen

window.onresize = function () {
    updateSize();
}

function updateSize() {                 //Berechnung zur Größenänderung der Divs und Aufruf der makeSize() Funktion
    let winHeight = window.innerHeight;
    let winWidth = window.innerWidth;

    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        makeSize(winWidth / 2, (winHeight - winWidth / 2) / 2, (winWidth - winWidth / 2) / 2, winWidth * 0.2, (winHeight - winWidth * 0.2) / 2, winHeight * 0.25);
    }
    if (winHeight < winWidth / 2) {
        makeSize(winHeight - winHeight * 0.05, winHeight * 0.025, (winWidth - winHeight) / 2, winHeight * 0.4, (winHeight - winHeight * 0.4) / 2, winHeight * 0.25);
    }
}

function makeSize(gCSize, gCMarginTop, gCMarginLeft, buttonSize, buttonMargin, pointMargin) {      //Funktions zur Größenänderung der Divs

    let gameContainer = document.getElementById("gameContainer");
    let button = document.getElementById("overlayStartButton");
    let pointField = document.getElementById("overlayProgressbar");

    gameContainer.style.height = gCSize;
    gameContainer.style.width = gCSize;

    gameContainer.style.marginTop = gCMarginTop;
    gameContainer.style.marginLeft = gCMarginLeft;

    button.style.height = buttonSize;
    button.style.width = buttonSize;
    button.style.marginTop = buttonMargin;

    pointField.marginTop = pointMargin;
    pointField.style.height = parseFloat(buttonSize / 3);
    pointField.style.width = parseFloat(buttonSize / 3);
    pointField.style.lineHeight = parseFloat(buttonSize / 3) + "px";

    makeProgressbar();

    document.getElementById("overlay").style.marginTop = 0;
}

function makeProgressbar() {         //Update der Größe und des angezeigten Prozentwertes im Prozentbalken

    let progressbar = document.getElementById("progressbar");
    let bar = document.getElementById("bar");
    let text = document.getElementById("text");

    let percent = game.percentage;

    let size = window.innerWidth;

    progressbar.style.width = size * 0.3;
    progressbar.style.height = size * 0.02;
    progressbar.style.marginLeft = (size - size * 0.3) / 2;
    progressbar.style.marginTop = size * 0.02;

    text.style.width = size * 0.3 * (percent / 100);

    if (text.style.width < 100) {
        text.style.width = 100;
    }

    text.style.height = size * 0.02;
    text.style.lineHeight = (size * 0.02) + "px";
    text.innerHTML = percent + "% &emsp;";

    bar.style.width = size * 0.3 * (percent / 100);
    bar.style.height = size * 0.02;

    if (progressbar.style.height < 50) {
        progressbar.style.height = 50;

        text.style.height = 50;
        text.style.lineHeight = 50 + "px";

        bar.style.height = 50;
    }
}