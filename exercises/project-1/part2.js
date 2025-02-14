import "@tensorflow/tfjs";
import * as cocoSSd from "@tensorflow-models/coco-ssd";
import { startWebcam, takePicture, showResult } from "./utils";

const webcamButton = document.getElementById("webcam");
const captureButton = document.getElementById("pause");
const video = document.querySelector("video");

let model;

const loadModel = async () => {
  model = await cocoSSd.load();
};

webcamButton.onclick = () => startWebcam(video);
captureButton.onclick = () => takePicture(video, predict);

const predict = async (img) => {
  const predictions = await model.detect(img);

  console.log(predictions);
  showResult(predictions);
};

loadModel();
