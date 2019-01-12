class FailureState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        play3DSound(1,this.game.chickenPosition, this.game.chickenPosition);
    }

    startPressed() {}

    fieldPressed(listenerPosition) {}

    soundPlayingStopped(){
        this.game.nextState(); 
    }

    nextState(){
        this.game.setActualState(this.game.playHelpSoundState);
    }
}