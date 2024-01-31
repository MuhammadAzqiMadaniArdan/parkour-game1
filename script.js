
// modal
// modal option
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const openModalBtn = document.querySelector(".btn-open");
const openModalBtn2 = document.querySelector(".btn-open2");
const closeModalBtn = document.querySelector(".btn-close");
const closeModalBtn2 = document.querySelector(".btn-close2");

// function close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const closeModal2 = function () {
  modal2.classList.add("hidden");
  overlay2.classList.add("hidden");
};


// Keluar dari modal ketika btn close dan overlay(background hitam (yang ditekan)) "ditekan"
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

closeModalBtn2.addEventListener("click", closeModal2);
overlay2.addEventListener("click", closeModal2);

// close modal ketika tombol ESC ditekan
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal() ;
  }
});

document.addEventListener("keydown", function (f) {
  if (f.key === "Escape" && !modal2.classList.contains("hidden")) {
    closeModal2();
  }
});

// function open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openModal2 = function () {
  modal2.classList.remove("hidden");
  overlay2.classList.remove("hidden");
};

// event dari ditekannya open modal
openModalBtn.addEventListener("click", openModal);

openModalBtn2.addEventListener("click", openModal2);

var music = document.getElementById("music")
var musicImage = document.getElementById("music_image")

function playAudio() {
  music.play();
}

function pauseAudio() {
  music.pause();
}

// var isPlaying = false;

// function togglePlay() {

//   if (isPlaying) {
//     myAudio.pause()
//   } else {
//     myAudio.play();
//   }
// };
// myAudio.onplaying = function() {
//   isPlaying = true;
// };
// myAudio.onpause = function() {
//   isPlaying = false;
// };

// if (music.isPlaying) {
//   music.play()
// } else {
//   music.stop()
// }