class StartState {
    
    constructor(game) {
        this.game = game;
    }

    startPressed() {
        this.game.remainingRounds = this.game.howManyRounds;

        this.game.points = 0;
        this.game.moves = 4;

        this.game.setListenerPosition("12");
        this.game.setChickenPosition("11");

        displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
        this.game.setRandomChickenPosition();
        displayGame(this.game.chickenCurrentPosition,this.game.listenerPositionField);

        this.howManySoundsHaveBeenPlayed = 0;
        play3DSound(0,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);
    }
    
    fieldPressed(listenerPositionField) {}

    soundPlayingStopped() {
        if (this.howManySoundsHaveBeenPlayed < 2) {

            this.howManySoundsHaveBeenPlayed++;

            this.game.setRandomChickenPosition();

            displayGame(this.game.chickenCurrentPosition,this.game.listenerPositionField);

            play3DSound(0, this.game.chickenCurrentPosition, this.game.listenerPositionField);
        }
        else {
            setTimeout(() => {       
                this.nextState();
            }, 800);
        }
    }

    nextState(){
        this.game.setActualState(this.game.chickenMoveState);
        this.game.actualState.run();
    }

}