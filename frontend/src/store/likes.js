import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const LOAD_LIKES = 'likes/LOAD_LIKES';
const LOAD_SONGS_LIKES = 'likes/LOAD_SONGS_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';


// ACTION CREATORS ****************************************
const loadLikes = (likes) => {
  return {
    type: LOAD_LIKES,
    likes
  }
}

const loadSongsLikes = (likes) => {
  return {
    type: LOAD_SONGS_LIKES,
    likes
  }
}

const addLike = (like) => {
  return {
    type: ADD_LIKE,
    like
  }
}

const removeLike = (like) => {
  return {
    type: REMOVE_LIKE,
    like
  }
}


// THUNK ACTION CREATORS **********************************
export const fetchLikes = () => async dispatch => {
  const res = await fetch(`/api/likes`);

  if (res.ok) {
    const likes = await res.json();
    dispatch(loadLikes(likes));
  }
}

export const fetchSongsLikes = songId => async dispatch => {
  const res = await fetch(`/api/likes/${songId}`);

  if (res.ok) {
    const likes = await res.json();
    dispatch(loadSongsLikes(likes));
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

export const deleteLike = (userId, songId) => async dispatch => {
  const res = await csrfFetch(`/api/likes/${userId}/${songId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const like = await res.json();
    dispatch(removeLike(like));
    return like;
  }
}


// REDUCER ************************************************
const initialState = { allLikes: {}, songsLikes: {}, usersLikes: {} }
const likesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_LIKES: {
      const allLikes = {};
      const songsLikes = {};
      const usersLikes = {};
      
      action.likes.forEach(like => {
        allLikes[like.id] = like;
        
        if (!songsLikes[like.songId]) {
          songsLikes[like.songId] = [like];
        } else {
          songsLikes[like.songId].push(like);
        }
        
        if (!usersLikes[like.userId]) {
          usersLikes[like.userId] = [like];
        } else {
          usersLikes[like.userId].push(like);
        }
        
      });
      return { allLikes, songsLikes, usersLikes };
    }

    case LOAD_SONGS_LIKES: {
      newState = { ...state }
      action.likes.forEach(like => {
        newState.songsLikes[like.userId] = like;
      });
      return newState;
    }

    case ADD_LIKE: {
      const newAllLikes = { ...state.allLikes };
      const newSongsLikes = { ...state.songsLikes };
      const newUsersLikes = { ...state.usersLikes };
      
      newAllLikes[action.like.id] = action.like;
      
      if (!newSongsLikes[action.like.songId]) {
        newSongsLikes[action.like.songId] = [action.like];
      } else {
        newSongsLikes[action.like.songId] = [...newSongsLikes[action.like.songId], action.like]
      }
      
      if (!newUsersLikes[action.like.userId]) {
        newUsersLikes[action.like.userId] = [action.like];
      } else {
        newUsersLikes[action.like.userId] = [...newUsersLikes[action.like.userId], action.like];
      }
      
      return { allLikes: newAllLikes, songsLikes: newSongsLikes, UsersLikes: newUsersLikes };
    }

    case REMOVE_LIKE: {
      newState = { ...state };
      delete newState.allLikes[action.like.id];
      
      // delete newState.songsLikes[action.like.songId];
      const newSongsLikes = newState.songsLikes[action.like.songId].filter(like => like.id !== action.like.id);
      newState.songsLikes[action.like.songId] = newSongsLikes;
      
      // delete newState.usersLikes[action.like.userId];
      const newUsersLikes = newState.usersLikes[action.like.userId].filter(like => like.id !== action.like.id);
      newState.usersLikes[action.like.userId] = newUsersLikes;
      
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default likesReducer;
