const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

export const setTheme = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // Update icon based on theme
  const sunIcon = themeToggle.querySelector(".sun-icon");
  const moonIcon = themeToggle.querySelector(".moon-icon");
  if (sunIcon && moonIcon) {
    // Ensure icons exist before trying to access
    if (theme === "light") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }
};
