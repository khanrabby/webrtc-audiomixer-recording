# recording-test
This repository contains code for following tasks
1. Recording mic sound using webrtc media device.
2. Playing a local sound using audioContext
3. Mixing the sound of mic and local playable audio using audioContext provided by javascript's Media API . 
4. Record the mixed sound using AudioContext and MediaRecorder API . 
5. Download the recorded mixed sound when recording ends.

To run the project and get the desired output described above , go through the following guildlines step by step. 

1. Clone the repo 

2. Install all the dependencies by running 
```
npm install
```

3. Run the server by 
```
node server.js
```

4. Open browser and go to localhost:3000

5. Click the "Play Audio" button , it will start playing the local sound.

6. Click the "Start Mic" button to start the playing of mic sound.

7. Now click the "Start Record" button to start the recording of both sound simultanously. 

8. After some time , click the "Stop Record" button to stop the recording. 

9. When the recording is stopped, a "Download" button will appear to download the final recorded audio file.

10. Click the "Download" button to download the recorded file , play the sound , you will get the audio mixed desired.  
