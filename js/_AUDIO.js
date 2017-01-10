
var audioElement, audioPlayer, audioMeter, audioEnd, audioAnalyser, audioLevel, audioMax, audioMin, peakStrength;
var audioHasLoaded = false;
var audioIsPlaying = false;
var frequencies = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var peaks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var mids, highs, meter, meterSize;
var elapsed = 0;
var tweened = 0;

var audioMode = 2;

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------


function setupAudio() {

    // MASTER VOL //
    Tone.Transport.bpm.value = 120;
    Tone.Master.volume.value = -3;
    var context = Tone.context;

    audioEnd = new Tone.Volume();
    audioEnd.toMaster();

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
    var special = "http://umgstore.edgesuite.net/UMC/wakeman/lom_96.mp3";
    var home = "http://whitevinyldesign.com/rwlom/audio/lom_96.mp3";
    src = special;
    src = home;

    // AUDIO ELEMENT WITH WEB AUDIO SOURCE //
    if (audioMode===0) {
        audioElement = document.getElementById("player");
        audioElement.addEventListener("canplay", function() {
            if (!audioHasLoaded) {
                console.log('can play');
                audioLoaded();
                audioPlayer = context.createMediaElementSource(audioElement);
                audioPlayer.connect(audioMeter);
                audioPlayer.connect(audioAnalyser);
                audioPlayer.connect(audioEnd);
            }
        });
        //audioElement.crossOrigin = "anonymous";
        audioElement.src=src;
        audioElement.pause();

    }

    // JUST WEB AUDIO CONTEXT  (LOADS WHOLE MP3) //
    else {
        audioPlayer = new Tone.Player();
        audioPlayer.load(src,function() {
            audioPlayer.connect(audioMeter);
            audioPlayer.connect(audioAnalyser);
            audioPlayer.toMaster();
            if (audioMode === 2) {
                audioPlayer.sync();
                audioPlayer.start("0:0:2");
                Tone.Transport.scheduleRepeat(function() {
                    elapsed = parseInt(Tone.Transport.seconds);
                },'2n');
            }
            audioLoaded();
        });
    }

}


// WHEN AUDIO HAS LOADED //
function audioLoaded() {
    audioHasLoaded = true;
}


function stopAudio() {
    console.log('stopped');
    audioIsPlaying = false;
    if (audioMode===0) {
        audioElement.pause();
    }
    if (audioMode===1) {
        audioPlayer.stop();
    }
    if (audioMode===2) {
        Tone.Transport.pause();
    }
}

function startAudio() {
    console.log('started');
    audioIsPlaying = true;
    if (audioMode===0) {
        audioElement.play();
    }
    if (audioMode===1) {
        audioPlayer.start();
    }
    if (audioMode===2) {
        Tone.Transport.start("+0.5");
    }
}

function toggleAudio() {
    if (audioIsPlaying) {
        stopAudio();
    } else {
        startAudio();
    }
}

function replay() {
    endFrame = false;
    elapsed = 0;
    tweened = 0;
    colorTo(bgFill,30,30,140,1,0.5); // dk blue
    colorTo(paints[0],250,50,75,1,1); // red
    colorTo(paints[1],65,50,250,1,1); // blue
    toggleMenu();
    toggleButtonText();
    if (audioMode===2) {
        Tone.Transport.stop("+0");
    }
    setTimeout(function(){
        Tone.Transport.seconds.value = 0;
        startAudio();
    },100);
}

//-------------------------------------------------------------------------------------------
//  TIMED EVENTS
//-------------------------------------------------------------------------------------------


function audioKeyFrames() {
    if (audioElement) {
        elapsed = Math.round(audioElement.currentTime);
    }


    if (elapsed===12 && tweened<elapsed) {
        colorTo(bgFill,40,10,130,1,4); // darker
        tweened = elapsed;
    }

    // RISE //
    if (elapsed===22 && tweened<elapsed) {
        colorTo(bgFill,225,175,80,1,3); // gold
        tweened = elapsed;
    }
    if (elapsed===28 && tweened<elapsed) {
        colorTo(bgFill,215,100,115,1,0.7); // rose // hit
        tweened = elapsed;
    }
    if (elapsed===35 && tweened<elapsed) {
        colorTo(bgFill,50,160,210,1,1); // blue
        colorTo(paints[1],255,180,60,1,1); // yellow
        tweened = elapsed;
    }


    // CHORUS //
    if (elapsed===42 && tweened<elapsed) {
        colorTo(bgFill,170,165,160,1,1); // cream
        tweened = elapsed;
    }
    if (elapsed===49 && tweened<elapsed) {
        colorTo(bgFill,40,40,70,1,1); // dark
        colorTo(paints[1],65,50,250,1,1); // blue
        tweened = elapsed;
    }
    if (elapsed===57 && tweened<elapsed) {
        colorTo(bgFill,170,165,160,1,2); // cream
        tweened = elapsed;
    }


    // FALL //
    if (elapsed===72 && tweened<elapsed) {
        colorTo(bgFill,100,20,110,1,1); // purple
        tweened = elapsed;
    }
    // RISE //
    if (elapsed===79 && tweened<elapsed) {
        colorTo(bgFill,225,170,80,1,1); // gold
        tweened = elapsed;
    }


    // VERSE //
    if (elapsed===92 && tweened<elapsed) {
        colorTo(bgFill,30,30,140,1,3); // dk blue
        tweened = elapsed;
    }


    // RISE //
    if (elapsed===117 && tweened<elapsed) {
        colorTo(bgFill,225,170,80,1,3); // gold
        tweened = elapsed;
    }
    if (elapsed===123 && tweened<elapsed) {
        colorTo(bgFill,210,100,110,1,0.8); // rose // hit
        tweened = elapsed;
    }
    if (elapsed===130 && tweened<elapsed) {
        colorTo(bgFill,50,150,210,1,1); // blue
        colorTo(paints[0],255,180,60,1,1); // yellow
        tweened = elapsed;
    }


    // CHORUS //
    if (elapsed===137 && tweened<elapsed) {
        colorTo(bgFill,170,165,160,1,1); // cream
        tweened = elapsed;
    }
    if (elapsed===146 && tweened<elapsed) {
        colorTo(bgFill,40,40,70,1,1); // dark
        tweened = elapsed;
    }
    if (elapsed===151 && tweened<elapsed) {
        colorTo(bgFill,170,165,160,1,2); // cream
        colorTo(paints[0],250,50,75,1,1); // red
        tweened = elapsed;
    }
    if (elapsed===161 && tweened<elapsed) {
        colorTo(bgFill,100,20,110,1,1); // purple
        tweened = elapsed;
    }


    // FALL //
    if (elapsed===168 && tweened<elapsed) {
        colorTo(bgFill,50,160,210,1,1); // blue
        tweened = elapsed;
    }
    if (elapsed===172 && tweened<elapsed) {
        colorTo(bgFill,40,10,130,1,4); // darker
        tweened = elapsed;
    }

    // RISE //
    if (elapsed===179 && tweened<elapsed) {
        colorTo(bgFill,220,100,120,1,1); // pink
        tweened = elapsed;
    }
    // PEAK //
    if (elapsed===181 && tweened<elapsed) {
        colorTo(bgFill,250,175,60,1,3); // gold
        tweened = elapsed;
    }


    if (elapsed===190 && tweened<elapsed) {
        colorTo(bgFill,5,5,7,1,3); // end black
        tweened = elapsed;
    }
    if (elapsed===195 && tweened<elapsed && !menuOpen) {
        conclusion();
        tweened = elapsed;
    }
}



//-------------------------------------------------------------------------------------------
//  MONITOR
//-------------------------------------------------------------------------------------------


function monitorAudio() {
    if (audioIsPlaying) {

        // frequencies //
        frequencies = audioAnalyser.analyse();

        // level //
        var m = audioMeter.value;

        // custom //
        var d = (m-meter)*10;
        if (d>0.1) {
            var h = 1 + (frequencies[8]/100);
            var h2 = 1 + (frequencies[9]/100);
            var h3 = 1 + (frequencies[7]/100);
            var g = (m*d*h*h2*h3)*10;
            var g1 = (m*d*h)*10;

            if (g>1) {
                painter.addVelocity(g/4000);
            }
            if (g1>3) {
                painter.burst(g1/15);
            }
        }
        meter = m;
    }
}


function extraMonitoring() {

    // peaks //
    for (var i=0; i<frequencies.length; i++) {
        if (frequencies[i]>peaks[i]) {
        peaks[i] = frequencies[i];
        }
        peaks[i] *= 0.99;
    }

    if (meter>0.01) {
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
    }
}