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
      newState = { ...state };
      action.likes.forEach(like => {
        newState.allLikes[like.id] = like;
        newState.songsLikes[like.userId] = like;
        newState.usersLikes[like.songId] = like;
      });
      return newState;
    }

    case LOAD_SONGS_LIKES: {
      newState = { ...state }
      action.likes.forEach(like => {
        newState.songsLikes[like.userId] = like;
      });
      return newState;
    }

    case ADD_LIKE: {
      newState = { ...state };
      newState.allLikes[action.like.id] = action.like;
      newState.songsLikes[action.like.userId] = action.like
      newState.usersLikes[action.like.songId] = action.like;
      return newState;
    }

    case REMOVE_LIKE: {
      newState = { ...state };
      delete newState.allLikes[action.like.id];
      delete newState.songsLikes[action.like.userId];
      delete newState.usersLikes[action.like.songId];
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default likesReducer;
