const SET_ADMIN_DISPLAY_MODE = "SET_ADMIN_DISPLAY_MODE";

const setAdminDisplayMode = (adminDisplayMode) => {
  let action = {
    type: SET_ADMIN_DISPLAY_MODE,
    adminDisplayMode: adminDisplayMode
  };
  return action;
};

export {SET_ADMIN_DISPLAY_MODE, setAdminDisplayMode}
