import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const LOAD_COMMENT = 'comments/ADD_COMMENT';
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_SONGS_COMMENTS = 'comments/LOAD_SONGS_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

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

const removeComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    id
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

export const postComment = comment => async dispatch => {
  const res = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(comment)
  });
  
  if (res.ok) {
    const comment = await res.json();
    dispatch(loadComment(comment));
    return comment;
  }
}

export const deleteComment = comment => async dispatch => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'DELETE'
  });
  
  if (res.ok) {
    const id = await res.json();
    dispatch(removeComment(id));
    return id;
  }
}


// REDUCER ************************************************
const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case LOAD_COMMENT: {
      newState = { ...state };
      newState[action.comment.id] = action.comment;
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
      newState = {};
      action.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }
    
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default: {
      return state;
    }

  }
};

export default commentsReducer;
