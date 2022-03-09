import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const ADD_SONG = 'songs/ADD_SONG';
const ADD_SONGS = 'songs/ADD_SONGS'
const REMOVE_SONG = 'songs/REMOVE_SONG';
const SET_PLAYING = 'songs/SET_PLAYING';


// ACTION CREATORS ****************************************
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



// THUNK ACTION CREATORS **********************************
export const fetchSong = id => async dispatch => {
  const res = await fetch(`/api/songs/${id}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  }
}

export const fetchSongs = (userId, playlistId) => async dispatch => {
  if (userId) {
    console.log('pass in userId arg to get here');
  }

  if (playlistId) {
    console.log('pass in null arg, then playlistId arg to get here');
  }

  else {
    const res = await fetch(`/api/songs`);

    if (res.ok) {
      const songs = await res.json();
      dispatch(addSongs(songs));
      return songs;
    }
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


// REDUCER ************************************************
const initialState = { songs: {}, playing: null };
const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    
    case ADD_SONG: {
      newState = {...state};
      newState.songs[action.song.id] = action.song;
      return newState;
    }
    
    case ADD_SONGS: {
      const newSongs = {};
      action.songs.forEach(song => {
        if (!state.songs[song.id]) {
          newSongs[song.id] = song;
        }
      });
      return { ...state, songs: {...newSongs} }
    }
    
    case REMOVE_SONG: {
      newState = {...state};
      delete newState.songs[action.songId];
      return newState;
    }
    
    case SET_PLAYING: {
      newState = {...state};
      newState.playing = action.song;
      return newState;
    }
    
    default: {
      return state;
    }
    
  }
};

export default songsReducer;
