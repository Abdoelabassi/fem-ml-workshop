const path = "./model/";

const startButton = document.getElementById("start");

startButton.onclick = () => init();

let model, webcam;

const init = async () => {
  const modelPath = path + "model.json";
  const metadataPath = path + "metadata.json";

  model = await tmImage.load(modelPath, metadataPath);

  let maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(200, 200, true);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  async function predict() {
    const predictions = await model.predict(webcam.canvas);
    const topPrediction = Math.max(...predictions.map((p) => p.probability));
    const topPredictionIndex = predictions
      .map((p) => p.probability)
      .indexOf(topPrediction);
    console.log(predictions[topPredictionIndex].className);
  }
};
