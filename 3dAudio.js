var audioContext = new AudioContext();
var sound = new Audio("Sounds/chirp.wav");

//var sound = new Audio();
var mediaElementAudioSource = audioContext.createMediaElementSource(sound);
sound.loop = false;

var dimension = 16;
var dimensions = {width: dimension , height: dimension, depth: dimension};

//Materialenn für alle gleich setzen
/* var materials = {
  left: "brick-bare",
  right: "curtain-heavy",
  front: "marble",
  back: "glass-thin",
  down: "grass",
  up: "transparent"
}; */

var materials = {
    left: "transparent",
    right: "transparent",
    front: "transparent",
    back: "transparent",
    down: "transparent",
    up: "transparent"
};
//TO DO -> Was bedeutet Ambisonic Order
var resonanceAudioScene = new ResonanceAudio(audioContext, {
    ambisonicOrder: 3,
    dimensions: dimensions,
    materials: materials,
});

var source = resonanceAudioScene.createSource();

mediaElementAudioSource.connect(source.input);

resonanceAudioScene.output.connect(audioContext.destination);

source.setPosition(0, 0, 0);
resonanceAudioScene.setListenerPosition(0 , 0, 0);

//TO Do -> Orientation initial setzen
// source.setOrientation(x, y, z, up_x, up_y, up_z);

// resonanceAudioScene.setListenerOrientation(x, y, z, x, y, z);

function play3DSound(sourcePosition, listenerPosition){
    
    sourceCoordinates = sourcePosition.split("");
    listenerCoordinates = listenerPosition.split("");

    console.log("3D Audio: "+sourceCoordinates[0]+" "+sourceCoordinates[1]);
    console.log("3D Audio: "+listenerCoordinates[0]+" "+listenerCoordinates[1]);

        sourceCoordinates[0] = sourceCoordinates[0] * dimension/4 -dimension/2;
        sourceCoordinates[1] = -1 * (sourceCoordinates[1] * dimension/4 -dimension/2);
    
        listenerCoordinates[0] = listenerCoordinates[0] * dimension/4 -dimension/2;
        listenerCoordinates[1] = -1 * (listenerCoordinates[1] * dimension/4 -dimension/2);
    
        console.log("Source: "+sourceCoordinates+"Listner: "+listenerCoordinates);

    source.setPosition(sourceCoordinates[0] , 0.0, sourceCoordinates[1]);
    resonanceAudioScene.setListenerPosition(listenerCoordinates[0], 0.0, listenerCoordinates[1]);

    sound.play();

}


sound.addEventListener("ended", function (e) {
 
 newGame.actualState.soundPlayingStopped();
});
