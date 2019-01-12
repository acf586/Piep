class GameOverState {
    
    constructor(game) {
        this.game = game;
    }

    run(){

        this.game.displayStartScreen();

        this.game.nextState();
    }

    startPressed() {}

    fieldPressed(listenerPosition) {}

    soundPlayingStopped(){}

    nextState(){
        this.game.setActualState(this.game.startState);
    }
}