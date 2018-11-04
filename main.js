window.onload = function(){
    var buttonArray = document.getElementsByClassName("buttonField");
    for(var i = 0; i < buttonArray.length; i++){
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function(e){
            if(startPressed){
                console.log(e.target.id);
                document.getElementById(e.target.id).style.backgroundColor = "black";    
            }
        });

    }
    
    var startButton = document.getElementById("startButton");
    var startPressed = false;
    startButton.addEventListener('click', function(){
        for(var i = 0; i < buttonArray.length; i++){
            buttonArray[i].style.backgroundColor = "white";
        }
        if(!startPressed){
            startButton.innerHTML = "Reset";
            startPressed = true;
        }
    });
    document.getElementById("game-container").style.backgroundImage = "url('Assets/Background.png')";
    document.getElementById("22").style.backgroundImage = "url('Assets/Player.png')";
}