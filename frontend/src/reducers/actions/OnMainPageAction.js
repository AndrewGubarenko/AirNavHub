const SET_TO_MAIN_DISPLAY_MODE = "SET_TO_MAIN_DISPLAY_MODE";

const setToMainDisplayMode = (toMainDisplayMode) => {
  let action = {
    type: SET_TO_MAIN_DISPLAY_MODE,
    toMainDisplayMode: toMainDisplayMode
  };
  return action;
};

export {SET_TO_MAIN_DISPLAY_MODE, setToMainDisplayMode}
