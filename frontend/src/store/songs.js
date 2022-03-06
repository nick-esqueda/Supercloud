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
    case ADD_SONG:
      newState = {...state};
      newState.songs[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
