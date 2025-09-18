import { showNotification } from "./showNotification.js";

//DOM Elements
const inputField = document.getElementById("searchInput");
const notification = document.getElementById("notificationContainer");

//Function to get the Access Token
export const getAccessToken = async () => {
  const response = await fetch("./Backend/getClientToken.php");
  const data = await response.json();
  return data.access_token;
};

//Function to find the Song from Input
export const getSongLists = async () => {
  const songResult = document.getElementById("songsList");
  const songName = inputField.value.trim();

  const target = document.getElementById("searchResults");

  //Prevents API Call if field is empty
  if (!songName) {
    showNotification("noSong");
    return;
  }
  songResult.innerHTML = "<br><h2>🎧 Your song is being fetched...</h2>";

  target.classList.remove("hidden");

  target.scrollIntoView({
    behavior: "smooth",
  });

  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      songName
    )}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  // console.log(result);

  songResult.innerHTML = ""; // Clear old results before showing new ones

  if (result.tracks && result.tracks.items.length > 0) {
    result.tracks.items.forEach((element) => {
      // console.log(element);
      let songCard = document.createElement("div");
      songCard.className = "song-card hover-effect";
      songCard.innerHTML = `
              <img
                src="${element.album.images[0].url}"
                alt=""
              />
              <div class="song-details">
                <h3 class="song-name">${element.name}</h3>
                <p class="artist-name">${element.artists[0].name}</p>
                <p>${Math.floor(element.duration_ms / 60000)}:${String(
        Math.floor((element.duration_ms % 60000) / 1000)
      ).padStart(2, "0")}</p>
      <span class="album-name hidden">${element.album.name}</span>
      <span class="song-duration hidden">${element.duration_ms}</span>
              </div>`;
      songResult.appendChild(songCard);
    });
    inputField.value = "";
  } else {
    // console.log("No Song Found");
    songResult.innerHTML = `<p style="color: red; text-align:center;">No Song Found</p>`;
  }
};
