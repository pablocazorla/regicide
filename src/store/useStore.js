import { useCallback } from "react";

const STORAGE_GAME_NAME = "REGICIDE_APP_GAME";
const STORAGE_OPTIONS_NAME = "REGICIDE_APP_OPTIONS";

const STORAGE_GET = (storageName) => {
  if (typeof window !== "undefined") {
    const dataString = window.localStorage.getItem(storageName);
    if (dataString) {
      return JSON.parse(dataString);
    }
  }
  return null;
};

const STORAGE_SET = (storageName, data) => {
  if (typeof window !== "undefined" && data) {
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }
};

const STORAGE_CLEAR = (storageName) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(storageName);
  }
};

const useStore = () => {
  const getSavedGame = useCallback(() => {
    return STORAGE_GET(STORAGE_GAME_NAME);
  }, []);
  const saveGame = useCallback((data) => {
    const oldData = STORAGE_GET(STORAGE_GAME_NAME) || {};
    STORAGE_SET(STORAGE_GAME_NAME, { ...oldData, ...data });
  }, []);

  const clearGame = useCallback(() => {
    STORAGE_CLEAR(STORAGE_GAME_NAME);
  }, []);

  const getOptions = useCallback(() => {
    return STORAGE_GET(STORAGE_OPTIONS_NAME);
  }, []);
  const setOptions = useCallback((data) => {
    const oldData = STORAGE_GET(STORAGE_OPTIONS_NAME) || {};
    STORAGE_SET(STORAGE_OPTIONS_NAME, { ...oldData, ...data });
  }, []);

  return { getSavedGame, saveGame, clearGame, getOptions, setOptions };
};

export default useStore;
