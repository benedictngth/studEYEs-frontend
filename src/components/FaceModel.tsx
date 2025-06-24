import { useRef } from "react";
import "@mediapipe/face_mesh";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";

export default function FaceModel() {
  //setup webcam and canvas refs
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runFaceMesh = async () => {
    // Load the Face Mesh model
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "mediapipe",
      refineLandmarks: true,
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    };
    const detector = await faceLandmarksDetection.createDetector(
      model,
      detectorConfig
    );
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      console.log("Webcam is ready");
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      //make detections
      const faces = await detector.estimateFaces(video);
      console.log(faces);
    }
  };

  setInterval(() => {
    runFaceMesh();
  }, 100);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}
