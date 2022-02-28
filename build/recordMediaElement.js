const audioElement = document.querySelector('audio');

const startMediaRecord = document.querySelector('#startMediaRecord');
const stopMediaRecord = document.querySelector('#stopMediaRecord');

let mediaElementStream = null;

let mediaRecorder = null;



startMediaRecord.addEventListener('click',(event)=>{
    mediaElementStream = audioElement.captureStream();
    startRecording(mediaElementStream);
    audioElement.play();
})

stopMediaRecord.addEventListener('click',(event)=>{
    audioElement.pause();
    mediaRecorder.stop();
})


const startRecording = (stream) => {
    // recorder = new MediaRecorder(stream);
    // let data = [];
  
    // recorder.ondataavailable = event => data.push(event.data);
    // recorder.start();

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

    mediaRecorder.start(1500);
    
    //mediaRecorder.start();
    console.log('media recorder state = ', mediaRecorder.state);

    mediaRecorder.onstop = function (e) {
        console.log(stream.getTracks());

        console.log('inside mediarecorder onstop');
        
        // var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        let recordedBlob = new Blob(chunks, { type: "audio/mp3" });
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

const stopRecording = ()=>{

}