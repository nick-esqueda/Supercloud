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




// REDUCER ************************************************
const initialState = { songs: null };

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG: {
      newState = {...state, [action.song.id]: action.song};
      return newState;
    }
    case ADD_SONGS: {
      
    }
    default:
      return state;
  }
};

export default songsReducer;
