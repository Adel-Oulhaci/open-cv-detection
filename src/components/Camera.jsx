import { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import namer from 'color-namer';
import { getDominantColor } from '../utils/colorUtils';
import { drawBoundingBoxes } from '../utils/objectDetectionUtils';
import DetectionPanel from './DetectionPanel';
import VideoDisplay from './VideoDisplay';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [detections, setDetections] = useState([]);
  const [dominantColor, setDominantColor] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsStarted(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const detectObjects = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const predictions = await model.detect(canvas);
    setDetections(predictions);

    drawBoundingBoxes(context, predictions);

    const { color, hexColor } = getDominantColor(canvas);
    const colorName = namer(hexColor).basic[0].name;
    setDominantColor({ color, name: colorName });
  };

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(detectObjects, 500);
    return () => clearInterval(interval);
  }, [isStarted, model]);

  return (
    <div className="camera-container">
      <button onClick={startCamera} disabled={isStarted}>
        {isStarted ? 'Camera Active' : 'Start Camera'}
      </button>
      
      <VideoDisplay
        videoRef={videoRef}
        canvasRef={canvasRef}
        isStarted={isStarted}
        onPlay={() => detectObjects()}
      />

      <DetectionPanel
        detections={detections}
        dominantColor={dominantColor}
      />
    </div>
  );
};

export default Camera;