import { useState } from "react";

const useApp = () => {
  const [appStatus, setAppStatus] = useState(0);
  const [visibleAbout, setVisibleAbout] = useState(false);

  return { appStatus, setAppStatus, visibleAbout, setVisibleAbout };
};
export default useApp;
