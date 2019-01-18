let userIsInFrontOfScreen = false;

// Enable experimental features in Chrome
// chrome://flags#enable-experimental-web-platform-features

// Check whether we have FaceDetector API available
if (window.FaceDetector !== undefined) {
  // User must allow access to webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Get video element for the webcam video stream
      let webcamVideo = document.querySelector('#webcam');

      // Get webcam canvas used for face detection
      let webcamCanvas = document.querySelector('#webcam-canvas');
      let canvasContext = webcamCanvas.getContext('2d');

      // Attach webcam stream to video element
      webcamVideo.srcObject = stream;
      webcamVideo.play();

      // Create FaceDetector API
      let faceDetector = new window.FaceDetector();

      setInterval(async () => {

        const result = await faceDetector.detect(webcamVideo);
        const coords = result[0].boundingBox;
        const square = document.querySelector('#square');

        square.style.width = `${coords.width}px`;
        square.style.height = `${coords.height}px`;
        square.style.top = `${coords.top}px`;
        square.style.left = `${coords.left}px`;

      }, 300);

      // Detect face every 500 ms
      setInterval(function() {
        canvasContext.drawImage(webcamVideo, 0, 0, webcamCanvas.width, webcamCanvas.height);
        // faceDetector.detect(webcamCanvas).then(function(faces) {
        //   if (faces.length > 0) {
        //     if (!userIsInFrontOfScreen) {
        //       userIsInFrontOfScreen = true;
        //       document.querySelector('#watching-yes').className = 'monkey visible';
        //       document.querySelector('#watching-no').className = 'monkey';
        //     }
        //   } else if (userIsInFrontOfScreen) {
        //     userIsInFrontOfScreen = false;
        //     document.querySelector('#watching-no').className = 'monkey visible';
        //     document.querySelector('#watching-yes').className = 'monkey';
        //   }
        // });
      }, 500);

    }).catch(function(err) {
      console.error(err);
    });
} else {
  console.log('FaceDetector API was not found, enable experimental features chrome://flags#enable-experimental-web-platform-features');
}