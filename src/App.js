//import logo from './logo.svg';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { useRef } from 'react';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () =>{
    const neuralNet = await handpose.load()
    console.log("Handpose model loaded.")
    // Detect hand loop
    setInterval(()=>{
      detect(neuralNet);
    }, 100)
  }

  const detect = async (neuralNet) =>{
    // Check data is available
    if (typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video height and width
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await neuralNet.estimateHands(video);
      console.log(hand);

    }
    
  }

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam 
          ref = {webcamRef}
          style={{
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zindex:9,
            width:640,
            height:480
          }}
        />
        <canvas 
          ref = {canvasRef} 
          style={{
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zindex:9,
            width:640,
            height:480          
          }} 
        />
      </header>
    </div>
  );
}

export default App;
