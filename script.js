const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/m1.mp3",
    title: "Shyam Singh roy(2021)",
    artist: "Anurag Kulakarni",
    imgSrc: "https://i.ytimg.com/vi/MFx_WHGo97I/maxresdefault.jpg",
  },
  {
    songSrc: "./music/m2.mp3",
    title: "Jyothi Lakshmi(2015)",
    artist: "Uma Neha",
    imgSrc: "https://m.media-amazon.com/images/M/MV5BMzNhY2JmOWUtY2QyMS00NzA0LWJiMjMtNWMzN2MzYzhlMzFjXkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_.jpg",
  },
  {
    songSrc: "./music/m3.mp3",
    title: "Yogi(2006)",
    artist: "Karthik & Sunitha(bangalore)",
    imgSrc: "https://i.ytimg.com/vi/WMB27rgWDUg/maxresdefault.jpg",
  },
  {
    songSrc: "./music/m4.mp3",
    title: "Gudumba Shankar(2004)",
    artist: "Shankar Mahadevan & Premgi Amaren",
    imgSrc: "http://cps-static.rovicorp.com/1/adg/covers/dru300/u371/u37136v1tbw.jpg?partner=allrovi.com",
  },
  {
    songSrc: "./music/m5.mp3",
    title: "MAD (2023)",
    artist: "Bheems Ceciroleo,Varam, Keerthana Sharma",
    imgSrc: "https://naasongsring.com/wp-content/uploads/2024/03/MAD.jpg",
  },
  {
    songSrc: "./music/m6.mp3",
    title: "Satyameva Jayate",
    artist: "Neha Kakkar, Dhvani Bhanushali, Ikka",
    imgSrc: "https://i.ytimg.com/vi/TRa9IMvccjg/maxresdefault.jpg",
  },
  {
    songSrc: "./music/m7.mp3",
    title: "Bajatey Raho (2013)",
    artist: "Manjeet Ral",
    imgSrc: "https://i.ytimg.com/vi/-GuoHK1s_8Q/maxresdefault.jpg",
  },
  {
    songSrc: "./music/m8.mp3",
    title: "Hanuman(2024)",
    artist: "Gowra Hari",
    imgSrc: "https://assets.gadgets360cdn.com/pricee/assets/product/202212/hanuman-movie-teja-sajja-captivates-with-his-innocence_b_2308221247_1669833505.jpg",
  },
  {
    songSrc: "./music/m9.mp3",
    title: "Chatrapati (2005)",
    artist: "M. M. Keeravani,Sunitha",
    imgSrc: "http://4.bp.blogspot.com/_RCJ6c0fm8iA/TJzYsYjlIGI/AAAAAAAAAYw/9F6ZldcBR1s/s400/chatrapathi+pics.jpg",
  },
  {
    songSrc: "./music/m10.mp3",
    title: "Ekadanthaya Vakratudaya",
    artist: "Shankar Mahadevan",
    imgSrc: "https://a10.gaanacdn.com/gn_img/albums/dwN39y83DP/N39yveq53D/size_m.jpg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    index=0;
    loadMusic(index);
    play();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
