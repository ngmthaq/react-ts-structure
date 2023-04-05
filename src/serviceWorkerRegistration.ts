// This optional code is used to register a service worker.
// register() is not called by default.

import PWA from "plugins/pwa";

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export async function register(config?: Config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", async () => {
      const serviceWorkerPath = `${process.env.PUBLIC_URL}/service-worker.js`;

      // Is not localhost. Just register service worker
      if (!isLocalhost) {
        registerValidSW(serviceWorkerPath, config);
      }
    });
  }
}

async function registerValidSW(serviceWorkerPath: string, config?: Config) {
  try {
    const registration = await navigator.serviceWorker.register(serviceWorkerPath);

    Object.entries(PWA.customEvents).forEach(([event, callback]) => {
      window.addEventListener(event, async (e: any) => {
        await callback(registration, e.details);
      });
    });

    Object.keys(PWA.syncEvents).forEach(event => {
      window.addEventListener(event, () => {
        if ("sync" in registration) {
          const sync: any = registration.sync;
          sync.register(event);
        }
      });
    });

    registration.addEventListener("updatefound", () => {
      const serviceWorker = registration.installing;
      if (serviceWorker === null) return;
      serviceWorker.addEventListener("statechange", () => {
        if (serviceWorker.state === "activating") {
          console.info("Activating service worker");
        }

        if (serviceWorker.state === "activated") {
          console.info("Service worker activated");
        }

        if (serviceWorker.state === "installing") {
          console.info("Installing service worker");
        }

        if (serviceWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.info("New content is available and will be used when all tabs for this page are closed.");

            // Execute callback
            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.info("Content is cached for offline use.");

            // Execute callback
            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }

        if (serviceWorker.state === "parsed") {
          console.info("Service worker parsed");
        }

        if (serviceWorker.state === "redundant") {
          console.info("Service worker redundant");
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function unregister() {
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.unregister();
    }
  } catch (error) {
    console.error(error);
  }
}
