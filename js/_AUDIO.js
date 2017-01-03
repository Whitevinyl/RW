
var audioPlayer, audioMeter, audioLevel, audioMax, audioMin;
var audioHasLoaded = false;
var audioIsPlaying = false;

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------


function setupAudio() {

    // MASTER VOL //
    Tone.Master.volume.value = -18;


    // SETUP AUDIO PLAYER //
    audioPlayer = new Tone.Player();
    audioPlayer.load("audio/track.mp3",function() {
        audioLoaded();
    });


    // SETUP METER //
    audioMeter = new Tone.Meter();
    audioLevel = 0;
    audioMax = 0;
    audioMin = 100;


    // CONNECTIONS //
    audioPlayer.connect(audioMeter.input);
    audioPlayer.toMaster();
}


// WHEN AUDIO HAS LOADED //
function audioLoaded() {
    audioHasLoaded = true;
    startAudio();
}


function stopAudio() {
    console.log('stopped');
    audioIsPlaying = false;
    audioPlayer.stop();
}

function startAudio() {
    console.log('started');
    audioIsPlaying = true;
    audioPlayer.start();
}

//-------------------------------------------------------------------------------------------
//  MONITOR
//-------------------------------------------------------------------------------------------


function monitorAudio() {
    if (audioHasLoaded && audioIsPlaying) {
        var meter = audioMeter.getLevel();
        if (meter>0.01) {
            audioLevel = 1 + (meter*0.1);

        }
        if (meter>audioMax) {
            audioMax = meter;
        }
        if (meter>0 && meter<audioMin) {
            audioMin = meter;
        }
    }
}