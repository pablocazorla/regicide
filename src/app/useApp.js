import { useCallback, useState, useEffect } from "react";

const useApp = () => {
  const [appStatus, setAppStatus] = useState(0);
  const [visibleAbout, setVisibleAbout] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setAppStatus(1);
    //
    const detectFullscreen = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    detectFullscreen();

    window.addEventListener("fullscreenchange", detectFullscreen);

    return () => {
      window.removeEventListener("fullscreenchange", detectFullscreen);
    };
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  return {
    appStatus,
    setAppStatus,
    visibleAbout,
    setVisibleAbout,
    isFullScreen,
    toggleFullScreen,
  };
};
export default useApp;
