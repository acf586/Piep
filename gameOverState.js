class GameOverState {
    
    constructor(game) {
        this.game = game;
    }

    run(){

        this.game.percentage = parseInt( (this.game.points / (this.game.howManyRounds * 3) )*100);

        showGameOverOrStartScreen();

        this.nextState();
    }

    startPressed() {}

    fieldPressed(listenerPositionField) {}

    soundPlayingStopped(){}

    nextState(){
        this.game.setActualState(this.game.startState);
    }
}