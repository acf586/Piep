var numberOfFieldsInXdirection = 3;
var numberOfFieldsInZdirection = 3;
var audioDistanceBetweenFields = 1;

var buttonArray = null;

var gameContainer;

var startScreen = false;

var uebergabe = 0;
var rounds = 0;

window.onload = function () {           //Erzeugen des Spiel Objekts und Aufruf der Initializierung der Webside wenn alle Daten geladen wurden
    newGame = new Game(5);
    rounds = 5;

    initializeWebsite();

    fieldButtonsAddEventListener();
}

function initializeWebsite(){           //Initializierung der Webside mit Aufruf zur Erzeugung des Spielfelds, zum Anzeigen des Startscreens und zur Anpassung an die Fenstergröße

    document.body.style.backgroundImage = "url('Assets/Background.png')";

    createGameField();

    showScreen();

    updateSize();

}

function createGameField() {            //Erzeugung Spielfeld

    for(let z = 0 ; z < numberOfFieldsInZdirection ; z++){
        for(let x = 0; x < numberOfFieldsInXdirection; x++){
        
            fieldButton = document.createElement("div");
        
            fieldButton.className = "fieldButton";
        
            var fieldId = x +""+ z;
        
            fieldButton.setAttribute("id", fieldId);
        
            document.getElementById("game-grid").appendChild(fieldButton);
            
        }
    }

    buttonArray = document.getElementsByClassName("fieldButton");

}

function showScreen(){                  //Zeigen des Startscreens/Game Over Screens
    
    var gameContainer = document.getElementById("gameContainer");
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    gameContainer.style = "none";
    var button = document.getElementById("overlay_button");

    if(startScreen){
        gameContainer.style.display = "none";
    }


    button.style.backgroundImage = "url('Assets/Player.png')";
    button.style.border = "none";
    
    overlay.style.marginTop = 0;
    button.style.marginTop = (window.innerHeight - button.clientHeight) / 2;
        
    if(!startScreen){
        button.addEventListener('click', function (e){
            button.style.animationName = "buttonPuls, chickenDance, fadeOut";
            overlay.style.animationName = "fadeOut";
            document.getElementById("gameContainer").style.animationName = "fadeIn";
            startScreen = true;

            newGame.startPressed();
            document.getElementById("gameContainer").style.display = "block";

            setTimeout(function () {
                overlay.style.display = "none";
                overlay.style.animationName = "";
                button.style.animationName = "buttonPuls, chickenDance";
                document.getElementById("gameContainer").style.animationName = "fadeIn";
                document.getElementById("gameContainer").style.opacity = 1.0;
                }, 1000);
        });
    }
    
    else{
        var pointField = document.getElementById("overlay_points");
        pointField.style.display = "block";
    }

    updateSize();
  
}

function makeSize(gCSize, gCMarginTop, gCMarginLeft, buttonSize, buttonMargin, pointMargin){        //Funktions zur Größenänderung der Divs
    var gameContainer = document.getElementById("gameContainer");
    var button = document.getElementById("overlay_button");
    var pointField = document.getElementById("overlay_points");
    
    console.log(buttonMargin);
    
    gameContainer.style.height = gCSize;
    gameContainer.style.width = gCSize;

    gameContainer.style.marginTop = gCMarginTop;
    gameContainer.style.marginLeft = gCMarginLeft;
    
    button.style.height = buttonSize; 
    button.style.width = buttonSize;
    button.style.marginTop = buttonMargin;
    console.log(buttonSize / 2);
    
    pointField.marginTop = pointMargin;
    pointField.style.height = parseFloat(buttonSize / 3);
    pointField.style.width = parseFloat(buttonSize / 3);
    pointField.style.lineHeight = parseFloat(buttonSize / 3) + "px";
    
    makeProgressbar();
    
    document.getElementById("overlay").style.marginTop = 0;
}

function makeProgressbar(){         //Update der Größe und des angezeigten Prozentwertes im Prozentbalken
    
    var progressbar = document.getElementById("progressbar");
    var bar = document.getElementById("bar");
    var text = document.getElementById("text");
    var percent = getUebergabe();
    var size = window.innerWidth;
    
    progressbar.style.width = size * 0.3;
    progressbar.style.height = size * 0.02;
    progressbar.style.marginLeft = (size - size * 0.3) / 2;
    progressbar.style.marginTop = size * 0.02;    
    
    text.style.width = size * 0.3 * (uebergabe / 100);

    if(text.style.width < 100){
        text.style.width = 100;
    }

    text.style.height = size * 0.02;
    text.style.lineHeight = (size * 0.02) + "px";
    text.innerHTML = percent + "% &emsp;" ;
    
    
    bar.style.width = size * 0.3 * (uebergabe / 100);
    bar.style.height = size * 0.02;
    
    if(progressbar.style.height < 50){
        progressbar.style.height = 50;
        
        text.style.height = 50;
        text.style.lineHeight = 50 + "px" ;
        
        bar.style.height = 50;
    }
}


function updateSize() {                 //Berechnung zur Größenänderung der Divs und Aufruf der makeSize() Funktion
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    
    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        makeSize(winWidth / 2, (winHeight - winWidth / 2) / 2, (winWidth - winWidth / 2) / 2, winWidth * 0.2, (winHeight-winWidth * 0.2) / 2, winHeight * 0.25);
    }
    if (winHeight < winWidth / 2) {
        makeSize(winHeight - winHeight * 0.05, winHeight * 0.025, (winWidth - winHeight) / 2, winHeight * 0.4, (winHeight - winHeight * 0.4) / 2, winHeight * 0.25);
    }    
}

function initializeStartButton() {      //Start Button Eventlistener geben
    document.getElementById("startButton").addEventListener('click', function () {
        newGame.startPressed();
    });
}

function fieldButtonsAddEventListener() {   //FieldButton Eventlistener geben
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function (e) {
                var listenerPositionField = e.target.id;
                console.log("ActionListener listener listenerPositionField: "+listenerPositionField);
                newGame.fieldPressed(listenerPositionField);
        });

    }
}

window.onresize = function () {         //Bei Fenstergrößenänderung Aufruf der updateSize() Funktion
    updateSize();
}

function resetGameField() {             //Zurücksetzen des Spielfelds
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundImage = "url('Assets/Button.png')";
        buttonArray[i].style.border = "none";
        buttonArray[i].innerHTML = "";
    }
}

function displayGame(chickenField, listenerField){      //Anzeigen des Spielers und des Hühnchens
    resetGameField();

    document.getElementById(chickenField).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(chickenField).style.border = "none";
    
    document.getElementById(listenerField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(listenerField).style.border = "none";
}

function displayChicken(chickenField) {         //Anzeigen des Hühnchens
    resetGameField();
    document.getElementById(chickenField).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(chickenField).style.border = "none";
}

function displayListener(listenerField) {
    resetGameField();
    document.getElementById(listenerField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(listenerField).style.border = "none";
}

function displayPoints(chickenField, points) {          //Anzeige der Punkte beim Finden des Hühnchens
    resetGameField();
    switch (points) {
        case 1:
            document.getElementById(chickenField).style.backgroundImage = "url('Assets/1.png')";
            document.getElementById(chickenField).style.border = "none";
            break;

        case 2:
            document.getElementById(chickenField).style.backgroundImage = "url('Assets/2.png')";
            document.getElementById(chickenField).style.border = "none";
            break;

        case 3:
            document.getElementById(chickenField).style.backgroundImage = "url('Assets/3.png')";
            document.getElementById(chickenField).style.border = "none";
            break;

        default:
            break;
    }

}

function getUebergabe(){
    return uebergabe;
}

function getRounds(){
    return rounds;
}

function setRounds(number){
    rounds = number;
}

function setUebergabe(percent){
    uebergabe = percent;
}

function runProgressbar(){          //Hilfsfunktion zum einmaligen Durchlauf des Prozentbalkens von 0 - 100%
    for (let i = 0; i <= 100; i++) {
        setTimeout(function () {
            uebergabe = i;
			makeProgressbar();
        }, 100 * i + 2);
    }
}