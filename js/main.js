'use strict';
var errorElement = document.querySelector('#errorMsg');
var video = document.querySelector('video');

// Mengatur agar hanya meminta akses video, tanpa audio
var constraints = window.constraints = {
  audio: false,
  video: true
};

// Fungsi jika kamera berhasil diakses
function handleSuccess(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.oninactive = function() {
    console.log('Stream inactive');
  };
  window.stream = stream; // Membuat stream bisa diakses di console browser
  video.srcObject = stream;
}

// Fungsi jika terjadi error (kamera tidak ada atau tidak diizinkan)
function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' + constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and you need to allow the page access to your devices in order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
}

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

// Menjalankan perintah WebRTC untuk mengakses kamera
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);