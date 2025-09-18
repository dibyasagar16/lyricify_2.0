import { showNotification } from "./showNotification.js";

export const shareCard = async () => {
  showNotification("success", "Sharing Initiated.");
  const card = document.getElementById("lyricsCard");

  const canvas = await html2canvas(card, {
    useCORS: true,
    allowTaint: false,
    logging: false,
  });

  const dataURL = canvas.toDataURL("image/jpg");
  const blob = await (await fetch(dataURL)).blob();
  const file = new File([blob], "lyricify.png", { type: "image/jpeg" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "My Card",
        text: "Check out this card!",
        files: [file],
      });
    } catch (err) {
      showNotification("error", err);
    }
  } else {
    showNotification(
      "info",
      "Sharing not supported on this browser or device. Try downloading."
    );
  }
};
