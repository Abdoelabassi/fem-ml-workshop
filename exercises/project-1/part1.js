import "@tensorflow/tfjs";
import * as cocoSSd from "@tensorflow-models/coco-ssd";
import { handleFilePicker } from "./utils";

let model;

const loadModel = async () => {
  model = await cocoSSd.load();

  handleFilePicker(predict);
};

const predict = async (img) => {
  const predictions = await model.detect(img);

  console.log(predictions);
};

loadModel();
