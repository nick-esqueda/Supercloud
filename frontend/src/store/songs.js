import { csrfFetch } from "./csrf";
import { getTimeElapsed, normalizeOneLevel } from "./utils";

// ACTION VARIABLES ***************************************
// SONGS -----------------------
const ADD_SONG = 'songs/ADD_SONG';
const LOAD_SONGS = 'songs/LOAD_SONGS';
const LOAD_ADDITIONAL_SONGS = 'songs/LOAD_ADDITIONAL_SONGS';
const ADD_POPULAR_SONGS = 'songs/ADD_POPULAR_SONGS';
const ADD_RECENT_SONGS = 'songs/ADD_RECENT_SONGS';
const REMOVE_SONG = 'songs/REMOVE_SONG';
const SET_PLAYING = 'songs/SET_PLAYING';

// LIKES -----------------------
const LOAD_LIKES = 'likes/LOAD_LIKES';
const LOAD_SONGS_LIKES = 'likes/LOAD_SONGS_LIKES'
const LOAD_USERS_LIKES = 'likes/LOAD_USERS_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';


// COMMENTS -----------------------
const ADD_COMMENT = 'comments/ADD_COMMENT';
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_SONGS_COMMENTS = 'comments/LOAD_SONGS_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';


// ACTION CREATORS ****************************************
// SONGS ----------------------------
const addSong = (song) => {
  return {
    type: ADD_SONG,
    song
  }
}

const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
    songs
  }
}

const loadAdditionalSongs = (songs) => {
  return {
    type: LOAD_ADDITIONAL_SONGS,
    songs
  }
}

const addPopularSongs = (songs) => {
  return {
    type: ADD_POPULAR_SONGS,
    songs
  }
}

const addRecentSongs = (songs) => {
  return {
    type: ADD_RECENT_SONGS,
    songs
  }
}

const removeSong = (songId) => {
  return {
    type: REMOVE_SONG,
    songId
  }
}

export const setPlaying = (song) => {
  return {
    type: SET_PLAYING,
    song
  }
}


// LIKES ----------------------------
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

const loadUsersLikes = (likes) => {
  return {
    type: LOAD_USERS_LIKES,
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


// COMMENTS ----------------------------
const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
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

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment
  }
}




// THUNK ACTION CREATORS **********************************
// SONGS ----------------------------
export const fetchSong = songId => async dispatch => {
  const res = await fetch(`/api/songs/${songId}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  }
}

export const fetchSongs = () => async dispatch => {
  const res = await fetch(`/api/songs`);

  if (res.ok) {
    const { orderByPlays, orderByRecent } = await res.json();
    dispatch(loadSongs(orderByPlays));
    dispatch(addPopularSongs(orderByPlays));
    dispatch(addRecentSongs(orderByRecent));
    return { orderByPlays, orderByRecent };
  }
}

export const fetchArtistsSongs = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/songs`);
  
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongs(songs));
  }
}

export const fetchArtistsLikedSongs = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/likes`);
  
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadAdditionalSongs(songs));
    return songs;
  }
}

export const postSong = song => async dispatch => {
  const res = await csrfFetch('/api/songs', {
    method: 'POST',
    body: JSON.stringify(song)
  });

  if (res.ok) {
    const newSong = await res.json();
    dispatch(addSong(newSong));
    return newSong;
  }
}

export const editSong = song => async dispatch => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    body: JSON.stringify(song)
  });

  if (res.ok) {
    const editedSong = await res.json();
    dispatch(addSong(editedSong));
    return editedSong;
  }
}

export const editSongPlays = song => async dispatch => {
  const res = await csrfFetch(`/api/songs/${song.id}/plays`, {
    method: "PUT",
    body: JSON.stringify(song)
  });

  if (res.ok) {
    const editedSong = await res.json();
    dispatch(addSong(editedSong));
    return editedSong;
  }
}

export const deleteSong = id => async dispatch => {
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const songId = await res.json();
    dispatch(removeSong(songId));
    return;
  }
}


// LIKES ----------------------------
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



// COMMENTS ----------------------------
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
    dispatch(addComment(comment));
    return comment;
  }
}

export const deleteComment = comment => async dispatch => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(removeComment(comment));
    return comment;
  }
}




// REDUCER ************************************************
const initialState = { songs: {}, recentSongs: [], popularSongs: [], playing: null };
const songsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    // SONGS {} -------------------------------------------------
    case ADD_SONG: {
      return {
        ...state,
        songs: {
          ...state.songs,
          [action.song.id]: action.song
        }
      };
    }

    case LOAD_SONGS: {
      return {
        ...state,
        songs: {
          ...normalizeOneLevel(action.songs)
        }
      };
    }
    
    case LOAD_ADDITIONAL_SONGS: {
      return {
        ...state,
        songs: {
          ...state.songs,
          ...normalizeOneLevel(action.songs)
        }
      }
    }

    case ADD_POPULAR_SONGS: {
      const popularSongs = [...action.songs];
      return { ...state, popularSongs }
    }

    case ADD_RECENT_SONGS: {
      const recentSongs = [...action.songs];
      return { ...state, recentSongs }

    }

    case REMOVE_SONG: {
      newState = { ...state };
      delete newState.songs[action.songId];

      const oldRecentSongs = [...state.recentSongs];
      const oldPopularSongs = [...state.popularSongs];

      const recentSongs = oldRecentSongs.filter(song => song.id !== action.id);
      const popularSongs = oldPopularSongs.filter(song => song.id !== action.id);

      return { ...newState, recentSongs, popularSongs };
    }

    case SET_PLAYING: {
      return { ...state, playing: action.song };
    }


    // LIKES [] -------------------------------------------------
    // isLiked should pull from this "likes" array, instead of from the session user's "likes" property
    
    case ADD_LIKE: {
      const songId = action.like.songId;
      
      return {
        ...state,
        songs: {
          ...state.songs,
          [songId]: {
            ...state.songs[songId],
            Likes: [action.like, ...state.songs[songId].Likes]
          }
        }
      }  
    }

    case REMOVE_LIKE: {
      const songId = action.like.songId;
      const arrWithoutLike = state.songs[songId].Likes.filter(like => like.id !== action.like.id);
      
      return {
        ...state,
        songs: {
          ...state.songs,
          [songId]: {
            ...state.songs[songId],
            Likes: arrWithoutLike
          }
        }
      }
    }


    // COMMENTS -------------------------------------------------
    case ADD_COMMENT: {
      const songId = action.comment.songId;
      action.comment.createdAt = getTimeElapsed(action.comment.createdAt);
      
      return {
        ...state,
        songs: {
          [songId]: {
            ...state.songs[songId],
            Comments: [action.comment, ...state.songs[songId].Comments]
          }
        }
      }
    }

    case REMOVE_COMMENT: {
      const songId = action.comment.songId;
      const arrWithoutComment = state.songs[songId].Comments.filter(comment => comment.id !== action.comment.id);
      
      return {
        ...state,
        songs: {
          [songId]: {
            ...state.songs[songId],
            Comments: arrWithoutComment
          }
        }
      }
    }


    default: {
      return state;
    }

  }
};

export default songsReducer;
