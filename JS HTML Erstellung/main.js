window.onload = function(){
    var gameCon = document.getElementById("gameCon");
    
    var game = document.createElement("div");
    game.setAttribute("id", "game");
    
    var gameContainer = document.createElement("div");
    gameContainer.setAttribute("id", "game-container");
    
    var buttonField,
        buttonArray,
        startPressed,
        startButton;
    
    function makeEventListener(){
        buttonArray = document.getElementsByClassName("buttonField");
        for(var i = 0; i < buttonArray.length; i++){
            buttonArray[i].id;
            buttonArray[i].addEventListener('click', function(e){
                if(startPressed){
                    console.log(e.target.id);
                    document.getElementById(e.target.id).style.backgroundColor = "black";    
                }
            });

        }
        startButton = document.getElementById("startButton");
        startPressed = false;
        startButton.addEventListener('click', function(){
            for(var i = 0; i < buttonArray.length; i++){
                buttonArray[i].style.backgroundColor = "white";
            }
            if(!startPressed){
                startButton.innerHTML = "Reset";
                startPressed = true;
            }
        });
        
    }
    
    function createGameField(){
        
       
        
        for(var i = 0; i < 25; i++){
            buttonField = document.createElement("div");
            buttonField.className = "buttonField";
            var fieldId = parseInt(i/5) + "" + i%5;
            buttonField.setAttribute("id", fieldId);
    
            gameContainer.appendChild(buttonField);
        }
        gameCon.appendChild(game);
        game.appendChild(gameContainer);
        
        makeEventListener();        
    }
    
    createGameField();   
}