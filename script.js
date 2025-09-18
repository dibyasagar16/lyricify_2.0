import { getAccessToken } from "./Scripts/findSong.js";
import { getSongLists } from "./Scripts/findSong.js";
import { findLrics } from "./Scripts/findLyrics.js";
import { createCard } from "./Scripts/cardCreation.js";
import { copySelectedSong } from "./Scripts/copySelectedSong.js";

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const clickedDiv = document.getElementById("songsList");
const inputField = document.getElementById("searchInput");
const continueBtn = document.getElementById("continueBtn");
const bgColorInput = document.getElementById("bgColor");
const textColorInput = document.getElementById("textColor");
const fontFamilySelect = document.getElementById("fontFamily");
const fontSizeInput = document.getElementById("fontSize");

const updateCardStyle = () => {
  const bgColor = bgColorInput.value;
  const textColor = textColorInput.value;
  const fontFamily = fontFamilySelect.value;
  const fontSize = fontSizeInput.value + "px";
  lyricsCard.style.backgroundColor = bgColor;
  lyricsCard.style.color = textColor;
  lyricsCard.style.fontFamily = fontFamily;
  cardLyrics.style.fontSize = fontSize;
};

//Fucntions to Call On Page Load
updateCardStyle();
getAccessToken();

//Event Handlers
searchBtn.addEventListener("click", getSongLists);

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getSongLists();
  }
}); //Enter in Input Field

clickedDiv.addEventListener("click", (e) => {
  const clickedSong = e.target.closest(".song-card");
  // console.log(e.target.closest(".song-card"));

  const songData = {
    songName: clickedSong.querySelector(".song-name")?.textContent.trim() ?? "",
    artist: clickedSong.querySelector(".artist-name")?.textContent.trim() ?? "",
    duration:
      clickedSong.querySelector(".song-duration")?.textContent.trim() ?? "",
    album: clickedSong.querySelector(".album-name")?.textContent.trim() ?? "",
    imgSrc: clickedSong.querySelector("img")?.src ?? "",
  };

  if (clickedSong) {
    const songName = clickedSong.querySelector(".song-name").textContent;
    const artist = clickedSong.querySelector(".artist-name").textContent;
    const albumName = clickedSong.querySelector(".album-name").textContent;
    findLrics(songName, artist, albumName);
    copySelectedSong(songData);
  }

  // console.log(songData);
});

continueBtn.addEventListener("click", () => {
  createCard();
});

//Function Calls for Card Cutomizations
bgColorInput.addEventListener("input", updateCardStyle);
textColorInput.addEventListener("input", updateCardStyle);
fontFamilySelect.addEventListener("change", updateCardStyle);
fontSizeInput.addEventListener("input", updateCardStyle);
