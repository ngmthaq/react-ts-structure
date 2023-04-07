import React from "react";
import { useAppDispatch, usePWA } from "plugins/hooks";
import { CommonActions } from "store/reducers/common.reducer";

const Home: React.FC<{}> = () => {
  const { registration } = usePWA();
  const dispatch = useAppDispatch();

  const onShowNotification = () => {
    if (registration) {
      registration.showNotification("Notification title");
    }
  };

  const onShowToast = () => {
    dispatch(
      CommonActions.setNotification({
        variant: "primary",
        textVariant: "light",
        message: "New updated version detected, click here to refresh",
        isOpen: true,
      }),
    );
  };

  const onFetch = () => {
    fetch("https://6416b96b6dc4e32a25576a6b.mockapi.io/api/v1/todos");
  };

  return (
    <div>
      <button onClick={onShowToast}>Open toast</button>
      <br />
      <button onClick={onShowNotification}>Open system notification</button>
      <br />
      <button onClick={onFetch}>Fetch</button>
    </div>
  );
};

export default Home;
