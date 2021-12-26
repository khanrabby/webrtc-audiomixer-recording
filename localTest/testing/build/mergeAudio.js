const audioElement = document.querySelector('audio');

/** Audio file start & stop button event listener */
const startAudioFileRecord = document.querySelector('#startMediaRecord');
const stopAudioFileRecord = document.querySelector('#stopMediaRecord');

/** Microphone sound record, start & stop button event listener */
const startMicRecord = document.querySelector('#startMicRecord');
const stopMicRecord = document.querySelector('#stopMicRecord');

let audioFileStream = null;

let micStream = null;

let audioContext = null;

/** Destination strema which is going to be recorded ultimately */


let mediaRecorder = null;

let streamToRecord = null;

startAudioFileRecord.addEventListener('click',async (event)=>{

    audioContext = new AudioContext();
    audioFileStream = audioElement.captureStream(); // get the audio file stream

    console.log('audio file stream track = ', audioFileStream.getAudioTracks().length)

    const audioStreamSource = audioContext.createMediaStreamSource(audioFileStream);
    if(streamToRecord == null){
        streamToRecord = audioContext.createMediaStreamDestination();
    }
    

    console.log('create Media Stream Source = ',audioStreamSource );

    const audioGain = audioContext.createGain();
    audioGain.gain.value = 0.7;
    // connect(audioGain)
    
    audioStreamSource.connect(audioGain).connect(streamToRecord);

    console.log('stream to record = ', streamToRecord);

    //let tracks= streamToRecord.stream.getAudioTracks();
    //startRecording(new MediaStream(tracks));

    startRecording(streamToRecord.stream);
    
    audioElement.play();
})

stopAudioFileRecord.addEventListener('click',(event)=>{
    audioElement.pause();
    mediaRecorder.stop();
})

startMicRecord.addEventListener('click',(event)=>{
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      })
      .then(async(stream)=>{
        micStream = audioContext.createMediaStreamSource(stream);
        const micGain = audioContext.createGain();
        micGain.gain.value = 1.7;
        micStream.connect(micGain).connect(streamToRecord);
      })
      .catch(async(error)=>{
          console.log('error happened when trying to get microphone, error = ', error.toString());
      })
})


const startRecording = async (stream) => {
    // recorder = new MediaRecorder(stream);
    // let data = [];
  
    // recorder.ondataavailable = event => data.push(event.data);
    // recorder.start();

    console.log('inside start recording , stream = ', stream.getTracks().length);

    let chunks = [];
    mediaRecorder = new MediaRecorder(stream);

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
        console.log(stream.getTracks().length);

        console.log('inside mediarecorder onstop');
        
         var recordedBlob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        //let recordedBlob = new Blob(chunks, { type: "audio/mp3" });
        // console.log('blob ', blob);

        //let recordedBlob = new Blob(chunks, { type: "video/webm" });
        //recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = URL.createObjectURL(recordedBlob);
        downloadButton.download = "RecordedVideo.mp3";


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