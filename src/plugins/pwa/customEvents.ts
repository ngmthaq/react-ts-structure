import { setLocalForage } from "helpers/storage.helper";
import { PWACustomEvents } from ".";
import { EVENT_REQUEST_NOTI_PERMISSION } from "const/events.const";
import { KEY_NOTIFICATION_PERMISSION } from "const/key.const";

export const customEvents: PWACustomEvents = {
  [EVENT_REQUEST_NOTI_PERMISSION]: async (reg, data) => {
    if ("Notification" in window) {
      if (window.Notification.permission === "default") {
        let permission = await window.Notification.requestPermission();
        setLocalForage<string>(KEY_NOTIFICATION_PERMISSION, permission);
      }
    } else {
      console.info("Notification is not supported");
    }
  },
};
