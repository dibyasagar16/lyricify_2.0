const notificationStyles = {
  emptyField: {
    title: "Empty",
    message: "Input field cannot be empty.",
    bg: "red",
  },
  noSong: {
    title: "NoSong",
    message: "Could not found the requested song.",
    bg: "red",
  },
  noLyrics: {
    title: "NoLyrics",
    message: "Lyrics not found. Try a different Song.",
    bg: "red",
  },
  noLines: {
    title: "NoLines",
    message: "Select atleast one line to continue.",
    bg: "red",
  },
};

export const showNotification = (type) => {
  const container = document.getElementById("notificationContainer");
  const style = notificationStyles[type];
  const notification = document.createElement("div");
  // notification.classList.add("notification", style.bg);
  const innerHTML = `
                <div>
                    <h4>${style.title}</h4>
                    <p>${style.message}</p>
                </div>
            `;
  notification.innerHTML = innerHTML;
  container.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
};
