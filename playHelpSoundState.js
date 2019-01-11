class PlayHelpSoundState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        play3DSound(0, this.game.chickenCurrentPosition, this.game.listenerPositionField);
    }

    startPressed() {}
    fieldPressed(listenerPositionField) {}

    soundPlayingStopped(){
        this.game.nextState(); 
    }

    nextState(){
        this.game.setActualState(this.game.playerMoveState);
    }
}