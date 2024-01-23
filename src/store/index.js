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

//

export const getSavedGame = () => {
  return STORAGE_GET(STORAGE_GAME_NAME);
};

export const saveGame = (data) => {
  const oldData = STORAGE_GET(STORAGE_GAME_NAME) || {};
  STORAGE_SET(STORAGE_GAME_NAME, { ...oldData, ...data });
};

export const clearGame = () => {
  STORAGE_CLEAR(STORAGE_GAME_NAME);
};

export const getOptions = () => {
  return STORAGE_GET(STORAGE_OPTIONS_NAME);
};
export const setOptions = (data) => {
  const oldData = STORAGE_GET(STORAGE_OPTIONS_NAME) || {};
  STORAGE_SET(STORAGE_OPTIONS_NAME, { ...oldData, ...data });
};

export const saveWinGame = (data) => {
  const oldData = STORAGE_GET(STORAGE_OPTIONS_NAME) || {};
  const winGames = oldData?.winGames || [];
  winGames.push(data);
  STORAGE_SET(STORAGE_OPTIONS_NAME, { ...oldData, winGames });
};
