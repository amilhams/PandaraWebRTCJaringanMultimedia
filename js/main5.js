'use strict';

var statusMikrofon = document.querySelector('#status-mikrofon');
var canvas = document.querySelector('#visualizer');
var canvasCtx = canvas.getContext('2d');

// Mengatur resolusi internal canvas
canvas.width = 600;
canvas.height = 250;

var audioCtx;
var analyser;
var source;

var constraints = {
  audio: true,
  video: false
};

// Fungsi untuk menggambar grafik visualizer
function visualize() {
  // Menentukan jumlah batangan (bar) grafik
  analyser.fftSize = 256; 
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // Membersihkan canvas sebelum menggambar
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  function draw() {
    // Meminta browser memanggil fungsi draw terus-menerus (looping)
    requestAnimationFrame(draw);

    // Mengambil data frekuensi suara saat ini
    analyser.getByteFrequencyData(dataArray);

    // Menggambar background hitam
    canvasCtx.fillStyle = '#222';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    // Menggambar setiap batangan grafik berdasarkan volume/frekuensi
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      // Membuat warna bar bervariasi dari biru ke ungu muda berdasarkan tingginya
      canvasCtx.fillStyle = 'rgb(' + (barHeight + 50) + ', 100, 250)';
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
  
  // Menjalankan fungsi draw pertama kali
  draw(); 
}

// Fungsi jika mikrofon berhasil diakses
function handleSuccess(stream) {
  statusMikrofon.innerHTML = "Mikrofon aktif - Visualizer berjalan";
  
  // Inisialisasi Web Audio API
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  
  // Mengubah stream mikrofon menjadi sumber audio untuk dianalisis
  source = audioCtx.createMediaStreamSource(stream);
  
  // Menghubungkan sumber suara ke AnalyserNode
  source.connect(analyser);
  
  // Menjalankan visualizer
  visualize();
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
  statusMikrofon.innerHTML = "Gagal mengakses mikrofon";
  statusMikrofon.style.color = "red";
}

// Memanggil perintah WebRTC
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);