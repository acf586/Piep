var buttonArray = null;
var startPressed = false;
var startButton;

var chickenPositionStartField = "43";
var chickenCurrentPosition;
var chickenPositionEndField;

var ListenerPositionField = "42";

var chickenSpeed;
var gameFieldWidth;
var gameFieldHeight;

var xDelta;
var yDelta;

var positionArray;

var game,
    menu,
    control;



window.onload = function () {

    startButton = document.getElementById("startButton");

    document.body.style.backgroundImage = "url('Assets/Background.png')";

    createGameField();

    addEventListener();

    initializeStartButton();

    updateSize();
}

window.onresize = function(){
    updateSize();
}

function resetGameField() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundColor = "transparent";
        buttonArray[i].style.backgroundImage = "none";
        buttonArray[i].style.borderWidth = "2px";
        buttonArray[i].style.borderColor = "black";
        buttonArray[i].style.border = "solid";

    }
    let xIndex = (Math.random() * 4).toFixed(0);
    let yIndex = (Math.random() * 4).toFixed(0);

    console.log(xIndex + yIndex);

    document.getElementById(xIndex + yIndex).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(xIndex + yIndex).style.border = "none";
}

function createGameField() {

    for (var i = 0; i < 25; i++) {
        fieldButton = document.createElement("div");
        fieldButton.className = "fieldButton";
        var fieldId = parseInt(i / 5) + "" + i % 5;
        fieldButton.setAttribute("id", fieldId);

        document.getElementById("game-grid").appendChild(fieldButton);

    }
    buttonArray = document.getElementsByClassName("fieldButton");
}

function addEventListener() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function (e) {
            if (startPressed) {
                document.getElementById(e.target.id).style.backgroundColor = "black";
                console.log(e.target.id);
            }

        });

    }
}


function updateSize(){
    game = document.getElementById("game");
    menu = document.getElementById("menu");
    control = document.getElementById("controlContainer");

    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    
    if(winHeight > winWidth/2 || winHeight == winWidth/2){
        game.style.height = winWidth/2;
        game.style.width = winWidth/2;
        
        menu.style.height = winWidth/2;
        control.style.height = winWidth/2;
        
        startButton.style.marginTop = (winWidth/2) * 0.44;
        startButton.style.lineHeight = startButton.clientHeight * 0.03;
    }
    
    if(winHeight < winWidth/2){
        game.style.height = winHeight;
        game.style.width = winHeight;
        
        menu.style.height = winHeight;
        control.style.height = winHeight;
        
        startButton.style.marginTop = winHeight * 0.44;
        startButton.style.lineHeight = startButton.clientHeight * 0.03;
    }
    
    
    
    var height = game.clientHeight;
    var width = game.clientWidth;
    console.log(winHeight, winWidth/2);
}


function initializeStartButton() {
    startButton.addEventListener('click', function () {
        resetGameField();

        if (!startPressed) {
            startButton.innerHTML = "Reset";
            startPressed = true;
        }
    });
}

function initializepositionArray() {

}

function setRandomChickenPosition() {

}

function setPositionListener() {

}

function displayChicken() {

}
function displayListener() {

}

function runArroundField() {

}

function switchChickenPositionNumberOfTimes(number) {

}

function moveChicken(startPosition, EndPosition) {
    playSound(chickenCurrentPosition);
}

function playSound(position) {

}