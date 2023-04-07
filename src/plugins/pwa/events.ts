import { PWAEvents } from ".";
import { EVENT_UPDATE_FOUND } from "const/events.const";
import EventBus from "plugins/bus";

export const events: PWAEvents = {
  onSuccess(registration) {},
  onUpdate(registration) {
    EventBus.emit(EVENT_UPDATE_FOUND, null);
  },
};
