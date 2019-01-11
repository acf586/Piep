class ChickenMoveState {
    
    constructor(game) {
        this.game = game;
    }

    run(){
        displayListener(this.game.listenerPositionField);
        
        this.game.setRandomChickenPosition();

        play3DSound(0,this.game.chickenCurrentPosition, this.game.listenerPositionField);
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