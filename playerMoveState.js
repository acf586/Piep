class PlayerMoveState {
    constructor(game) {
        this.game = game;
    }

    run(){}

    startPressed() {}

    fieldPressed(listenerPosition) {

        if (this.game.listenerPosition === listenerPosition) {

            this.game.setActualState(this.game.playHelpSoundState);
        }

        else {
            this.game.moves--;
 
            this.game.setListenerPosition(listenerPosition);

            this.game.displayListener();

            if (this.game.chickenPosition == this.game.listenerPosition) {
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