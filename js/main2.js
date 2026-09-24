'use strict';

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

// Menghubungkan variabel dengan tombol di HTML
var btnSnapshot = document.querySelector('#btn-snapshot');
var btnUlangi = document.querySelector('#btn-ulangi');

// Logika saat tombol "Take snapshot" diklik
btnSnapshot.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  // Perintah ini menggambar frame video saat ini ke dalam elemen canvas
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

// Logika saat tombol "Ulangi" diklik (Tambahan Tugas)
btnUlangi.onclick = function() {
  var context = canvas.getContext('2d');
  // Menghapus seluruh area gambar di dalam canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
};

// Pengaturan awal WebRTC (sama seperti percobaan 1)
var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; 
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Memanggil kamera
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);