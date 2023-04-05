export default class EventBus {
  public static emit<T>(event: string, data: T) {
    const customEvent = new CustomEvent<T>(event, { detail: data });
    window.dispatchEvent(customEvent);
  }

  public static on<T>(event: string, callback: EventBusEventListener<T>) {
    window.addEventListener(event, (e: any) => callback(e?.detail || {}));
  }

  public static off<T>(event: string, callback: EventBusEventListener<T>) {
    window.removeEventListener(event, (e: any) => callback(e?.detail || {}));
  }
}

export type EventBusEventListener<T> = (data: T) => void;
