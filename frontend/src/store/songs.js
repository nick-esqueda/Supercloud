import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
// SONGS -----------------------
const ADD_SONG = 'songs/ADD_SONG';
const ADD_SONGS = 'songs/ADD_SONGS';
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
const LOAD_COMMENT = 'comments/ADD_COMMENT';
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

const addSongs = (songs) => {
  return {
    type: ADD_SONGS,
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
    dispatch(addSongs(orderByPlays));
    dispatch(addPopularSongs(orderByPlays));
    dispatch(addRecentSongs(orderByRecent));
    return { orderByPlays, orderByRecent };
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

export const fetchUsersLikes = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/likes`);

  if (res.ok) {
    const likes = await res.json();
    dispatch(loadUsersLikes(likes));
    return likes;
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
const initialState = { songs: {}, recentSongs: [], popularSongs: [], playing: null };
const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {

    case ADD_SONG: {
      const songs = { ...state.songs };
      songs[action.song.id] = action.song;

      // const oldRecentSongs = [...state.recentSongs];
      // const oldPopularSongs = [...state.popularSongs];

      // const recentSongs = oldRecentSongs.map(song => {
      //   if (song.id === action.song.id) return action.song;
      // });

      // const popularSongs = oldPopularSongs.map(song => {
      //   if (song.id === action.song.id) return action.song;
      // });

    return { ...state, songs, /*recentSongs, popularSongs*/ };
    }

    case ADD_SONGS: {
      const songs = { ...state.songs };
      action.songs.forEach(song => {
        songs[song.id] = song;
      });
      return { ...state, songs };
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
      const oldRecentSongs = [...state.recentSongs];
      const oldPopularSongs = [...state.popularSongs];
      
      delete newState.songs[action.songId];
      
      const recentSongs = oldRecentSongs.filter(song => song.id !== action.id);
      
      const popularSongs = oldPopularSongs.filter(song => song.id !== action.id);
      
      return { ...newState, recentSongs, popularSongs };
    }

    case SET_PLAYING: {
      newState = { ...state };
      newState.playing = action.song;
      return newState;
    }

    default: {
      return state;
    }

  }
};

export default songsReducer;
