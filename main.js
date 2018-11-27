var numberOfXFields = 5;

var buttonArray = null;

var gameFieldWidth;
var gameFieldHeight;

var xDelta;
var yDelta;

var positionArray;

var gameContainer,
    menu,
    control;

var startScreen = false;
var gameOverScreen = false;

window.onload = function () {
    newGame = new Game(5);

    initializeWebsite();

    //initializeStartButton();

    fieldButtonsAddEventListener();

    //createTestButtons();
    
}

function initializeWebsite(){

    document.body.style.backgroundImage = "url('Assets/Background.png')";

    createGameField();

    showScreen();

    updateSize();

    initializePositionArray();
}

function showScreen(){
    
    console.log("hfdkjsfhas");
    var marginOld = parseFloat(document.getElementById("gameContainer").style.marginTop);
    marginOld *= (-1);

    var overlay = document.getElementById("overlay");
    var button = document.getElementById("overlay_button");

    if(startScreen){
        overlay.display = "block";
        document.getElementById("gameContainer").display = "none";
    }

    overlay.style.marginTop = marginOld;
    
    button.style.backgroundImage = "url('Assets/Player.png')";
    button.style.border = "none";
    
    overlay.style.marginTop = 0;
    button.style.marginTop = (window.innerHeight - button.clientHeight) / 2;
    if(!startScreen){
        button.addEventListener('click', function (e){
        button.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        startScreen = true;
        
        newGame.startPressed();
        document.getElementById("gameContainer").style.display = "block";
            
        setTimeout(function () {
            overlay.style.display = "none";
            overlay.style.animationName = "";
            button.style.animationName = "buttonPuls";
            }, 1000)
        });
    }
    
    else{
        var pointField = document.getElementById("overlay_points");
        pointField.style.display = "block";
        pointField.innerHTML = getPercentage()  + "%";
    }
      
}

/*function createGameOverScreen(highscore){
    
    var marginOld = parseFloat(document.getElementById("gameContainer").style.marginTop);
    marginOld *= (-1);
    
    gameOverScreen = true;
    
    var overlay = document.createElement("div");
    var button = document.createElement("div");
    var pointTextField = document.createElement("div");
    var overlayWrap = document.createElement("div");
    
    overlay.setAttribute("id", "overlay")
    button.setAttribute("id", "overlay_button");
    pointTextField.setAttribute("id", "overlay_textfield");
    overlayWrap.setAttribute("id", "overlay_wrapper");
    
    overlayWrap.appendChild(pointTextField);
    overlayWrap.appendChild(button);
    overlay.appendChild(overlayWrap);
    document.getElementById("wrapper").appendChild(overlay);
    
    overlay = document.getElementById("overlay");
    overlayWrap = document.getElementById("overlay_wrapper");
    gameOverButton = document.getElementById("overlay_button");
    pointTextField = document.getElementById("overlay_textfield");
    
    
    overlay.style.marginTop = marginOld;
    
    gameOverButton.innerHTML = "Restart";
    
    var pointString = "Punkte: " + highscore;
    pointTextField.innerHTML = pointString;
    
    
    
    gameOverButton.addEventListener('click', function (e){
        gameOverButton.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        newGame.startPressed();
        setTimeout(function () {
            overlay.remove();
            gameOverScreen = false;
            }, 1000)
    });
    
    updateSize();
    
}*/

function getPercentage(){
    //TODO
}


function getLengthOfText(text){
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = text;
    return ruler.offsetWidth;
}

function createGameField() {

    for (var i = 0; i < numberOfXFields * numberOfXFields; i++) {
        fieldButton = document.createElement("div");
        fieldButton.className = "fieldButton";
        var fieldId = i % numberOfXFields +""+ parseInt(i / numberOfXFields);
        fieldButton.setAttribute("id", fieldId);
        document.getElementById("game-grid").appendChild(fieldButton);

    }
    buttonArray = document.getElementsByClassName("fieldButton");

}

function updateSize() {
    gameContainer = document.getElementById("gameContainer");
    menu = document.getElementById("menu");
    control = document.getElementById("controlContainer");
    gameContainer = document.getElementById("gameContainer");

    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    var margin = 0;
    
    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        gameContainer.style.height = winWidth / 2;
        gameContainer.style.width = winWidth / 2;

        margin = (winHeight - winWidth / 2) / 2;
        gameContainer.style.marginTop = margin;
        gameContainer.style.marginLeft = (winWidth - winWidth / 2) / 2;
        
        
        var button = document.getElementById("overlay_button");
        
        button.style.height = winWidth * 0.2; 
        button.style.width = winWidth * 0.2;
        button.style.marginTop = (winHeight-winWidth * 0.2) / 2;
        
        document.getElementById("overlay").style.marginTop = 0;
    }

    if (winHeight < winWidth / 2) {
        gameContainer.style.height = winHeight - winHeight * 0.05;
        gameContainer.style.width = winHeight - winHeight * 0.05;;

        margin = 0 + winHeight * 0.025;
        gameContainer.style.marginTop = margin;
        gameContainer.style.marginLeft = (winWidth - winHeight) / 2;
        
        var button = document.getElementById("overlay_button");

        button.style.height = winHeight * 0.4; 
        button.style.width = winHeight * 0.4;
        button.style.marginTop = (winHeight - winHeight * 0.4) / 2;
        button.style.lineHeight = (winHeight * 0.4) + "px";

        document.getElementById("overlay").style.marginTop = 0;
    }    
}

//benutzen wir noch gar nicht
function initializePositionArray() {
    positionArray = new Array(5);
    for (var i = 0; i < 5; i++) {
        positionArray[i] = new Array(5);
    }
    var actualField;
    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 5; x++) {
            actualField = document.getElementById(x + "" + y);
            //wird aktuell noch nicht benutzt
            positionArray[x][y] = [actualField.offsetTop + actualField.clientHeight / 2, actualField.offsetLeft + actualField.clientWidth / 2];
        }
    }
}

function resetGameField() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundImage = "url('Assets/Button.png')";
        buttonArray[i].style.border = "none";
        /* buttonArray[i].style.backgroundColor = "transparent";
        buttonArray[i].style.backgroundImage = "none";
        buttonArray[i].style.borderColor = "black";
        buttonArray[i].style.border = "2px solid"; */
    }
}

function initializeStartButton() {
    document.getElementById("startButton").addEventListener('click', function () {
        newGame.startPressed();
    });
}

function fieldButtonsAddEventListener() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function (e) {
                var listenerPositionField = e.target.id;
                console.log(listenerPositionField);
                newGame.fieldPressed(listenerPositionField);
        });

    }
}

function createTestButtons(){

    document.getElementById("switchChickenPosition").addEventListener('click', function (e) {
        switchChickenPositionNumberOfTimes(10);
    });

    document.getElementById("runAround").addEventListener('click', function (e) {
        runArroundField();
    });

    document.getElementById("nextState").addEventListener('click', function (e) {
        newGame.nextState();
    });

}

window.onresize = function () {
    updateSize();
    initializePositionArray();
}
function displayGame(chickenField, listenerField){
    resetGameField();
    displayChicken(chickenField);
    displayListener(listenerField);
}

function displayChicken(chickenField) {
    console.log(chickenField);
    document.getElementById(chickenField).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(chickenField).style.border = "none";
}

function displayListener(listenerField) {
    document.getElementById(listenerField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(listenerField).style.border = "none";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function runArroundField() {
    chickenPositionEndField = "41";
    var x = 3;
    var xFinal = 1;
    var y = 4;
    for (let i = 0; i < 15; i++) {
        setTimeout(function () {
            if (i == 1 || i == 14) {
                x++;
            }
            if (i > 1 && i < 6) {
                y--;
            }
            if (i > 5 && i < 10) {
                x--;
            }
            if (i > 9 && i < 14) {
                y++;
            }
            chickenCurrentPosition = y + "" + x;
            resetGameField();
            displayChicken();
        }, 200 * i + 2)

    }
}

function switchChickenPositionNumberOfTimes(number) {
    chickenCurrentPosition = ""
    for (let i = 0; i < number; i++) {
        setTimeout(function () {
            
            newGame.setRandomChickenPosition();

        }, 400 * i)

    }

}

function moveChicken(startPosition, EndPosition) {
    playSound(chickenCurrentPosition);
}

function playSound(position) {

}
