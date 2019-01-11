class Game {

    constructor(howManyRounds) {
        this.howManyRounds = howManyRounds;
        this.remainingRounds;

        this.points = 0;
        this.moves = 0;
        this.percentage = 0;

        this.chickenCurrentPosition;
        this.listenerPositionField;

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

    fieldPressed(listenerPositionField) {
        this.actualState.fieldPressed(listenerPositionField);
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
        this.listenerPositionField = newPosition;
    }
    
    setChickenPosition(newPosition) {
        this.chickenCurrentPosition = newPosition;
    }

    setRandomChickenPosition(){
        var oldPosition = this.chickenCurrentPosition;
        var finsihed = false;
        while(!finsihed){
            let xIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            let yIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            this.chickenCurrentPosition = xIndex + yIndex;
            if( this.chickenCurrentPosition != this.listenerPositionField && oldPosition != this.chickenCurrentPosition){
                finsihed=true;
            }
        }
    }
    
}