var numberOfFieldsInXdirection = 5;
var numberOfFieldsInYdirection = 5;

var audioDistanceBetweenFields = 1;

var buttonArray = null;

var gameFieldWidth;
var gameFieldHeight;

var gameContainer,
    menu,
    control,
    wrapper;

//reicht hier vielleicht ein bool Variable, da beide voneinander abhängig
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

    createStartScreen();

    updateSize();

}

function createGameField() {

    for(let y = numberOfFieldsInYdirection - 1 ; y >= 0 ; y--){
        for(let x = 0; x < numberOfFieldsInXdirection; x++){
        
            fieldButton = document.createElement("div");
        
            fieldButton.className = "fieldButton";
        
            var fieldId = x +""+ y;
        
            fieldButton.setAttribute("id", fieldId);
        
            document.getElementById("game-grid").appendChild(fieldButton);
            
        }
    }

    buttonArray = document.getElementsByClassName("fieldButton");

}

function createStartScreen(){
    
    var marginOld = parseFloat(document.getElementById("wrapper").style.marginTop);
    marginOld *= (-1);
    
    startScreen = true;
    
    var overlay = document.createElement("div");
    var button = document.createElement("div");
    
    overlay.setAttribute("id", "overlay");
    button.setAttribute("id", "overlay_button");
    
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    
    overlay = document.getElementById("overlay");
    startButton = document.getElementById("overlay_button");
    
    overlay.style.marginTop = marginOld;

    startButton.style.backgroundImage = "url('Assets/Player.png')";
    startButton.style.border = "none";
    
    //startButton.innerHTML = "Start";
    
    startButton.addEventListener('click', function (e){
        startButton.style.animationName = "buttonPuls, fadeOut";
        overlay.style.animationName = "fadeOut";
        startScreen = false;

        newGame.startPressed();
        
        setTimeout(function () {
            overlay.remove();
            }, 1000)
    });
    
}

function createGameOverScreen(highscore){
    
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
    
}

function getLengthOfText(text){
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = text;
    return ruler.offsetWidth;
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
                
                button.style.height = winWidth * 0.15; 
                button.style.width = winWidth * 0.15;
                button.style.lineHeight = (winWidth * 0.15) + "px";
            
                textField.style.width = winWidth * 0.2;
                textField.style.height = winWidth * 0.1;
                
                var length = getLengthOfText(textField.innerHTML);
                length += 41;
                
                if(parseFloat(textField.style.width) < length){
                    textField.style.width = length;
                };
                
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
                
                var length = getLengthOfText(textField.innerHTML);
                length += 41;
                
                if(parseFloat(textField.style.width) < length){
                    textField.style.width = length;
                };
                
                textField.style.lineHeight = winHeight * 0.2 + "px";
                
                overlayWrap.style.marginTop = (winHeight - overlayWrap.clientHeight) / 2;
                
            }
            
            document.getElementById("overlay").style.marginTop = margin * -1;
        
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