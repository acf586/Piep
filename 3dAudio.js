var audioContext = new AudioContext();
var sound = new Audio("../sounds/sound.wav");
var mediaElementAudioSource = audioContext.createMediaElementSource(sound);
var isPlaying = false;
var playStopButton = document.getElementById("playStopButton");
sound.loop = true;

var dimensions = {width: 10.1, height: 10.1, depth: 25.1};

var materials = {
  left: "brick-bare",
  right: "curtain-heavy",
  front: "marble",
  back: "glass-thin",
  down: "grass",
  up: "transparent"
};

var resonanceAudioScene = new ResonanceAudio(audioContext, {
    ambisonicOrder: 3,
    dimensions: dimensions,
    materials: materials,
  });

var source = resonanceAudioScene.createSource();

mediaElementAudioSource.connect(source.input);
resonanceAudioScene.output.connect(audioContext.destination);

source.setPosition(4, 3, 25);
resonanceAudioScene.setListenerPosition(1, 1, 2);
// source.setOrientation(x, y, z, up_x, up_y, up_z);
// resonanceAudioScene.setListenerOrientation(x, y, z, x, y, z);











playStopButton.addEventListener("click", function (e) {
  if (isPlaying) {
      sound.pause();
      playStopButton.innerHTML = "Play";
  } else {
      sound.play();
      playStopButton.innerHTML = "Stop";
  }
  isPlaying = !isPlaying;
});

sound.addEventListener("ended", function (e) {
  isPlaying = false;
  playStopButton.innerHTML = "Play";
});