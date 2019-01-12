class SuccessState {
    
    constructor(game) {
        this.game = game;
    }

    run(){

        if(this.game.moves > 1){
            this.game.displayPoints( this.game.moves );
            this.game.points += this.game.moves;
        }
        else{
            this.game.displayPoints(1);
            this.game.points += 1;
        }
        
        this.game.moves = 4;

        this.game.remainingRounds--;

        play3DSound(2,this.game.chickenPosition, this.game.chickenPosition);

    }

    startPressed() {}
    
    fieldPressed(listenerPosition) {}

    soundPlayingStopped(){
        this.game.displayChicken();
        
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