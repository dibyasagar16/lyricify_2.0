const makeCard = (song, lyricsLines) => {
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
  const selectedLines = document.querySelectorAll(".selected-lyrics");
  console.log(selectedLines);
  if (selectedLines.length <= 0) {
    alert("Select at least one line to continue");
    return;
  }

  //Get the Song details Here

  //Send the lyrics to Create Card
  let finalSelectedLyrics = [];

  selectedLines.forEach((key) => {
    let line = document.createElement("p");
    line.innerText = key.innerText;
    finalSelectedLyrics.push(line);
  });
  makeCard("song", finalSelectedLyrics);
};
