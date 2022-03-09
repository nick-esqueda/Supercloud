import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const ADD_LIKES = 'likes/ADD_LIKES';
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE ='likes/REMOVE_LIKE';


// ACTION CREATORS ****************************************
const addLikes = (likes) => {
  return {
    type: ADD_LIKES,
    likes
  }
}

const addLike = (like) => {
  return {
    type: ADD_LIKE,
    like
  }
}

const removeLike = (songId) => {
  return {
    type: REMOVE_LIKE,
    songId
  }
}


// THUNK ACTION CREATORS **********************************
export const fetchLikes = userId => async dispatch => {
  const res = await fetch(`/api/likes/${userId}`);
  
  if (res.ok) {
    const likes = await res.json();
    dispatch(addLikes(likes));
  }
}

export const postLike = (userId, songId) => async dispatch => {
  const res = await csrfFetch(`/api/likes`, {
    method: 'POST',
    body: JSON.stringify({ userId, songId })
  });
  
  if (res.ok) {
    const like = await res.json();
    dispatch(addLike(like));
    return like;
  }
}

export const deleteLike = like => async dispatch => {
  const res = await csrfFetch(`/api/likes/${like.id}`, {
    method: 'DELETE',
    body: JSON.stringify(like)
  });
  
  if (res.ok) {
    const songId = await res.json();
    dispatch(removeLike(songId));
    return songId;
  }
}


// REDUCER ************************************************
const likesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_LIKES: {
      newState = {...state};
      action.likes.forEach(like => {
        if (!state[like.songId]) {
          newState[like.songId] = like;
        }
      });
      return newState;
    }
    
    case ADD_LIKE: {
      newState = {...state};
      newState[action.like.songId] = action.like;
      return newState;
    }
    
    case REMOVE_LIKE: {
      newState = {...state};
      delete newState[action.songId];
      return newState;
    }
    
    default: {
      return state;
    }
  }
}

export default likesReducer;
