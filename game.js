class Game {

    constructor(howManyRounds) {
        this.howManyRounds = howManyRounds;
        this.remainingRounds;

        this.points = 0;
        this.moves = 0;
        this.percentage = 0;

        this.chickenPosition;
        this.listenerPosition;

        this.startState = new StartState(this);
        this.chickenMoveState = new ChickenMoveState(this);
        this.playerMoveState = new PlayerMoveState(this);
        this.playHelpSoundState = new PlayHelpSoundState(this);
        this.failureState = new FailureState(this);
        this.succesState = new SuccessState(this);
        this.gameOverState = new GameOverState(this);

        this.actualState = this.startState;
    }

    run(){
        this.actualState.run();
    }

    startPressed() {
        this.actualState.startPressed();
    }

    fieldPressed(listenerPosition) {
        this.actualState.fieldPressed(listenerPosition);
    }

    soundPlayingStopped(){
        this.actualState.soundPlayingStopped();
    }

    nextState(){
        this.actualState.nextState();
        //this.run();
    }

    setActualState(state) {
        this.actualState = state;
        this.run();
    }

    resetGame(){

        this.remainingRounds = this.howManyRounds;
        this.points = 0;
        this.moves = 4;

        this.setListenerPosition("12");
        this.setChickenPosition("11");
    }

    setListenerPosition(newPosition) {
        this.listenerPosition = newPosition;
    }
    
    setChickenPosition(newPosition) {
        this.chickenPosition = newPosition;
    }

    setRandomChickenPosition(){
        var oldPosition = this.chickenPosition;
        var finsihed = false;
        while(!finsihed){
            let xIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            let yIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            this.chickenPosition = xIndex + yIndex;
            if( this.chickenPosition != this.listenerPosition && oldPosition != this.chickenPosition){
                finsihed=true;
            }
        }
    }

    resetGameField() {
        let fieldButtonArray = document.getElementsByClassName("fieldButton");

        for (let i = 0; i < fieldButtonArray.length; i++) {
            fieldButtonArray[i].style.backgroundImage = "url('Graphics/Button.png')";
        }
    }

    displayGame(){
        this.resetGameField();

        document.getElementById(this.chickenPosition).style.backgroundImage = "url('Graphics/Player.png')";

        document.getElementById(this.listenerPosition).style.backgroundImage = "url('Graphics/Listener.png')";

    }

    displayListener(){
        this.resetGameField();
        
        document.getElementById(this.listenerPosition).style.backgroundImage = "url('Graphics/Listener.png')";

        //displayListener(this.listenerPosition);
    }

    displayChicken(){
        this.resetGameField();
        
        document.getElementById(this.chickenPosition).style.backgroundImage = "url('Graphics/Player.png')";
        //displayChicken(this.chickenPosition);
    }

    displayPoints(pointsForSuccess) {
        this.resetGameField();

        switch (pointsForSuccess) {
            case 1:
                document.getElementById(this.chickenPosition).style.backgroundImage = "url('Graphics/1.png')";
                break;

            case 2:
                document.getElementById(this.chickenPosition).style.backgroundImage = "url('Graphics/2.png')";
                break;

            case 3:
                document.getElementById(this.chickenPosition).style.backgroundImage = "url('Graphics/3.png')";
                break;

            default:
                break;
        }

        //displayPoints(this.chickenPosition, pointsForSuccess);
    }

    displayStartScreen(){
        this.percentage = parseInt( (this.points / (this.howManyRounds * 3) )*100);

        showStartScreen();
    }
    
    
    
    
}