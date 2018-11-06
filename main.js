var buttonArray = null;
var startPressed = false;
var startButton;

window.onload = function(){

startButton = document.getElementById("startButton");
    
document.body.style.backgroundImage = "url('Assets/Background.png')";
    
createGameField();

addEventListener();

initializeStartButton();
   
}

function resetGameField(){
    for(var i = 0; i < buttonArray.length; i++){
        buttonArray[i].style.backgroundColor = "transparent";
        buttonArray[i].style.backgroundImage="none";
        buttonArray[i].style.borderWidth = "2px";
        buttonArray[i].style.borderColor = "black";
        buttonArray[i].style.border = "solid";
        
    }
    let xIndex = (Math.random()*4).toFixed(0);
    let yIndex = (Math.random()*4).toFixed(0);
    
    console.log(xIndex+yIndex);

    document.getElementById(xIndex + yIndex).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(xIndex + yIndex).style.border = "none";
}

function createGameField(){

    for(var i = 0; i < 25; i++){
        fieldButton = document.createElement("div");
        fieldButton.className = "fieldButton";
        var fieldId = parseInt(i/5) + "" + i%5;
        fieldButton.setAttribute("id", fieldId);

        document.getElementById("game-grid").appendChild(fieldButton);
        
    }
    buttonArray = document.getElementsByClassName("fieldButton");
}

function addEventListener(){
    for(var i = 0; i < buttonArray.length; i++){
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function(e){
            if(startPressed){
                document.getElementById(e.target.id).style.backgroundColor = "black";   
                console.log(e.target.id);
            }
               
        });

    }
}

function initializeStartButton(){
    startButton.addEventListener('click', function(){
        resetGameField();

        if(!startPressed){
            startButton.innerHTML = "Reset";
            startPressed = true;
        }
    });
}