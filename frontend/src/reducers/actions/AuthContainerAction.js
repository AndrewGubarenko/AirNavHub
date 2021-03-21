const SET_IS_AUTH_CONTAINER_VISIBLE = "SET_IS_AUTH_CONTAINER_VISIBLE";

const setIsAuthContainerVisible = (isAuthVisible) => {
  let action = {
    type: SET_IS_AUTH_CONTAINER_VISIBLE,
    isAuthVisible: isAuthVisible
  };
  return action;
};

export {SET_IS_AUTH_CONTAINER_VISIBLE, setIsAuthContainerVisible}
