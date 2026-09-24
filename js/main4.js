'use strict';

// Mengambil elemen dari HTML
var audio = document.querySelector('audio');
var statusMikrofon = document.querySelector('#status-mikrofon');

// Mengatur agar hanya meminta akses mikrofon (audio), tanpa video
var constraints = window.constraints = {
  audio: true,
  video: false
};

// Fungsi jika mikrofon berhasil diakses
function handleSuccess(stream) {
  var audioTracks = stream.getAudioTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using audio device: ' + audioTracks[0].label);
  
  stream.oninactive = function() {
    console.log('Stream ended');
  };
  
  window.stream = stream; // Membuat stream bisa diakses di console browser
  audio.srcObject = stream;
  
  // Memunculkan teks keterangan (Tambahan Tugas Praktikum)
  statusMikrofon.innerHTML = "Mikrofon aktif";
}

// Fungsi jika gagal mengakses mikrofon
function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Memanggil perintah WebRTC untuk mengakses mikrofon
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);