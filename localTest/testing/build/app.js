// navigator.mediaDevices.enumerateDevices()
//     .then(gotDevices)
//     .catch((error) => {
//         console.log(error);
//     });

// function gotDevices(deviceInfos) {
//     for (var i = 0; i !== deviceInfos.length; ++i) {
//         var deviceInfo = deviceInfos[i];
//         //var option = document.createElement('option');
//         //option.value = deviceInfo.deviceId;

//         console.log('index = ' , i , ' device info =', deviceInfo);

//         // if (deviceInfo.kind === 'audioinput') {
//         //     option.text = deviceInfo.label || 'Microphone ' + (audioInputSelect.length + 1);
//         //     //audioInputSelect.appendChild(option);
//         // }
//         // else if (deviceInfo.kind === 'audiooutput') {
//         //     option.text = deviceInfo.label || 'Speaker ' +
//         //         (audioOutputSelect.length + 1);
//         //     //audioOutputSelect.appendChild(option);
//         // }
//         // else if (deviceInfo.kind === 'videoinput') {
//         //     option.text = deviceInfo.label || 'Camera ' +
//         //         (videoSelect.length + 1);
//         //     //videoSelect.appendChild(option);
//         // }
//     }
// }

// navigator.mediaDevices.getUserMedia()


/**
 * createing audio context , loading an audio element and playing 
 * using volume control and panning with the sound 
 * connecting multiple nodes in an audio graph
 */
const audioContext = new AudioContext();

const audioElement = document.querySelector('audio');

const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();

const pannerOption = { pan:0}
const panner = new StereoPannerNode(audioContext,pannerOption)

track.connect(gainNode).connect(panner).connect(audioContext.destination);

const playButton = document.querySelector('button');

playButton.addEventListener('click',(event)=>{
    createAudioStream();
})

/** loading a media element from audio element and getting a media stream object from that audio file */

const createAudioStream = async () => {
    const audio = new Audio('test_capture.mp3');
    const audioStream = audio.captureStream();
    audio.play();

    console.log('stream = ', audioStream);

    const audioTracks = await audioStream.getAudioTracks();
    console.log('audio tracks = ', audioTracks);

    
}



// playButton.addEventListener('click',(event)=>{

//     console.log('audio context state = ', audioContext.state);
//     console.log('this.dataset = ', event.currentTarget.getAttribute('data-playing'));

//     let buttonPlayingStatus = event.currentTarget.getAttribute('data-playing'); 

//     if(audioContext.state === 'suspended'){
//         audioContext.resume();
//     }

//     if(buttonPlayingStatus === 'false'){
//         audioElement.play();
//         event.currentTarget.setAttribute('data-playing','true')
//         //buttonPlayingStatus = 'true';
//     }
//     else if(buttonPlayingStatus === 'true'){
//         audioElement.pause();
//         event.currentTarget.setAttribute('data-playing','false')
//         //buttonPlayingStatus = 'false';
//     }
// });

document.querySelector('#volume').addEventListener('input',(event)=>{
    gainNode.gain.value = event.currentTarget.value;
})

document.querySelector('#panner').addEventListener('input',(event)=>{
    panner.pan.value = event.currentTarget.value;
})



// const getDesktopStream = async () =>{
//     const desktopStream = await navigator.mediaDevices.getDisplayMedia({ video:true, audio: true });

//     const audioTracks  = await desktopStream.getAudioTracks();
//     const videoTracks  = await desktopStream.getVideoTracks();
//     console.log('desktop stream = ', desktopStream);

//     console.log('audio tracks = ', audioTracks);
//     console.log('video tracks =', videoTracks)
// }

// getDesktopStream();








