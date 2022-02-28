const audioElement = document.querySelector('audio');

/** Audio file start & stop button event listener */
const startAudioFileRecord = document.querySelector('#startMediaRecord');
const stopAudioFileRecord = document.querySelector('#stopMediaRecord');

/** Microphone sound record, start & stop button event listener */
const startMicRecord = document.querySelector('#startMicRecord');
const stopMicRecord = document.querySelector('#stopMicRecord');

/** start & stop button for recording */
const startRecord = document.querySelector('#startRecord');
const stopRecord = document.querySelector('#stopRecord');

let audioFileStream = null;

let micStream = null;

let audioContext = null;

/** Destination strema which is going to be recorded ultimately */


let mediaRecorder = null;

let streamToRecord = null;

const getAudioContext = ()=>{
    if(audioContext == null) {
        audioContext = new AudioContext();
    }
    return audioContext;
}

const getDestinationStream = () =>{
    if(streamToRecord == null){
        streamToRecord = getAudioContext().createMediaStreamDestination();
    }
    return streamToRecord;
}

startAudioFileRecord.addEventListener('click',async (event)=>{

    const context = getAudioContext();
    audioFileStream = audioElement.captureStream(); // get the audio file stream

    const audioStreamSource = context.createMediaStreamSource(audioFileStream);
    const destinationStream = getDestinationStream();

    const audioGain = audioContext.createGain();
    audioGain.gain.value = 0.7;
    audioStreamSource.connect(audioGain).connect(destinationStream);


    //startRecording(destinationStream.stream);
    
    audioElement.play();
})

stopAudioFileRecord.addEventListener('click',(event)=>{
    audioElement.pause();
    if(audioFileStream != null){
        audioFileStream.getTracks().forEach(track => track.stop());
    }

    
})

startMicRecord.addEventListener('click',(event)=>{
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      })
      .then(async(stream)=>{
        /** get audio context, if not exist get a new one  */
        const context = getAudioContext();

        micStream = context.createMediaStreamSource(stream); /** create source audio context stream  */
        const destinationStream = getDestinationStream(); /** get destination audio context stream, if not exist get a new one  */
        
        const micGain = context.createGain();
        micGain.gain.value = 1.7;
        micStream.connect(micGain).connect(destinationStream);
      })
      .catch(async(error)=>{
          console.log('error happened when trying to get microphone, error = ', error.toString());
      })
})

stopMicRecord.addEventListener('click',(event)=>{
    if(micStream != null){
        micStream.mediaStream.getTracks().forEach(track => track.stop());
    }
})

startRecord.addEventListener('click',async (event)=>{
    
    //const destinationVideoStream = await navigator.mediaDevices.getUserMedia({video:false,audio:true})
    

    //const destinationStream = await new MediaStream([...destinationVideoStream.getTracks(),...getDestinationStream().stream.getTracks()]) ;
    const destinationStream = await new MediaStream([...getDestinationStream().stream.getTracks()]) ;
    console.log('inside start record = ', destinationStream);
    startRecording(destinationStream);
})

stopRecord.addEventListener('click',(event)=>{
    mediaRecorder.stop();
})

const startRecording = async (stream) => {
    console.log('inside start recording , stream = ', stream.getTracks().length);

    let chunks = [];
    //let options = {mimeType: 'audio/webm;codecs=opus'};
    let options = {mimeType: 'video/webm; codecs=vp9'};
    mediaRecorder = new MediaRecorder(stream,options);

    mediaRecorder.onerror = function (error) {
        console.log('error occuerd in recordign ', error);
    };

    mediaRecorder.ondataavailable = function (event) {
        // deal with your stream
        chunks.push(event.data);
        console.log('ondataavailable , ', chunks);
        
    };

    mediaRecorder.start(15000);
    mediaRecorder.requestData();
    //mediaRecorder.start();
    console.log('media recorder state = ', mediaRecorder.state);

    mediaRecorder.onstop = function (e) {
        stream.getVideoTracks().forEach(track => track.stop());

        console.log('inside mediarecorder onstop');
        
         //var recordedBlob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        let recordedBlob = new Blob(chunks, { type: 'video/webm' });
        // console.log('blob ', blob);

        //let recordedBlob = new Blob(chunks, { type: "video/webm" });
        //recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = URL.createObjectURL(recordedBlob);
        downloadButton.download = "RecordedVideo.webm";


        //chunks = [];

        // var reader = new FileReader();
        // reader.onload = () => {

        //     var buffer = Buffer.from(reader.result);
        //     console.log('buffer load  = ', buffer);
        //     ipcRenderer.send('save-recording-buffer', { buffer: buffer, filePath: `test.webm` });

        // }

        // reader.readAsArrayBuffer(blob);

    }
}