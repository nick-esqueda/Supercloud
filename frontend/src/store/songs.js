// ACTION VARIABLES ***************************************
const ADD_SONG = 'songs/ADD_SONG';
const ADD_SONGS = 'songs/ADD_SONGS'


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




// REDUCER ************************************************
const songsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG: {
      newState = {...state};
      newState[action.song.id] = action.song;
      return newState;
    }
    case ADD_SONGS: {
      const newSongs = {};
      action.songs.forEach(song => {
        if (!state[song.id]) {
          newSongs[song.id] = song;
        }
      });
      return {...state, ...newSongs}
    }
    default:
      return state;
  }
};

export default songsReducer;
