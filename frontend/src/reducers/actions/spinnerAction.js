const SET_SPINNER_VISIBILITY = "SET_SPINNER_VISIBILITY";

const setSpinnerVisibility = (spinnerVisibility) => {
  let action = {
    type: SET_SPINNER_VISIBILITY,
    spinnerVisibility: spinnerVisibility
  };
  return action;
};

export {SET_SPINNER_VISIBILITY, setSpinnerVisibility}
