var numberOfFieldsInXdirection = 3;
var numberOfFieldsInZdirection = 3;
//2
var audioDistanceBetweenFields = 2;

var buttonArray = null;

var gameContainer,
    menu,
    control;

//reicht hier vielleicht ein bool Variable, da beide voneinander abhängig
var startScreen = false;

var uebergabe = 0;
var rounds = 0;
window.onload = function () {
    newGame = new Game(5);
    rounds = 5;

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

}

function createGameField() {

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

/*
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
*/

function makeSize(gCSize, gCMarginTop, gCMarginLeft, buttonSize, buttonMargin, pointMargin){
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

/*function showPercentage(size){
    
    
    var percentage = parseInt(getPercentage());  //TODO
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var circle = document.getElementById("percentage");
    
    var pointField = document.getElementById("overlay_points");
    
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
    
    if(percentage < 50){
        
        right.style.borderColor = "rgb(200,200,200)";
        left.style.borderColor = "rgb(150,150,150)";
    }
    
    else{
        
        right.style.borderColor = "rgb(116,141,200)";
        left.style.borderColor = "rgb(196,116,248)";

        if(percentage == 100){
            left.style.borderColor = "rgb(116,141,200)";

        }
                
    }
    right.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
    left.style.clip = "rect(" + 0 + "px " + (size/2+5) + "px " + (size+30) + "px " + 0 + "px)";
        
    right.style.transform = "rotate(" + (180 + (percentage % 50) * 3.6) + "deg)";
    
}*/

function makeProgressbar(){
    
    var progressbar = document.getElementById("progressbar");
    var bar = document.getElementById("bar");
    var text = document.getElementById("text");
    var percent = getUebergabe();
    var size = window.innerWidth;
    
    progressbar.style.width = size * 0.8;
    progressbar.style.height = size * 0.03;
    progressbar.style.marginLeft = (size - size * 0.8) / 2;
    progressbar.style.marginTop = size * 0.02;    
    
    text.style.width = size * 0.8;
    text.style.height = size * 0.03;
    text.style.lineHeight = (size * 0.03) + "px";
    text.innerHTML = percent + "%";
    
    
    bar.style.width = size * 0.8 * (uebergabe / 100);
    bar.style.height = size * 0.03;
    
    if(progressbar.style.height < 50){
        progressbar.style.height = 50;
        
        text.style.height = 50;
        text.style.lineHeight = 50 + "px";
        
        bar.style.height = 50;
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
/*
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
*/

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
                console.log("ActionListener listener listenerPositionField: "+listenerPositionField);
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
}

function resetGameField() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundImage = "url('Assets/Button.png')";
        buttonArray[i].style.border = "none";
        buttonArray[i].innerHTML = "";
    }
}

function displayGame(chickenField, listenerField){
    resetGameField();

    document.getElementById(chickenField).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(chickenField).style.border = "none";
    
    document.getElementById(listenerField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(listenerField).style.border = "none";
}

function displayChicken(chickenField) {
    resetGameField();
    document.getElementById(chickenField).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(chickenField).style.border = "none";
}

function displayListener(listenerField) {
    resetGameField();
    document.getElementById(listenerField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(listenerField).style.border = "none";
}

/*function runArroundField() {
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
        }, 200 * i + 2);

    }
}

function switchChickenPositionNumberOfTimes(number) {
    chickenCurrentPosition = ""
    for (let i = 0; i < number; i++) {
        setTimeout(function () {
            
            newGame.setRandomChickenPosition();

        }, 400 * i)*/

function displayPoints(chickenField, points) {
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

function runProgressbar(){
    for (let i = 0; i <= 100; i++) {
        setTimeout(function () {
            uebergabe = i;
			makeProgressbar();
        }, 100 * i + 2);
    }
}