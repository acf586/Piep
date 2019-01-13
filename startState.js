class StartState {

    constructor(game) {
        this.game = game;
    }
    run() { }

    startPressed() {

        this.game.resetGame();

        this.game.displayGame();

        this.game.setRandomChickenPosition();

        this.game.displayGame();

        this.howManySoundsHaveBeenPlayed = 0;

        play3DSound(0, this.game.chickenPosition, this.game.chickenPosition);
    }

    fieldPressed(listenerPosition) { }

    soundPlayingStopped() {
        if (this.howManySoundsHaveBeenPlayed < 4) {

            this.howManySoundsHaveBeenPlayed++;

            this.game.setRandomChickenPosition();

            this.game.displayGame();

            play3DSound(0, this.game.chickenPosition, this.game.listenerPosition);
        }

        else {
            setTimeout(() => {
                this.game.nextState();
            }, 800);
        }
    }

    nextState() {
        this.game.setActualState(this.game.chickenMoveState);
    }

}