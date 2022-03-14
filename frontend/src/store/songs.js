import { csrfFetch } from "./csrf";

// ACTION VARIABLES ***************************************
const ADD_SONG = 'songs/ADD_SONG';
const ADD_SONGS = 'songs/ADD_SONGS';
const ADD_POPULAR_SONGS = 'songs/ADD_POPULAR_SONGS';
const ADD_RECENT_SONGS = 'songs/ADD_RECENT_SONGS';
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



// THUNK ACTION CREATORS **********************************
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


// REDUCER ************************************************
const initialState = { songs: {}, recentSongs: [], popularSongs: [], playing: null };
const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {

    case ADD_SONG: {
      const songs = { ...state.songs };
      songs[action.song.id] = action.song;
      return { ...state, songs };
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
      delete newState.songs[action.songId];
      return newState;
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
