import { showNotification } from "./showNotification.js";

export const downloadCard = (card) => {
  showNotification("success", "Download Initiated.");
  html2canvas(card, {
    useCORS: true,
    allowTaint: false,
    logging: false,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "lyricify.jpg";
    link.href = canvas.toDataURL("image/jpg");
    link.click();
  });
};
