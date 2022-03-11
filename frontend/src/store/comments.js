import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const LOAD_COMMENT = 'songs/ADD_COMMENT';
const LOAD_COMMENTS = 'songs/LOAD_COMMENTS';
const LOAD_SONGS_COMMENTS = 'songs/LOAD_SONGS_COMMENTS';

// ACTION CREATORS ****************************************
const loadComment = (comment) => {
  return {
    type: LOAD_COMMENT,
    comment
  }
}

const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

const loadSongsComments = (comments) => {
  return {
    type: LOAD_SONGS_COMMENTS,
    comments
  }
}

// THUNK ACTION CREATORS **********************************
export const fetchComments = () => async dispatch => {
  const res = await fetch(`/api/comments`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(loadComments(comments));
    return comments;
  }
}

export const fetchSongsComments = songId => async dispatch => {
  const res = await fetch(`/api/comments/${songId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(loadSongsComments(comments));
    return comments;
  }
}

// REDUCER ************************************************
const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case LOAD_COMMENT: {
      newState = { ...state };
      newState[action.song.id] = action.comment;
      return newState;
    }

    case LOAD_COMMENTS: {
      newState = { ...state };
      action.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }

    case LOAD_SONGS_COMMENTS: {
      newState = { ...state };
      action.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }

    default: {
      return state;
    }

  }
};

export default commentsReducer;
