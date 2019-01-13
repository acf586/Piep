class ChickenMoveState {

    constructor(game) {
        this.game = game;
    }

    run() {
        this.game.displayListener();

        this.game.setRandomChickenPosition();

        play3DSound(0, this.game.chickenPosition, this.game.listenerPosition);
    }

    startPressed() { }

    fieldPressed(listenerPosition) { }

    soundPlayingStopped() {
        this.game.nextState();
    }

    nextState() {
        this.game.setActualState(this.game.playerMoveState);
    }


}