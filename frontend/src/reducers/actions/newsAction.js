const SET_NEWS = "SET_NEWS";

const setNews = (listOfNews) => {
  let action = {
    type: SET_NEWS,
    listOfNews: listOfNews
  };
  return action;
};

export {SET_NEWS, setNews}
