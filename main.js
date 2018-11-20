var numberOfXFields = 5;

var buttonArray = null;

var gameFieldWidth;
var gameFieldHeight;

var xDelta;
var yDelta;

var positionArray;

var gameContainer,
    menu,
    control,
    wrapper;

var gameOverScreen = false;
var startet = false;
window.onload = function () {
    initializeWebsite();

    newGame = new Game(5);

    initializeStartButton();

    fieldButtonsAddEventListener();

    createTestButtons();

}

function initializeWebsite(){

    document.body.style.backgroundImage = "url('Assets/Background.png')";

    createGameField();

    updateSize();

    initializePositionArray();
}

function createGameOverScreen(){
    
    var wrapper = document.getElementById("wrapper").style;
    var marginOld = wrapper.marginTop;
    console.log(marginOld);
    
    gameOverScreen = true;
    
    var overlay = document.createElement("div");
    var button = document.createElement("div");
    
    overlay.setAttribute("id", "overlay")
    button.setAttribute("id", "overlay_button");
    
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    
    overlay = document.getElementById("overlay");
    gOButton = document.getElementById("overlay_button");
    
    overlay.style.marginTop = -marginOld;
    
    if(startet){
        gOButton.innerHTML = "Restart";
    }
    else{
        gOButton.innerHTML = "Start";
    }
    gOButton.addEventListener('click', function (e){
        wrapper.display = "block";
        gOButton.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        
        setTimeout(function () {
            wrapper.marginTop = marginOld;
            overlay.remove();
            }, 2000)
    });
    
    
    updateSize();
    
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
    wrapper = document.getElementById("wrapper");

    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    var margin = 0;
    
    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        gameContainer.style.height = winWidth / 2;
        gameContainer.style.width = winWidth / 2;

        menu.style.height = winWidth / 2;
        control.style.height = winWidth / 2;

        margin = (winHeight - winWidth / 2) / 2;
        wrapper.style.marginTop = margin;
        if(gameOverScreen){
            var gOButton = document.getElementById("overlay_button");
            
            gOButton.style.height = winWidth * 0.2; 
            gOButton.style.width = winWidth * 0.2;
            gOButton.style.marginTop = (winHeight-winWidth * 0.2) / 2;
            
            gOButton.style.lineHeight = (winWidth * 0.2) + "px";
            
            document.getElementById("overlay").style.marginTop = margin * -1;
        }
    }

    if (winHeight < winWidth / 2) {
        gameContainer.style.height = winHeight;
        gameContainer.style.width = winHeight;

        menu.style.height = winHeight;
        control.style.height = winHeight;

        margin = 0;
        wrapper.style.marginTop = margin;
        
        if(gameOverScreen){
            var gOButton = document.getElementById("overlay_button");
            
            gOButton.style.height = winHeight * 0.4; 
            gOButton.style.width = winHeight * 0.4;
            gOButton.style.marginTop = (winHeight - winHeight * 0.4) / 2;
            
            gOButton.style.lineHeight = (winHeight * 0.4) + "px";
            
            document.getElementById("overlay").style.marginTop = margin * -1;
        }
    }
    
    /*if(gameOverScreen){
        var gOButton = document.getElementById(overlay_button);
        gOButton.style.height = 
        gOButton.style.width = 
        gOButton.style.marginTop =     
    }*/
    
    
    var height = gameContainer.clientHeight;
    var width = gameContainer.clientWidth;
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
        buttonArray[i].style.backgroundColor = "transparent";
        buttonArray[i].style.backgroundImage = "none";
        buttonArray[i].style.borderColor = "black";
        buttonArray[i].style.border = "2px solid";
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
            //console.log(i + " x: " + x + " y: " + y);
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
