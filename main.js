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

var startScreen = false;
var gameOverScreen = false;

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

    createStartScreen();

    updateSize();

    initializePositionArray();
}

function createStartScreen(){
    
    var marginOld = parseFloat(document.getElementById("wrapper").style.marginTop);
    marginOld *= (-1);
    
    startScreen = true;
    
    var overlay = document.createElement("div");
    var button = document.createElement("div");
    
    overlay.setAttribute("id", "overlay")
    button.setAttribute("id", "overlay_button");
    
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    
    overlay = document.getElementById("overlay");
    startButton = document.getElementById("overlay_button");
    
    overlay.style.marginTop = marginOld;
    
    startButton.innerHTML = "Start";
    
    startButton.addEventListener('click', function (e){
        startButton.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        startScreen = false;
        newGame.startPressed();
        setTimeout(function () {
            overlay.remove();
            }, 2000)
    });
    
}

function createGameOverScreen(){
    
    var marginOld = parseFloat(document.getElementById("wrapper").style.marginTop);
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
    document.body.appendChild(overlay);
    
    overlay = document.getElementById("overlay");
    overlayWrap = document.getElementById("overlayWrap");
    gameOverButton = document.getElementById("overlay_button");
    pointTextField = document.getElementById("overlay_textfield");
    
    
    overlay.style.marginTop = marginOld;
    
    gameOverButton.innerHTML = "Restart";
    pointTextField.innerHTML = "Punkte: ";
    
    
    
    gameOverButton.addEventListener('click', function (e){
        gameOverButton.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        newGame.startPressed();
        setTimeout(function () {
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
        if(startScreen || gameOverScreen){
            var button = document.getElementById("overlay_button");
            
            if(startScreen){
                
                button.style.height = winWidth * 0.2; 
                button.style.width = winWidth * 0.2;
                button.style.marginTop = (winHeight-winWidth * 0.2) / 2;
                button.style.lineHeight = (winWidth * 0.2) + "px";
            
            }
            
            else{
                
                var overlayWrap = document.getElementById("overlay_wrapper");
                var textField = document.getElementById("overlay_textfield");
                console.log(overlayWrap.clientHeight);
                
                button.style.height = winWidth * 0.15; 
                button.style.width = winWidth * 0.15;
                button.style.lineHeight = (winWidth * 0.15) + "px";
            
                textField.style.width = winWidth * 0.2;
                textField.style.height = winWidth * 0.1;
                textField.style.lineHeight = winWidth * 0.1 + "px";
                
                overlayWrap.style.marginTop = (winHeight-overlayWrap.clientHeight) / 2;
                
            }
            
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
        
        if(startScreen || gameOverScreen){
            var button = document.getElementById("overlay_button");
            
            if(startScreen){
                
                button.style.height = winHeight * 0.4; 
                button.style.width = winHeight * 0.4;
                button.style.marginTop = (winHeight - winHeight * 0.4) / 2;
                button.style.lineHeight = (winHeight * 0.4) + "px";
            
            }
            
            else{
                
                var textField = document.getElementById("overlay_textfield");
                var overlayWrap = document.getElementById("overlay_wrapper");
                
                button.style.height = winHeight * 0.3; 
                button.style.width = winHeight * 0.3;
                button.style.lineHeight = (winHeight * 0.3) + "px";
            
                textField.style.width = winHeight * 0.5;
                textField.style.height = winHeight * 0.2;
                textField.style.lineHeight = winHeight * 0.2 + "px";
                
                overlayWrap.style.marginTop = (winHeight - overlayWrap.clientHeight) / 2;
                
                console.log(overlayWrap.clientHeight);
                
            }
            
            
            document.getElementById("overlay").style.marginTop = margin * -1;
        }
    }
    
    /*if(gameOverScreen){
        var startButton = document.getElementById(overlay_button);
        startButton.style.height = 
        startButton.style.width = 
        startButton.style.marginTop =     
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
