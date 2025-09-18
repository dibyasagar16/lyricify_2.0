const notificationTypes = {
  success: {
    title: "Success!",
    icon: "✓",
  },
  error: {
    title: "Error!",
    icon: "✗",
  },
  info: {
    title: "Info",
    icon: "ⓘ",
  },
  warning: {
    title: "Warning",
    icon: "⚠",
  },
};

const notificationContainer = document.querySelector(".notification-container");

export const showNotification = (type, message) => {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.innerHTML = `
                <div class="notification-header">
                    <span class="notification-icon">${notificationTypes[type].icon}</span>
                    <span class="notification-title">${notificationTypes[type].title}</span>
                </div>
                <div class="notification-content">${message}</div>
                <button class="notification-close" onclick="this.closest('.notification').remove()">&times;</button>
            `;
  notificationContainer.appendChild(notification);

  // Hide after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);
};
