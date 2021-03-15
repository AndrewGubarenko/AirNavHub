const SET_FILES = "SET_FILES";

const setFiles = (listOfFiles, filesVisibility) => {
  let action = {
    type: SET_FILES,
    listOfFiles: listOfFiles,
    filesVisibility: filesVisibility
  };
  return action;
};

export {SET_FILES, setFiles}
