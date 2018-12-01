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
            button.style.animationName = "buttonPuls, fadeOut";
            overlay.style.animationName = "fadeOut";
            document.getElementById("gameContainer").style.animationName = "fadeIn";
            startScreen = true;

            newGame.startPressed();
            document.getElementById("gameContainer").style.display = "block";
            updateSize();

            setTimeout(function () {
                overlay.style.display = "none";
                overlay.style.animationName = "";
                button.style.animationName = "buttonPuls";
                document.getElementById("gameContainer").style.animationName = "fadeIn";
                document.getElementById("gameContainer").style.opacity = 1.0;
                }, 1000);
        });
    }
    
    //else{
        var pointField = document.getElementById("overlay_points");
        pointField.style.display = "block";
    //}
      
}

function getPercentage(){
    //TODO
    return "90";
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

function makeSize(gCSize, gCMarginTop, gCMarginLeft, buttonSize, buttonMargin, pointMargin){
    var gameContainer = document.getElementById("gameContainer");
    var button = document.getElementById("overlay_button");
    var pointField = document.getElementById("overlay_points");
    
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
    
    showPercentage(buttonSize * 0.6);
    
    document.getElementById("overlay").style.marginTop = 0;
}

function showPercentage(size){
    
    
    var percentage = parseInt(getPercentage());  //TODO
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var circle = document.getElementById("percentage");
    
    var pointField = document.getElementById("overlay_points");
    console.log(window.innerHeight);
    
    if(pointField.offsetTop > window.innerHeight * 0.2){
        
        pointField.style.marginTop = -(window.innerHeight - pointField.offsetTop) * 0.8;
        
    }
    
    var offSetLeft = right.offsetLeft;
    var offSetTop = right.offsetTop;
    
    circle.style.height = size;
    circle.style.width = size;
    circle.style.lineHeight = size + "px";
    circle.innerHTML = getPercentage()  + "%";
    
    left.style.height = size;
    left.style.width = size;
    
    right.style.height = size;
    right.style.width = size;
    
    if(percentage <= 50){
        
        right.style.borderColor = "black";
        
        right.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
        left.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
        right.style.transform = "rotate(" + (180 + percentage * 3.6) + "deg)";
        
    }
    
    if(percentage > 50){
        
        right.style.borderColor = "lime";
        left.style.borderColor = "black";
        
        right.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
        left.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
        right.style.transform = "rotate(" + (180 + (percentage - 50) * 3.6) + "deg)";
        
    }
}


function updateSize() {
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    
    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        makeSize(winWidth / 2, (winHeight - winWidth / 2) / 2, (winWidth - winWidth / 2) / 2, winWidth * 0.2, (winHeight-winWidth * 0.2) / 2, winHeight * 0.25);
    }

    if (winHeight < winWidth / 2) {
        makeSize(winHeight - winHeight * 0.05, winHeight * 0.025, (winWidth - winHeight) / 2, winHeight * 0.4, (winHeight - winHeight * 0.4) / 2, winHeight * 0.25);
    }    
}

//benutzen wir noch gar nicht
function initializePositionArray() {
    positionArray = new Array(5);
    for (var i = 0; i < 5; i++) {
        positionArray[i] = new Array(5);
    }
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
