import { events } from "./events";
import { customEvents } from "./customEvents";
import { syncEvents } from "./syncEvents";
import { periodSyncEvents } from "./periodSyncEvents";

export default class PWA {
  public registration: ServiceWorkerRegistration;
  public customEvents: PWACustomEvents = customEvents;
  public syncEvents: PWASyncEvents = syncEvents;
  public periodSyncEvents: PWAPeriodSyncEvents = periodSyncEvents;

  public constructor(registration: ServiceWorkerRegistration) {
    this.registration = registration;
  }

  public emit<T>(event: string, data: T) {
    const customEvent = new CustomEvent<T>(event, { detail: data });
    window.dispatchEvent(customEvent);
  }

  public onSuccess(registration: ServiceWorkerRegistration) {
    events.onSuccess(registration);
  }

  public onUpdate(registration: ServiceWorkerRegistration) {
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
