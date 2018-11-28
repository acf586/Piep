var audioContext = new AudioContext();
var sound1, sound2, sound3 , sound4;

var sourceBuffers = [sound1, sound2, sound3, sound4];

var sounds = ["chirp","failure","success","test"];

for(let i=0; i<4 ;i++){
    getData(i);
}

// Da unsere Umgebungsgeräusche Outdoor dargestellt werden, hat sich herausgestellt, dass wir kein Raummodell benötigen. Dieses beeinflusst den Sound in unserem Fall negativ.

var resonanceAudioScene = new ResonanceAudio(audioContext,{
    ambisonicOrder: 3
});

var source = resonanceAudioScene.createSource();

resonanceAudioScene.output.connect(audioContext.destination);

source.setPosition(0, 0, 0);
resonanceAudioScene.setListenerPosition(0 , 0, 0);

//source.setOrientation(0, 0, 1, 0, 1, 0);
source.setOrientation(0, 1, 0, 0, 0, 1);

resonanceAudioScene.setListenerOrientation(0, 1, 0, 0, 0, 1);

function play3DSound(sound, sourcePosition, listenerPosition){
    
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

    console.log("sound: "+sound+" sourceBuffers: "+sourceBuffers[sound]);

    sourceBuffers[sound].start(0);

    getData(sound);

}

function getData(i) {
    console.log("getData: "+i);
    var request = new XMLHttpRequest();
    request.open('GET',  "/Sounds/" + sounds[i] + ".wav", true);
    request.responseType = 'arraybuffer';
    request.onload = function () {

        console.log("onLoad: "+i);

        var undecodedAudio = request.response;

        audioContext.decodeAudioData(undecodedAudio, function (buffer) {
            sourceBuffers[i] = audioContext.createBufferSource();
            sourceBuffers[i].buffer = buffer;
            sourceBuffers[i].connect(audioContext.destination);

            sourceBuffers[i].addEventListener("ended", function (e) {
                console.log("sound zu Ende");
                newGame.actualState.soundPlayingStopped();
            });
        });
        
    };
    request.send();
}

function transformCoordinatesToAudioField(coordinate){
    let audioFieldCoordinate = (coordinate - (numberOfFieldsInXdirection-1) / 2) * audioDistanceBetweenFields;
    return audioFieldCoordinate;
}

function addBufferEventListener(){
    for (let i = 0; i < 4; i++) {
        sourceBuffers[i].addEventListener("ended", function (e) {
            console.log("sound zu Ende");
            newGame.actualState.soundPlayingStopped();
        });
    }
}