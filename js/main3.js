'use strict';

// Mengambil elemen dari HTML
var snapshotButton = document.querySelector('button#snapshot');
var filterSelect = document.querySelector('select#filter');
var video = window.video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');

canvas.width = 480;
canvas.height = 360;

// Logika saat tombol snapshot ditekan
snapshotButton.onclick = function() {
  // Menerapkan filter yang sedang dipilih ke canvas hasil foto
  canvas.className = filterSelect.value;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

// Logika saat pilihan filter di dropdown diganti
filterSelect.onchange = function() {
  // Menerapkan class CSS sesuai value yang dipilih ke elemen video
  video.className = filterSelect.value;
};

// Pengaturan kamera (hanya video)
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