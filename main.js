var buttonArray = document.getElementsByClassName("fieldButton");

window.onload = function(){
    
    
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
        resetGameField();

        if(!startPressed){
            startButton.innerHTML = "Reset";
            startPressed = true;
        }
    });
    document.body.style.backgroundImage = "url('Assets/Background.png')";
   
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