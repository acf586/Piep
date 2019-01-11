class PlayerMoveState {
    constructor(game) {
        this.game = game;
    }

    run(){}

    startPressed() {}

    fieldPressed(listenerPositionField) {

        if (this.game.listenerPositionField === listenerPositionField) {

            this.game.setActualState(this.game.playHelpSoundState);
        }

        else {
            this.game.moves--;
 
            this.game.setListenerPosition(listenerPositionField);

            displayListener(this.game.listenerPositionField);

            if (this.game.chickenCurrentPosition == this.game.listenerPositionField) {
                this.game.nextState();
            }
            else {
                this.game.setActualState(this.game.failureState);
                //this.game.run();
            }

        }

    }

    soundPlayingStopped(){}

    nextState(){
        this.game.setActualState(this.game.succesState);
    }
}