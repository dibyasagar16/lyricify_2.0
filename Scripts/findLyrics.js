import { showNotification } from "./showNotification.js";

//Function to Find Lyrics of Clicked Song
export const findLrics = async (songName, artist, albumName) => {
  const apiUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(
    songName
  )}&artist_name=${encodeURIComponent(artist)}${
    albumName ? `&album_name=${encodeURIComponent(albumName)}` : ""
  }`;

  let lyricDiv = document.getElementById("lyricsContent");
  lyricDiv.innerHTML = `
      <div class="loader-container">
          <div class="loader"></div>
          <div class="loader-text">Loading...</div>
      </div>`;
  lyricDiv.style.display = "flex";

  try {
    const response = await fetch(apiUrl);
    const lyricsResult = await response.json();
    // console.log(lyricsResult);
    // console.log(lyricsResult.plainLyrics);

    if (lyricsResult && lyricsResult.plainLyrics) {
      let lines = lyricsResult.plainLyrics.split("\n");
      lyricDiv.innerHTML = ""; //Clear Before Inserting Lyrics
      let filteredLines = lines.filter((line) => line !== "");
      lyricDiv.style.display = "block";
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
              showNotification(
                "info",
                "Only six lines can be selected at a time."
              );
              return;
            }
          }
        });
      });
    } else {
      showNotification("error", "Unable to find the lyrics for this gem.");
      lyricDiv.style.display = "none";
      return;
    }
  } catch (err) {
    showNotification("error", err);
  }

  // fetch(apiUrl)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((lyricsResult) => {
  //     if (lyricsResult && lyricsResult.plainLyrics) {
  //       let lines = lyricsResult.plainLyrics.split("\n");
  //       lyricDiv.innerHTML = ""; // Clear before inserting lyrics
  //       let filteredLines = lines.filter((line) => line !== "");
  //       lyricDiv.style.display = "block";

  //       filteredLines.forEach((line) => {
  //         let p = document.createElement("p");
  //         p.textContent = line;
  //         p.classList.add("lyrics-line");
  //         lyricDiv.appendChild(p);

  //         // Allow selecting lyric lines
  //         p.addEventListener("click", () => {
  //           const selectedLines = document.querySelectorAll(".selected-lyrics");

  //           if (p.classList.contains("selected-lyrics")) {
  //             // already selected → unselect
  //             p.classList.remove("selected-lyrics");
  //           } else {
  //             // limit to 6 lines
  //             if (selectedLines.length < 6) {
  //               p.classList.add("selected-lyrics");
  //             } else {
  //               showNotification(
  //                 "info",
  //                 "Only six lines can be selected at a time."
  //               );
  //               return;
  //             }
  //           }
  //         });
  //       });
  //     } else {
  //       showNotification("error", "Unable to find the lyrics for this gem.");
  //       lyricDiv.style.display = "none";
  //     }
  //   })
  //   .catch((err) => {
  //     showNotification("error", err.message || "Something went wrong.");
  //     lyricDiv.style.display = "none";
  //   });
};
