import { useEffect, useState } from "react";
import PWA, { ServiceWorkerActiveEvent } from "plugins/pwa";

const usePWA = () => {
  const [pwa, setPWA] = useState<PWA | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [events, setEvents] = useState<Array<{ eventName: string; data: any }>>([]);

  function dispatchPWAEvent<T>(eventName: string, data?: T) {
    setEvents(state => [...state, { eventName, data }]);
  }

  useEffect(() => {
    const onSWActive = async () => {
      const reg = await navigator.serviceWorker.ready;
      setPWA(new PWA(reg));
      setRegistration(reg);
    };

    window.addEventListener(ServiceWorkerActiveEvent, async () => {
      await onSWActive();
    });

    return window.removeEventListener(ServiceWorkerActiveEvent, async () => {
      await onSWActive();
    });
  });

  useEffect(() => {
    if (registration && pwa && events.length > 0) {
      let event = events.find((e, i) => i === 0);
      if (event) {
        pwa.emit(event.eventName, event.data);
        setEvents(state => state.filter(e => e.eventName !== event?.eventName));
      }
    }
  }, [registration, pwa, events, setEvents]);

  return { pwa, registration, dispatchPWAEvent };
};

export default usePWA;
