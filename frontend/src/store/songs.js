// ACTION VARIABLES ***************************************
const ADD_SONG = 'songs/ADD_SONG';


// ACTION CREATORS ****************************************
const addSong = (song) => {
  return {
    type: ADD_SONG,
    song
  }
}



// THUNK ACTION CREATORS **********************************





// REDUCER ************************************************
const initialState = { songs: null };

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG:
      newState = {...state};
      newState.songs[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
