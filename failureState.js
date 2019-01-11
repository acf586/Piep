class FailureState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        play3DSound(1,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);
    }

    startPressed() {}

    fieldPressed(listenerPositionField) {}

    soundPlayingStopped(){
        this.nextState(); 
    }

    nextState(){
        this.game.setActualState(this.game.playHelpSoundState);
            this.game.actualState.run();
    }
}