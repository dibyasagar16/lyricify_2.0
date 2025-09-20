import { getAccessToken } from "./Scripts/findSong.js";
import { getSongLists } from "./Scripts/findSong.js";
import { findLrics } from "./Scripts/findLyrics.js";
import { createCard } from "./Scripts/cardCreation.js";
import { setSongData, copySongCard } from "./Scripts/getClickedSongData.js";
import { downloadCard } from "./Scripts/imageDownloader.js";
import { shareCard } from "./Scripts/imageShare.js";
import { setTheme } from "./Scripts/changeTheme.js";

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const clickedDiv = document.getElementById("songsList");
const inputField = document.getElementById("searchInput");
const continueBtn = document.getElementById("continueBtn");
const bgColorInput = document.getElementById("bgColor");
const textColorInput = document.getElementById("textColor");
const fontFamilySelect = document.getElementById("fontFamily");
const fontSizeInput = document.getElementById("fontSize");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

const updateCardStyle = () => {
  const bgColor = bgColorInput.value;
  const textColor = textColorInput.value;
  const fontFamily = fontFamilySelect.value;
  const fontSize = fontSizeInput.value + "px";
  lyricsCard.style.backgroundColor = bgColor;
  cardLyrics.style.color = textColor;
  cardLyrics.style.fontFamily = fontFamily;
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

downloadBtn.addEventListener("click", () => {
  const card = document.getElementById("lyricsCard");
  downloadCard(card);
});
shareBtn.addEventListener("click", shareCard);

//Function Calls for Card Cutomizations
bgColorInput.addEventListener("input", updateCardStyle);
textColorInput.addEventListener("input", updateCardStyle);
fontFamilySelect.addEventListener("change", updateCardStyle);
fontSizeInput.addEventListener("input", updateCardStyle);

//Code for theme toggle starts here
// Check for saved theme preference on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Default to dark theme if no preference saved
    setTheme("dark");
  }
});

// Event listener for theme toggle button
if (themeToggle) {
  // Check if themeToggle exists
  themeToggle.addEventListener("click", () => {
    console.log('Clicked')
    const currentTheme = htmlElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      console.log("switiching to Dark")
      setTheme("dark");
    } else {
      console.log("Switching to Light")
      setTheme("light");
    }
  });
}

//Modal control code starts here
// const closeButton = shareModal.querySelector(".close-button");
// const downloadButton = document.getElementById("downloadButton");
// const copyButton = document.getElementById("copyButton");
// const statusMessage = document.getElementById("statusMessage");

// let capturedImageBlob = null;
// let isCopying = false;

// const showModal = () => {
//   shareModal.style.display = "flex";
// };

// const hideModal = () => {
//   shareModal.style.display = "none";
//   statusMessage.textContent = ""; // Clear status message
// };

// const setStatusMessage = (message, isError = false) => {
//   statusMessage.textContent = message;
//   statusMessage.style.color = isError ? "#FF6B6B" : "#25D366";
// };

// shareBtn.addEventListener("click", async () => {
//   setStatusMessage("Generating image...");
//   try {
//     const canvas = await html2canvas(lyricsCard, {
//       scale: 2,
//       backgroundColor: "#1a1a2e",
//     });

//     canvas.toBlob((blob) => {
//       capturedImageBlob = blob;
//       showModal();
//       setStatusMessage(""); // Clear message after success
//     }, "image/png");
//   } catch (error) {
//     console.error("Error generating image:", error);
//     setStatusMessage("Failed to generate image. Please try again.", true);
//   }
// });

// closeButton.addEventListener("click", hideModal);
// window.addEventListener("click", (event) => {
//   if (event.target === shareModal) {
//     hideModal();
//   }
// });

// downloadBtn.addEventListener("click", () => {
//   const card = document.getElementById("lyricsCard");
//   downloadCard(card);
// });
