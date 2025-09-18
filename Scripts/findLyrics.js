//Function to Find Lyrics of Clicked Song
export const findLrics = async (songName, artist, albumName) => {
  const apiUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(
    songName
  )}&artist_name=${encodeURIComponent(artist)}${
    albumName ? `&album_name=${encodeURIComponent(albumName)}` : ""
  }`;

  let lyricDiv = document.getElementById("lyricsContent");
  lyricDiv.innerHTML = "<br><h2>🎼Fetching the lyrics...</h2>";

  try {
    const response = await fetch(apiUrl);
    const lyricsResult = await response.json();
    // console.log(lyricsResult);
    // console.log(lyricsResult.plainLyrics);

    if (lyricsResult && lyricsResult.plainLyrics) {
      let lines = lyricsResult.plainLyrics.split("\n");
      lyricDiv.innerHTML = ""; //Clear Before Inserting Lyrics
      let filteredLines = lines.filter((line) => line !== "");
      filteredLines.forEach((line) => {
        let p = document.createElement("p");
        p.textContent = line;
        p.classList.add("lyrics-line");
        lyricDiv.appendChild(p);
        //Allowing to Select Lyrics Lines
        p.addEventListener("click", () => {
          const selectedLines = document.querySelectorAll(".selected-lyrics");
          //Check if Already Selected
          if (p.classList.contains("selected-lyrics")) {
            p.classList.remove("selected-lyrics");
          } else {
            //Select only 6 lines at a time
            if (selectedLines.length < 6) {
              p.classList.add("selected-lyrics");
            } else {
              alert("Cannot select more than 6 lines");
              return;
            }
          }
        });
      });
    } else {
      lyricDiv.innerHTML = "<p style='color:red;'>Lyrics not available.</p>";
    }
  } catch (err) {
    lyricDiv.innerHTML = "<p style='color:red;'>Lyrics not available.</p>";
  }
};


