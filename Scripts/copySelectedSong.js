export const copySelectedSong = (songData) => {
  // console.log(songData)
  const selectedSongDiv = document.getElementById("selectedSongInfo");
  selectedSongDiv.innerHTML = `
    <div class="selected-song song-card">
      <img
        src="${songData.imgSrc}"
        alt="Song Banner"
      />
      <div class="song-details">
        <h3 class="song-name">${songData.songName}</h3>
        <p class="artist-name">${songData.artist}</p>
        
      </div>
    </div>
  `;
};
