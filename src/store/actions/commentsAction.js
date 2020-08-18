const SET_COMMENTS = "SET_COMMENTS";
const FAIL_COMMENTS = "FAIL_COMMENTS";
const ADD_COMMENTS = "ADD_COMMENTS";
const SET_POST = "SET_POST";

export const setComments = comments => {
  return {
    type: SET_COMMENTS,
    post: comments
  };
};

export const setPost = comments => {
  return {
    type: SET_POST,
    post: comments
  };
};

export const failComments = error => {
  return {
    type: FAIL_COMMENTS,
    error: error
  };
};

export const addComments = comments => {
  return {
    type: ADD_COMMENTS,
    comments: comments
  };
};

export const getComments = () => {
  return dispatch => {
    fetch(
      "https://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json"
    )
      .then(response => response.json())
      .then(data => {
        dispatch(setComments(data));
        dispatch(setPost(data));
      })
      .catch(error => dispatch(failComments(error)));
  };
};
