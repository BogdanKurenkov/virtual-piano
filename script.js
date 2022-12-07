const main = document.querySelector("main");
const piano = document.querySelector(".piano");
const pianoКeys = document.querySelectorAll(".piano-key");
const audio = document.querySelector("audio");
const notes = document.querySelector(".btn-notes");
const letters = document.querySelector(".btn-letters");
const button = document.querySelector("button");
const fullScreen = document.querySelector(".fullscreen");

let clickState = false;
document.querySelector(".btn-notes").classList.add("btn-active");

const keyCodes = {
  68: "./assets/audio/c.mp3",
  70: "./assets/audio/d.mp3",
  71: "./assets/audio/e.mp3",
  72: "./assets/audio/f.mp3",
  74: "./assets/audio/g.mp3",
  75: "./assets/audio/a.mp3",
  76: "./assets/audio/b.mp3",
  82: "./assets/audio/c♯.mp3",
  84: "./assets/audio/d♯.mp3",
  85: "./assets/audio/f♯.mp3",
  73: "./assets/audio/g♯.mp3",
  79: "./assets/audio/a♯.mp3"
};
const keySigns = {
  68: "D",
  70: "F",
  71: "G",
  72: "H",
  74: "J",
  75: "K",
  76: "L",
  82: "R",
  84: "T",
  85: "U",
  73: "I",
  79: "O"
};

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("fullscreen")) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  if (event.target.classList.contains("btn-notes")) {
    document.querySelector(".btn-notes").classList.add("btn-active");
    document.querySelector(".btn-letters").classList.remove("btn-active");
    Array.from(piano.children).map((el) => {
      if (el.childNodes.length > 0) {
        Array.from(el.children).forEach((i) => {
          i.classList.remove("piano-key-letter");
        });
      } else {
        el.classList.remove("piano-key-letter");
      }
    });
  }
  if (event.target.classList.contains("btn-letters")) {
    document.querySelector(".btn-letters").classList.add("btn-active");
    document.querySelector(".btn-notes").classList.remove("btn-active");
    Array.from(piano.children).map((el) => {
      if (el.childNodes.length > 0) {
        Array.from(el.children).forEach((i) => {
          i.classList.add("piano-key-letter");
        });
      } else {
        el.classList.add("piano-key-letter");
      }
    });
  }
});

window.addEventListener("mouseover", (event) => {
  if (clickState) {
    if (event.target.classList.contains("piano-key")) {
      playAudio(event.target.dataset.note);
      event.target.classList.add("active");
    }
  }
});

window.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.remove("active");
  }
});

piano.addEventListener("mousedown", (event) => {
  clickState = true;
  if (event.target.classList.contains("piano-key")) {
    playAudio(event.target.dataset.note);
    event.target.classList.add("active");
  }
});

window.addEventListener("mouseup", (event) => {
  clickState = false;
  event.target.classList.remove("active");
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    window.exitFullscreen();
  }
  if (event.repeat) {
    return;
  }
  const search = Array.from(pianoКeys).find(
    (el) => el.dataset.letter === keySigns[event.keyCode]
  );
  search.classList.add("active");
  playAudioKey(event.keyCode);
});

window.addEventListener("keyup", (event) => {
  const search = Array.from(pianoКeys).find(
    (el) => el.dataset.letter === keySigns[event.keyCode]
  );
  search.classList.remove("active");
});

function playAudio(note) {
  const audio = new Audio();
  audio.src = `assets/audio/${note}.mp3`;
  audio.play();
  audio.loop = false;
}

function playAudioKey(code) {
  const audio = new Audio();
  if (keyCodes[code]) {
    audio.src = keyCodes[code];
    audio.play();
  }
}
