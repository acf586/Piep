class SuccessState {
    
    constructor(game) {
        this.game = game;
    }

    run(){

        if(this.game.moves > 1){
            displayPoints(this.game.chickenCurrentPosition, this.game.moves);
            this.game.points += this.game.moves;
        }
        else{
            displayPoints(this.game.chickenCurrentPosition, 1);
            this.game.points += 1;
        }
        
        this.game.moves = 4;

        this.game.remainingRounds--;

        play3DSound(2,this.game.chickenCurrentPosition, this.game.chickenCurrentPosition);

    }

    startPressed() {}
    
    fieldPressed(listenerPositionField) {}

    soundPlayingStopped(){
        displayChicken(this.game.chickenCurrentPosition);
        
        if( this.game.remainingRounds<=0 ){
            this.game.nextState();
        }
        
        else{
            setTimeout(() => {
                this.game.setActualState(this.game.chickenMoveState);
            }, 1600);
           
        }
    }

    nextState(){
        this.game.setActualState(this.game.gameOverState);
    }
}