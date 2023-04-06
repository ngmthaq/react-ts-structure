import { events } from "./events";
import { customEvents } from "./customEvents";
import { syncEvents } from "./syncEvents";
import { periodSyncEvents } from "./periodSyncEvents";

export default class PWA {
  public static customEvents: PWACustomEvents = customEvents;
  public static syncEvents: PWASyncEvents = syncEvents;
  public static periodSyncEvents: PWAPeriodSyncEvents = periodSyncEvents;

  public static emit<T>(event: string, data: T) {
    const customEvent = new CustomEvent<T>(event, { detail: data });
    window.dispatchEvent(customEvent);
  }

  public static onSuccess(registration: ServiceWorkerRegistration) {
    events.onSuccess(registration);
  }

  public static onUpdate(registration: ServiceWorkerRegistration) {
    events.onUpdate(registration);
  }
}

export type PWACustomEvents = {
  [k: string]: (registration: ServiceWorkerRegistration, data: any) => Promise<void>;
};

export type PWASyncEvents = {
  [k: string]: {
    onSupported: (self: ServiceWorkerGlobalScope, syncEvent: any, data: any) => Promise<void>;
    onNotSupported: (registration: ServiceWorkerRegistration, data: any) => Promise<void>;
  };
};

export type PWAPeriodSyncEvents = {
  [k: string]: {
    minInterval: number;
    onSupported: (self: ServiceWorkerGlobalScope, syncEvent: any) => Promise<void>;
    onNotSupported: (registration: ServiceWorkerRegistration) => Promise<void>;
  };
};

export type PWAEvents = {
  onSuccess: (registration: ServiceWorkerRegistration) => void;
  onUpdate: (registration: ServiceWorkerRegistration) => void;
};
