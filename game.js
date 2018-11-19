class Game {

    constructor(rounds) {
        this.rounds = rounds;

        this.startState = new StartState(this);
        this.chickenMoveState = new ChickenMoveState(this);
        this.playerMoveState = new PlayerMoveState(this);
        this.failureState = new FailureState(this);
        this.succesState = new SuccessState(this);
        this.gameOverState = new GameOverState(this);

        this.actualState = this.startState;
    }

    startPressed() {
        this.actualState.startPressed();
    }

    fieldPressed() {
        this.actualState.fieldPressed();
    }
    setActualSate(state) {
        this.actualState = state;
    }
}

class StartState {
    
    constructor(game) {
        console.log("ich bin der Start");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der Start");
        this.game.setActualSate(this.game.chickenMoveState);
    }
    fieldPressed() {
        console.log("ich bin der Start");
    }
    getName(){
        console.log("ich bin der Start");
    }

}

class ChickenMoveState {
    
    constructor(game) {
        console.log("ich bin der ChickenMove");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der ChickenMove");
        this.game.setActualSate(this.game.playerMoveState);
    }
    fieldPressed() {
        console.log("ich bin der ChickenMove");
    }
}

class PlayerMoveState {
    //game;
    constructor(game) {
        console.log("ich bin der PlayerMove");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der PlayerMove");
        this.game.setActualSate(this.game.failureState);
    }
    fieldPressed() {
        console.log("ich bin der PlayerMove");
    }
}

class FailureState {
    
    constructor(game) {
        console.log("ich bin der Failure");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der Failure");
        this.game.setActualSate(this.game.succesState);
    }
    fieldPressed() {
        console.log("ich bin der Failure");
    }
}

class SuccessState {
    
    constructor(game) {
        console.log("ich bin der Success");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der Success");
        this.game.setActualSate(this.game.gameOverState);
    }
    fieldPressed() {
        console.log("ich bin der Success");
    }
}

class GameOverState {
    
    constructor(game) {
        console.log("ich bin der GameOver");
        this.game = game;
    }
    startPressed() {
        console.log("ich bin der GameOver");
        this.game.setActualSate(this.game.startState);
    }
    fieldPressed() {
        console.log("ich bin der GameOver");
    }
}