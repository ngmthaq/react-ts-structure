import React from "react";
import { usePWA } from "plugins/pwa";

const Home: React.FC<{}> = () => {
  const { registration } = usePWA();

  const onShowNotification = () => {
    if (registration) {
      registration.showNotification("Notification title");
    }
  };

  return (
    <div>
      <button onClick={onShowNotification}>Open notification</button>
    </div>
  );
};

export default Home;
