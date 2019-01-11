var audioContext = new AudioContext();
var soundFileNames = ["chirp_neu_09","failure","success","test"];
var sounds = [];

var mediaElementAudioSource = [];

var resonanceAudioScene = new ResonanceAudio(audioContext, {
  });

var source = resonanceAudioScene.createSource();
resonanceAudioScene.output.connect(audioContext.destination);

                      source.setOrientation(0, 0, 1, 0, 1, 0);

resonanceAudioScene.setListenerOrientation(0, 0, -1, 0, 1, 0);



for (let i = 0; i < soundFileNames.length; i++) {
    sounds[i] = new Audio("Sounds/" + soundFileNames[i] + ".wav");
    mediaElementAudioSource[i] = audioContext.createMediaElementSource(sounds[i]);
    sounds[i].loop = false;
    mediaElementAudioSource[i].connect(source.input);

    sounds[i].addEventListener("ended", function (e) {
        newGame.soundPlayingStopped();
    });
}


function play3DSound(theSoundtoBePlayed, sourcePosition, listenerPosition){
    
    setSourceAndListenerPosition(sourcePosition, listenerPosition)

    sounds[theSoundtoBePlayed].play();
}

function setSourceAndListenerPosition(sourcePosition, listenerPosition){
    sourceCoordinates = sourcePosition.split("");
    listenerCoordinates = listenerPosition.split("");

    console.log("   original: Source: "+sourceCoordinates+" Listener: "+listenerCoordinates);

        sourceCoordinates[0] = transformCoordinatesToAudioField( sourceCoordinates[0] );
        sourceCoordinates[1] = transformCoordinatesToAudioField( sourceCoordinates[1] );
    
        listenerCoordinates[0] = transformCoordinatesToAudioField( listenerCoordinates[0] );
        listenerCoordinates[1] = transformCoordinatesToAudioField( listenerCoordinates[1] );

        
    console.log("transformed: Source: "+sourceCoordinates+" Listner: "+listenerCoordinates);
    source.setPosition(sourceCoordinates[0] , 0.0, sourceCoordinates[1]);

    resonanceAudioScene.setListenerPosition(listenerCoordinates[0], 0.0, listenerCoordinates[1]);

}

function transformCoordinatesToAudioField(coordinate){
    let audioFieldCoordinate = (coordinate - (numberOfFieldsInXdirection-1) / 2) * audioDistanceBetweenFields;
    return audioFieldCoordinate;
}