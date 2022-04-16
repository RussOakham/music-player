const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of songs
let songIndex = 2;

// Initially Load Song Details into DOM
loadSong(songs[songIndex]);

// Play Song
function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("em.fas").classList.remove("fa-play");
  playBtn.querySelector("em.fas").classList.add("fa-pause");

  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("em.fas").classList.remove("fa-pause");
  playBtn.querySelector("em.fas").classList.add("fa-play");

  audio.pause();
}

// Prev Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// update Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPerfect = (currentTime / duration) * 100;

  progress.style.width = `${progressPerfect}%`;
}

// Set progress bar;
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/Song update event
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song Ends
audio.addEventListener("ended", nextSong);
