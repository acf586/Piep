class Game {

    constructor(rounds) {
        this.rounds = rounds;
        this.points = 0;
        this.moves = 0;

        this.chickenCurrentPosition;
        this.chickenEndPosition;
        this.listenerPositionField;

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

    fieldPressed(listenerPositionField) {
        this.actualState.fieldPressed(listenerPositionField);
    }
    setActualState(state) {
        this.actualState = state;
    }
    nextState(){
        this.actualState.nextState();
    }

    setListenerPosition(newPosition) {
        this.listenerPositionField = newPosition;
    }
    
    setChickenPosition(newPosition) {
        this.chickenCurrentPosition = newPosition;
    }

    setRandomChickenPosition(){
        var oldPosition = this.chickenCurrentPosition;
        var finsihed = false;
        while(!finsihed){
            let xIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            let yIndex = (Math.random() * (numberOfFieldsInXdirection - 1)).toFixed(0);
            this.chickenCurrentPosition = xIndex + yIndex;
            if( this.chickenCurrentPosition != this.listenerPositionField && oldPosition != this.chickenCurrentPosition){
                finsihed=true;
            }
        }
        displayGame(this.chickenCurrentPosition, this.listenerPositionField);
    }
}

class StartState {
    
    constructor(game) {
        this.game = game;
    }

    startPressed() {
        this.game.rounds=5;
        this.game.points = 0;
        this.game.moves = 4;

        this.howManySoundsHaveBeenPlayed = 0;

        console.log("Du hast Start gedrückt");
        this.game.setListenerPosition("24");
        this.game.setChickenPosition("34");


        displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        //waitSomeSeconds();
        this.game.setRandomChickenPosition();
        displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        console.log("Spiele den Sound ab");

        //play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        //this.nextState();
    }
    
    fieldPressed() {
        console.log("ich bin der Start");
    }

    soundPlayingStopped(){
        console.log("howManySoundsHaveBeenPlayed "+this.howManySoundsHaveBeenPlayed);
        if(this.howManySoundsHaveBeenPlayed < 5){
            console.log("howManySoundsHaveBeenPlayed "+this.howManySoundsHaveBeenPlayed);
            this.howManySoundsHaveBeenPlayed++;
            this.game.setRandomChickenPosition();
            displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
            play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        }
        else{
            this.nextState();
        }
    }

    nextState(){
        this.game.setActualState(this.game.chickenMoveState);
        this.game.actualState.run();
    }

}

class ChickenMoveState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        this.game.setRandomChickenPosition();
        //moveChicken();
        console.log("Chicken is moving and playing 3D sound");
        play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
        
        this.nextState();
    }

    startPressed() {
        console.log("ich bin der ChickenMove");
        
    }

    fieldPressed() {
        console.log("ich bin der ChickenMove");
    }

    nextState(){
        this.game.setActualState(this.game.playerMoveState);
        this.game.actualState.run();

    }

}

class PlayerMoveState {
    constructor(game) {
        this.game = game;
    }

    run(){
        
    }

    startPressed() {
        console.log("ich bin der PlayerMove");
    }

    fieldPressed(listenerPositionField) {
        
        this.game.moves--;
        console.log("Ich bin der Player Move mit "+this.game.moves+" moves");

        this.game.setListenerPosition(listenerPositionField);
        displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
        console.log("Chicken: "+this.game.chickenCurrentPosition+" Listener: "+this.game.listenerPositionField);

        //play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);

        if(this.game.chickenCurrentPosition==this.game.listenerPositionField){
            this.nextState();
        }
        else{
            this.game.setActualState(this.game.failureState);
            this.game.actualState.run();
        }
        
    }
    soundPlayingStopped(){
        console.log("Sound zu Ende");
    }

    nextState(){
        this.game.setActualState(this.game.succesState);
        this.game.actualState.run();
    }
}

class FailureState {
    
    constructor(game) {
        this.game = game;
        this.secondSoundPlayed = false;
    }
    run(){
        console.log("ich bin der Failure");
        this.secondSoundPlayed = false;

        console.log("spiele FehlerSound");
        //ToDo play Failure Sound
        play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
    }

    startPressed() {
        console.log("ich bin der Failure");
    }
    fieldPressed() {
        console.log("ich bin der Failure");
    }

    soundPlayingStopped(){
        console.log("Sound zu Ende. secondSoundPlayed: "+this.secondSoundPlayed);

        if(!this.secondSoundPlayed){
            //playSecondSound
            play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);
            this.secondSoundPlayed = true;
        }
        else{
            this.nextState();
        }
        
    }

    nextState(){
        this.game.setActualState(this.game.playerMoveState);
    }
}

class SuccessState {
    
    constructor(game) {
        this.game = game;
    }

    run(){
        console.log("ich bin der Success");
        
        //playSound(Success)
        console.log("Success Sound");

        
        if(this.game.moves > 1){
            this.game.points += this.game.moves;
        }
        else{
            this.game.points += 1;
        }
        
        this.game.moves = 4;

        console.log("Punkte: "+ this.game.points);

        this.game.rounds--;
        console.log("restliche Runden "+this.game.rounds);
        play3DSound(this.game.chickenCurrentPosition, this.game.listenerPositionField);

    }

    startPressed() {
        console.log("ich bin der Success");
        
    }
    fieldPressed() {
        console.log("ich bin der Success");
    }

    soundPlayingStopped(){
        if( this.game.rounds<=0 ){
            this.game.setActualState(this.game.gameOverState);
            this.game.actualState.run();
        }
        
        else{
            this.game.setActualState(this.game.chickenMoveState);
            this.game.actualState.run();
        }
    }

    nextState(){
        this.game.setActualState(this.game.gameOverState);
    }
}

class GameOverState {
    
    constructor(game) {
        this.game = game;
    }

    run(){
        console.log("ich bin der GameOver");
        createGameOverScreen(this.game.points);
        this.nextState();
    }

    startPressed() {
        console.log("ich bin der GameOver");
    }

    fieldPressed() {
        console.log("ich bin der GameOver");
    }

    nextState(){
        console.log("gehe zu start")
        this.game.setActualState(this.game.startState);
    }
}