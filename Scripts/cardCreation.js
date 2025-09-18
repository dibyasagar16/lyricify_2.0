const makeCard = (selectedSong, lyricsLines) => {
  // console.log(selectedSong);
  let song = document.createElement("div");
  song.className="song-card"
  song.innerHTML = selectedSong.innerHTML;
  let lyricsCardSongDetails = document.getElementById("lyricsCardSongDetails");
  lyricsCardSongDetails.innerHTML = '';
  lyricsCardSongDetails.appendChild(song);

  let cardLyricsDiv = document.getElementById("cardLyrics");
  cardLyricsDiv.innerHTML = "";
  lyricsLines.forEach((key) => {
    cardLyricsDiv.innerHTML += key.innerHTML;
    cardLyricsDiv.innerHTML += "<br>";
  });
};

const target = document.getElementById("customization");

export const createCard = () => {
  target.classList.remove("hidden");
  target.scrollIntoView({
    behavior: "smooth",
  });

  // console.log(selectedSong);
  const selectedLines = document.querySelectorAll(".selected-lyrics");
  console.log(selectedLines);
  if (selectedLines.length <= 0) {
    alert("Select at least one line to continue");
    return;
  }

  //Get the Song details Here
  const selectedSong = document.querySelector(".selected-song-info .selected-song");
  console.log(selectedSong);
  //Send the lyrics to Create Card
  let finalSelectedLyrics = [];

  selectedLines.forEach((key) => {
    let line = document.createElement("p");
    line.innerText = key.innerText;
    finalSelectedLyrics.push(line);
  });
  makeCard(selectedSong, finalSelectedLyrics);
};
