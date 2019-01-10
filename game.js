class Game {

    constructor(rounds) {
        this.rounds = rounds;
        this.points = 0;
        this.moves = 0;
        this.percentage = 0;

        this.chickenCurrentPosition;
        this.listenerPositionField;

        this.startState = new StartState(this);
        this.chickenMoveState = new ChickenMoveState(this);
        this.playerMoveState = new PlayerMoveState(this);
        this.playHelpSoundState = new PlayHelpSoundState(this);
        this.failureState = new FailureState(this);
        this.succesState = new SuccessState(this);
        this.gameOverState = new GameOverState(this);

        this.actualState = this.startState;
    }

    startPressed() {
        this.actualState.startPressed();
    }

    fieldPressed(listenerPositionField) {
        console.log("Game listener listenerPositionField: "+listenerPositionField);
        this.actualState.fieldPressed(listenerPositionField);
    }

    soundPlayingStopped(){
        this.actualState.soundPlayingStopped();
    }

    setActualState(state) {
        this.actualState = state;
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
    }
    
}

class StartState {
    
    constructor(game) {
        this.game = game;
    }

    startPressed() {
        console.log("startPressed im Start");
        this.game.rounds = 5;

        this.game.points = 0;
        this.game.moves = 4;

        this.game.setListenerPosition("12");
        this.game.setChickenPosition("11");

        displayGame(this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
        this.game.setRandomChickenPosition();
        displayGame(this.game.chickenCurrentPosition,this.game.listenerPositionField);

        this.howManySoundsHaveBeenPlayed = 0;
        play3DSound(0,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);
        
        console.log("Spiele den Sound ab");

    }
    
    fieldPressed(listenerPositionField) {
        console.log("fieldPressed im Start");
    }

    soundPlayingStopped() {
        console.log("soundPlayingStopped im Start");

        console.log("howManySoundsHaveBeenPlayed " + this.howManySoundsHaveBeenPlayed);
        if (this.howManySoundsHaveBeenPlayed < 5) {

            this.howManySoundsHaveBeenPlayed++;

            this.game.setRandomChickenPosition();

            displayGame(this.game.chickenCurrentPosition,this.game.listenerPositionField);

            play3DSound(0, this.game.chickenCurrentPosition, this.game.listenerPositionField);
        }
        else {
            setTimeout(() => {
                
                this.nextState();
            }, 800);
        }
    }

    nextState(){
        console.log("nextState im chickenMove -> gehe zu chickenMove");
        this.game.setActualState(this.game.chickenMoveState);
        this.game.actualState.run();
    }

}

class ChickenMoveState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        displayListener(this.game.listenerPositionField);
        this.game.setRandomChickenPosition();
        console.log("run im ChickenMove");

        play3DSound(0,this.game.chickenCurrentPosition, this.game.listenerPositionField);
    }

    startPressed() {
        console.log("startPressed() im ChickenMove");
        
    }

    fieldPressed(listenerPositionField) {
        console.log("fieldPressed() im ChickenMove");
    }

    soundPlayingStopped(){
        console.log("soundPlayingStopped im ChickenMove");
        this.nextState();
    }

    nextState(){
        console.log("nextState im chickenMove -> gehe zu playerMove");
        this.game.setActualState(this.game.playerMoveState);
    }
   

}

class PlayerMoveState {
    constructor(game) {
        this.game = game;
    }

    run(){
        console.log("run im PlayerMove");
    }

    startPressed() {
        console.log("startPressed im PlayerMove");
    }

    fieldPressed(listenerPositionField) {

        if (this.game.listenerPositionField === listenerPositionField) {
            console.log("fieldPressed im Player Move mit " + this.game.moves + " moves");
            console.log("PlayerMove listener listenerPositionField: " + listenerPositionField);
            
            this.game.setActualState(this.game.playHelpSoundState);
            this.game.actualState.run();
        }
        else {
            this.game.moves--;
            console.log("fieldPressed im Player Move mit " + this.game.moves + " moves");
            console.log("PlayerMove listener listenerPositionField: " + listenerPositionField);
           
            this.game.setListenerPosition(listenerPositionField);

            console.log("this.game.setListenerPosition: " + this.game.listenerPositionField);

            displayListener(this.game.listenerPositionField);

            if (this.game.chickenCurrentPosition == this.game.listenerPositionField) {
                this.nextState();
            }
            else {
                this.game.setActualState(this.game.failureState);
                this.game.actualState.run();
            }

        }

    }

    soundPlayingStopped(){
        console.log("soundPlayingStopped im PlayerMove");
    }

    nextState(){
        console.log("nextState im playerMove -> gehe zu success");
        this.game.setActualState(this.game.succesState);
        this.game.actualState.run();
    }
}

class PlayHelpSoundState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        console.log("playHelpSound");
        play3DSound(0,this.game.chickenCurrentPosition, this.game.listenerPositionField);
        
    }

    startPressed() {
        console.log("startPressed im playHelpSound");
    }
    fieldPressed(listenerPositionField) {
        console.log("fieldPressed im  playHelpSound");
    }

    soundPlayingStopped(){
        console.log("soundPlayingStopped playHelpSound");
        this.nextState(); 
    }

    nextState(){
        console.log("nextState im playHelpSound -> gehe zu PlayerMove");
        this.game.setActualState(this.game.playerMoveState);
    }
}

class FailureState {
    
    constructor(game) {
        this.game = game;
    }
    run(){
        console.log("run im Failure");
        play3DSound(1,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);
        
    }

    startPressed() {
        console.log("startPressed im Failure");
    }
    fieldPressed(listenerPositionField) {
        console.log("fieldPressed im  Failure");
    }

    soundPlayingStopped(){
        console.log("soundPlayingStopped Failure");
        this.nextState(); 
    }

    nextState(){
        this.game.setActualState(this.game.playHelpSoundState);
            this.game.actualState.run();
    }
}

class SuccessState {
    
    constructor(game) {
        this.game = game;
    }

    run(){
        console.log("ich bin der Success");

        if(this.game.moves > 1){
            displayPoints(this.game.chickenCurrentPosition, this.game.moves);
            this.game.points += this.game.moves;
        }
        else{
            displayPoints(this.game.chickenCurrentPosition, 1);
            this.game.points += 1;
        }
        
        this.game.moves = 4;

        console.log("Punkte: "+ this.game.points);

        this.game.rounds--;

        console.log("restliche Runden "+this.game.rounds);

        play3DSound(2,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);

        
    }

    startPressed() {
        console.log("startPressed im Success");
        
    }
    fieldPressed(listenerPositionField) {
        console.log("fieldPressed im Success");
    }

    soundPlayingStopped(){
        displayChicken(this.game.chickenCurrentPosition);
        console.log("soundPlayingStopped im Success");
        if( this.game.rounds<=0 ){
            this.nextState();
        }
        
        else{
            setTimeout(() => {
                this.game.setActualState(this.game.chickenMoveState);
                this.game.actualState.run();
            }, 1600);
           
        }
    }

    nextState(){
        console.log("nextState im Success -> gehe zu GameOver");
        this.game.setActualState(this.game.gameOverState);
        this.game.actualState.run();
    }
}

class GameOverState {
    
    constructor(game) {
        this.game = game;
    }

    run(){

        this.game.percentage = parseInt( (this.game.points / (15) )*100);

        showGameOverOrStartScreen();

        console.log("run im GameOver");

        this.nextState();
    }

    startPressed() {
        console.log("startPressed im GameOver");
    }

    fieldPressed(listenerPositionField) {
        console.log("fieldPressed im GameOver");
    }
    soundPlayingStopped(){
        console.log("Sound zu Ende im GameOver");
    }

    nextState(){
        console.log("nextState im GameOver -> gehe zu start");
        this.game.setActualState(this.game.startState);
    }
}