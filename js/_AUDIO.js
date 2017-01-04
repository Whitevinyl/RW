
var audioPlayer, audioMeter, audioAnalyser, audioLevel, audioMax, audioMin, peakStrength;
var audioHasLoaded = false;
var audioIsPlaying = false;
var frequencies = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var peaks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var mids, highs, meter, meterSize;

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------


function setupAudio() {

    // MASTER VOL //
    Tone.Master.volume.value = -3;


    // SETUP AUDIO PLAYER //
    audioPlayer = new Tone.Player();
    audioPlayer.load("audio/lom.mp3",function() {
        audioLoaded();
    });


    // SETUP METER //
    audioMeter = new Tone.Meter('level',0.9);
    audioLevel = 0;
    audioMax = 0;
    audioMin = 100;
    peakStrength = 0;
    meter = 0;

    audioAnalyser = new Tone.Analyser('fft',16);
    mids = 0;
    highs = 0;


    // CONNECTIONS //
    audioPlayer.connect(audioMeter.input);
    audioPlayer.connect(audioAnalyser.input);
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


        frequencies = audioAnalyser.analyse();

        for (var i=0; i<frequencies.length; i++) {
            if (frequencies[i]>peaks[i]) {
                peaks[i] = frequencies[i];
            }
            peaks[i] *= 0.99;
        }


        var m = audioMeter.value;


        var d = (m-meter)*10;
        if (d>0.1) {
            var h = 1 + (frequencies[8]/100);
            var h2 = 1 + (frequencies[9]/100);
            var h3 = 1 + (frequencies[7]/100);
            var g = (m*d*h*h2*h3)*10;
            var g1 = (m*d*h)*10;

            if (g>1) {
                painter.addVelocity(g/4000);
                //pips.burst(g);
            }
            if (g1>3) {
                painter.burst(g1/15);
            }
        }

        meter = m;

        /*if (meter>0.01) {
            audioLevel = 1 + (meter*0.1);

        }
        if (meter>audioMax) {
            audioMax = meter;
        }
        if (meter>0 && meter<audioMin) {
            audioMin = meter;
        }

        // PEAK LISTEN //
        if (meter>(peakStrength*1.1)) {
            peakStrength = meter;
        }


        // PEAK DECAY //
        if (peakStrength>0.001) {
            peakStrength *= 0.95;
        } else {
            peakStrength = 0;
        }*/


    }
}