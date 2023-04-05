import { PWACustomEvents } from ".";
import { EVENT_REQUEST_NOTI_PERMISSION } from "const/events.const";

export const customEvents: PWACustomEvents = {
  [EVENT_REQUEST_NOTI_PERMISSION]: async (reg, data) => {
    if ("Notification" in window) {
      if (window.Notification.permission === "default") {
        window.Notification.requestPermission();
      }
    } else {
      console.info("Notification is not supported");
    }
  },
};
