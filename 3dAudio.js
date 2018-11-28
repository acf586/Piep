var audioContext = new AudioContext();
var sound = new Audio("Sounds/chirp.wav");

//var sound = new Audio();
var mediaElementAudioSource = audioContext.createMediaElementSource(sound);
sound.loop = false;


// Da unsere Umgebungsgeräscueh quasi Outdoor dargestellt werden, hat sich herausgestellt, das wir kein Raummodell benötigen. Dieses beeinflusst den Sound in unserem Fall negativ;

var resonanceAudioScene = new ResonanceAudio(audioContext,{
    ambisonicOrder: 3
});

var source = resonanceAudioScene.createSource();

mediaElementAudioSource.connect(source.input);

resonanceAudioScene.output.connect(audioContext.destination);

source.setPosition(0, 0, 0);
resonanceAudioScene.setListenerPosition(0 , 0, 0);


//source.setOrientation(0, 0, 1, 0, 1, 0);
source.setOrientation(0, 1, 0, 0, 0, 1);

resonanceAudioScene.setListenerOrientation(0, 1, 0, 0, 0, 1);

function play3DSound(sourcePosition, listenerPosition){
    
    sourceCoordinates = sourcePosition.split("");
    listenerCoordinates = listenerPosition.split("");

    
    console.log("play3DSound");
    console.log("   original: Source: "+sourceCoordinates+" Listener: "+listenerCoordinates);

        sourceCoordinates[0] = transformCoordinatesToAudioField( sourceCoordinates[0] );
        sourceCoordinates[1] = transformCoordinatesToAudioField( sourceCoordinates[1] );
    
        listenerCoordinates[0] = transformCoordinatesToAudioField( listenerCoordinates[0] );
        listenerCoordinates[1] = transformCoordinatesToAudioField( listenerCoordinates[1] );

        
    console.log("transformed: Source: "+sourceCoordinates+" Listner: "+listenerCoordinates);

    source.setPosition(sourceCoordinates[0] , 0.0, sourceCoordinates[1]);

    resonanceAudioScene.setListenerPosition(listenerCoordinates[0], 0.0, listenerCoordinates[1]);

    sound.play();

}

function transformCoordinatesToAudioField(coordinate){
    let audioFieldCoordinate = (coordinate - (numberOfFieldsInXdirection-1) / 2) * audioDistanceBetweenFields;
    return audioFieldCoordinate;
}


sound.addEventListener("ended", function (e) {
 
 newGame.actualState.soundPlayingStopped();
});
