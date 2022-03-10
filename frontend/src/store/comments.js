import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const ADD_COMMENT = 'songs/ADD_COMMENT';
const ADD_COMMENTS = 'songs/ADD_COMMENTS';

// ACTION CREATORS ****************************************
const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

const addComments = (comments) => {
  return {
    type: ADD_COMMENTS,
    comments
  }
}

// THUNK ACTION CREATORS **********************************
export const fetchComments = () => async dispatch => {
  const res = await fetch(`/api/comments`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(addComments(comments));
    return comments;
  }
}

// REDUCER ************************************************
const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case ADD_COMMENT: {
      newState = { ...state };
      newState[action.song.id] = action.comment;
      return newState;
    }

    case ADD_COMMENTS: {
      newState = { ...state };
      action.comments.forEach(comment => {
        if (!state[comment.id]) {
          newState[comment.id] = comment;
        }
      });
      return newState;
    }

    default: {
      return state;
    }

  }
};

export default commentsReducer;
