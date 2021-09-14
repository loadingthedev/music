const musicConatier = document.querySelector(".music-container")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("#audio")
const progress = document.querySelector(".progress")
const title = document.querySelector("#title")
const progressContainer = document.querySelector(".progress-container")
const cover = document.querySelector("#cover")

//* songs
const songs = ["hey", "summer", "ukulele"]

//* keep track of songs
let songIndex = 2

//* Initial load song into DOM
loadSong(songs[songIndex])

//* update song detail
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

function pauseSong() {
  musicConatier.classList.remove("play")
  playBtn.querySelector("i.fas").classList.remove("fa-pause")
  playBtn.querySelector("i.fas").classList.add("fa-play")
  audio.pause()
}

function playSong() {
  musicConatier.classList.add("play")
  playBtn.querySelector("i.fas").classList.remove("fa-play")
  playBtn.querySelector("i.fas").classList.add("fa-pause")
  audio.play()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

function nextSong(params) {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercentage = (currentTime / duration) * 100 + "%"
  // console.log(progressPercentage)
  progress.style.width = progressPercentage
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
  //   console.log((clickX / width) * duration)
  //   console.log(duration)
}

//Event listeners
playBtn.addEventListener("click", (e) => {
  const isPlay = musicConatier.classList.contains("play")

  if (isPlay) {
    pauseSong()
  } else {
    playSong()
  }
})

//change song events
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

audio.addEventListener("timeupdate", updateProgress)
audio.addEventListener("ended", nextSong)
progressContainer.addEventListener("click", setProgress)
