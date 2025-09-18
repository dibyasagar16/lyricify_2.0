import { getAccessToken } from "./Scripts/findSong.js";
import { getSongLists } from "./Scripts/findSong.js";
import { findLrics } from "./Scripts/findLyrics.js";
import { createCard } from "./Scripts/cardCreation.js";
import { setSongData, copySongCard } from "./Scripts/getClickedSongData.js";

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

  if (clickedSong) {
    // console.log(songData)
    const selectedSongDiv = document.getElementById("selectedSongInfo");

    //Geting the clicked song details here
    const songData = {
      songName:
        clickedSong.querySelector(".song-name")?.textContent.trim() ?? "",
      artist:
        clickedSong.querySelector(".artist-name")?.textContent.trim() ?? "",
      duration:
        clickedSong.querySelector(".song-duration")?.textContent.trim() ?? "",
      album: clickedSong.querySelector(".album-name")?.textContent.trim() ?? "",
      imgSrc: clickedSong.querySelector("img")?.src ?? "",
    };

    //Getting Lyrics of the clicked song
    findLrics(songData.songName, songData.artist, songData.albumName);
    //Setting the clicked song details for global use
    setSongData(songData);
    // Settting the clicked song details in Lyrics part
    copySongCard(selectedSongDiv);
  }
});

continueBtn.addEventListener("click", () => {
  createCard();
  const selectedSongDiv = document.getElementById("lyricsCardSongDetails");
  copySongCard(selectedSongDiv);
});

//Function Calls for Card Cutomizations
bgColorInput.addEventListener("input", updateCardStyle);
textColorInput.addEventListener("input", updateCardStyle);
fontFamilySelect.addEventListener("change", updateCardStyle);
fontSizeInput.addEventListener("input", updateCardStyle);
