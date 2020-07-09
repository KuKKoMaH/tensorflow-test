const loaderEl = document.getElementById('loader');
const loaderProgressEl = document.getElementById('loaderProgress');
const resultEl = document.getElementById('result');
const timeEl = document.getElementById('time');
const imageFormEl = document.getElementById('imageForm');
const imageEl = document.getElementById('image');

const initWebcam = () => new Promise(( resolve, reject ) => {
  const navigatorAny = navigator;
  const adjustVideoSize = ( width, height ) => {
    const aspectRatio = width / height;
    if (width >= height) {
      webcam.width = aspectRatio * webcam.height;
    } else if (width < height) {
      webcam.height = webcam.width / aspectRatio;
    }
  };
  // navigator.getUserMedia = (navigator.getUserMedia ||
  //   navigator.webkitGetUserMedia ||
  //   navigator.mozGetUserMedia ||
  //   navigator.msGetUserMedia);

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {


    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" }, width: 224, height: 224 },
      audio: false,
    })
      .catch(e => {
        console.log(e);
        return navigator.mediaDevices.getUserMedia({ 'video': { width: 224, height: 224 }, 'audio': false });
      })
      .then(stream => {
        webcam.srcObject = stream;
        webcam.addEventListener('loadeddata', () => {
          // adjustVideoSize(
          //   webcam.videoWidth,
          //   webcam.videoHeight);
          resolve();
        }, false);
      })
      .catch(reject);
  } else {
    reject('navigator.getUserMedia not found');
  }
});

const getTopPredictions = ( predictions, count = 1 ) => {
  const results = [];
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    if (results.length < count || results[0][1] < prediction) {
      results.push([i, prediction]);
      results.sort(( r1, r2 ) => r1[1] === r2[1] ? 0 : r1[1] > r2[1] ? 1 : -1);
    }
    if (results.length > count) results.shift();
  }
  return results;
};

let model = null;

const predict = () => {
  if (!model) {
    alert('Модель не загружена!');
    return;
  }
  let start = Date.now();
  tf.tidy(() => {
    let input = tf.browser.fromPixels(imageEl)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims(0)
    ;

    const result = model.predict(input);
    const predictions = result.dataSync();

    const topPredictions = getTopPredictions(predictions, 5);
    resultEl.innerHTML = topPredictions
      .reverse()
      .map(p => partnames[idIndex[p[0]]] + ' - ' + (p[1] * 100).toFixed(2) + '%')
      .join('<br/>');
    timeEl.innerText = Date.now() - start + ' ms';
  });
};

tf.loadGraphModel("parts_js/model.json", {
  onProgress: ( progress ) => {
    loaderProgressEl.style.width = (progress * 100).toFixed(0) + '%';
  },
})
  .then(_model => {
    loaderProgressEl.classList.add('bg-success');
    model = _model;

    imageFormEl.dispatchEvent(new CustomEvent("submit"));
  })
  .catch(e => console.error(e));

imageEl.onload = () => predict();
imageFormEl.addEventListener('submit', ( e ) => {
  e.preventDefault();
  const src = e.target.src.value;
  imageEl.src = 'https://cors.apgrup.ru/' + src;
  return false;
});
