

// ACTION VARIABLES ***************************************
const ADD_LIKES = 'likes/ADD_LIKES';

// ACTION CREATORS ****************************************
const addLikes = (likes) => {
  return {
    type: ADD_LIKES,
    likes
  }
}


// THUNK ACTION CREATORS **********************************
export const fetchLikes = userId => async dispatch => {
  const res = await fetch('/api/likes');
  
  if (res.ok) {
    const likes = await res.json();
    dispatch(addLikes(likes));
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
    
    default: {
      return state;
    }
  }
}

export default likesReducer;
