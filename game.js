class Game {

    constructor(rounds) {
        this.rounds = rounds;

        this.chickenCurrentPosition=43;
        this.chickenPositionEndField;
        this.listenerPositionField=42;

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

    setListenerPosition(newPosition) {
        this.listenerPositionField = newPosition;
    }
    
    
    setChickenPosition(newPosition) {
        this.chickenCurrentPosition = newPosition;
    }

    setRandomChickenPosition(){
        var finsihed = false;
        while(!finsihed){
            xIndex = (int)(Math.random()*numberOfXFields);
            yIndex = (int)(Math.random()*numberOfXFields);
            this.chickenCurrentPosition = xIndex + yIndex;
            if( chickenCurrentPosition === listenerPositionField ){
                finsihed=true;
            }
        }
    }
}

class StartState {
    
    constructor(game) {
        this.game = game;
    }

    startPressed() {
        console.log("ich bin der Start");
        this.game.setListenerPosition(42);
        this.game.setChickenPosition(43);
        resetGameField();
        
        //while(chickenCurrentPosition!=chickenPositionEndField){
            
        //}

        this.game.setActualSate(this.game.chickenMoveState);
    }
    fieldPressed() {
        console.log("ich bin der Start");
    }

}

class ChickenMoveState {
    
    constructor(game) {
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
    constructor(game) {
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