
var audioElement, audioPlayer, audioMeter, audioAnalyser, audioLevel, audioMax, audioMin, peakStrength;
var audioHasLoaded = false;
var audioIsPlaying = false;
var frequencies = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var peaks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var mids, highs, meter, meterSize;
var elapsed = 0;

var mode = 0;

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------


function setupAudio() {

    // MASTER VOL //
    Tone.Master.volume.value = -3;
    var context = Tone.context;

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



    // SETUP AUDIO PLAYER //
    var src = "audio/lom_192.mp3";
    var special = "http://umgstore.edgesuite.net/UMC/wakeman/lom_192.mp3";
    //src = special;

    // DOESN'T WORK WITH SAFARI //
    if (mode===0) {
        audioElement = document.getElementById("player");

        audioElement.addEventListener("canplay", function(e) {
            if (!audioHasLoaded) {
                console.log('can play');
                //console.log(e);
                audioLoaded();
            }
        });
        //audioElement.crossOrigin = "anonymous";
        audioElement.src=src;
        audioElement.pause();
        audioPlayer = context.createMediaElementSource(audioElement);
        audioPlayer.connect(audioMeter);
        audioPlayer.connect(audioAnalyser);
        audioPlayer.connect(context.destination);


    }

    // WORKS WITH SAFARI //
    else {
        audioPlayer = new Tone.Player();
        audioPlayer.load(src,function() {
            audioPlayer.connect(audioMeter);
            audioPlayer.connect(audioAnalyser);
            audioPlayer.toMaster();
            audioLoaded();
        });
    }
}


// WHEN AUDIO HAS LOADED //
function audioLoaded() {
    audioHasLoaded = true;
    //startAudio();
}


function stopAudio() {
    console.log('stopped');
    audioIsPlaying = false;
    if (mode===0) {
        audioElement.pause();
    } else {
        audioPlayer.stop();
    }
}

function startAudio() {
    console.log('started');
    audioIsPlaying = true;
    if (mode===0) {
        audioElement.play();
    } else {
        audioPlayer.start();
    }
}

function toggleAudio() {
    if (audioIsPlaying) {
        stopAudio();
    } else {
        startAudio();
    }
}

//-------------------------------------------------------------------------------------------
//  TIMED EVENTS
//-------------------------------------------------------------------------------------------


function audioKeyFrames() {
    if (audioElement) {
        elapsed = Math.round(audioElement.currentTime);
    }


    if (elapsed===12) {
        colorTo(bgFill,20,90,110,1,4); // green
    }

    // RISE //
    if (elapsed===23) {
        colorTo(bgFill,200,150,80,1,3); // gold
    }
    if (elapsed===28) {
        colorTo(bgFill,200,100,110,1,0.7); // rose // hit
    }
    if (elapsed===35) {
        colorTo(bgFill,50,150,210,1,1); // blue
    }


    // CHORUS //
    if (elapsed===42) {
        colorTo(bgFill,170,170,160,1,1); // cream
    }
    if (elapsed===49) {
        colorTo(bgFill,50,50,70,1,1); // dark
    }
    if (elapsed===57) {
        colorTo(bgFill,170,170,160,1,2); // cream
    }


    // FALL //
    if (elapsed===72) {
        colorTo(bgFill,100,70,100,1,1); // purple
    }
    // RISE //
    if (elapsed===79) {
        colorTo(bgFill,200,150,80,1,1); // gold
    }


    // VERSE //
    if (elapsed===93) {
        colorTo(bgFill,30,30,140,1,4); // dk blue
    }


    // RISE //
    if (elapsed===117) {
        colorTo(bgFill,200,150,80,1,3); // gold
    }
    if (elapsed===123) {
        colorTo(bgFill,200,100,110,1,0.8); // rose // hit
    }
    if (elapsed===130) {
        colorTo(bgFill,50,150,210,1,1); // blue
    }


    // CHORUS //
    if (elapsed===137) {
        colorTo(bgFill,170,170,160,1,1); // cream
    }
    if (elapsed===146) {
        colorTo(bgFill,50,50,70,1,1); // dark
    }
    if (elapsed===151) {
        colorTo(bgFill,170,170,160,1,2); // cream
    }
    if (elapsed===161) {
        colorTo(bgFill,100,70,100,1,1); // purple
    }


    // FALL //
    if (elapsed===168) {
        colorTo(bgFill,50,160,210,1,1); // blue
    }
    // RISE //
    if (elapsed===179) {
        colorTo(bgFill,50,160,210,1,1); // blue
    }
    // PEAK //
    if (elapsed===181) {
        colorTo(bgFill,250,175,60,1,3); // gold
    }


    if (elapsed===190) {
        colorTo(bgFill,5,5,7,1,5); // end black
    }
    if (elapsed===195 && !menuOpen) {
        toggleMenu();
    }
}



//-------------------------------------------------------------------------------------------
//  MONITOR
//-------------------------------------------------------------------------------------------


function monitorAudio() {
    if (audioIsPlaying) {


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