// ACTION VARIABLES ***************************************
const LOAD_ARTIST = 'session/LOAD_ARTIST';
const LOAD_ARTISTS = 'session/LOAD_ARTISTS';


// ACTION CREATORS ****************************************
const loadArtist = (artist) => {
  return {
    type: LOAD_ARTIST,
    artist
  }
}

const loadArtists = (artists) => {
  return {
    type: LOAD_ARTISTS,
    artists
  }
}




// THUNK ACTION CREATORS **********************************
export const fetchArtist = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const artist = await res.json();
    dispatch(loadArtist(artist))
    return artist;
  }
}

export const fetchArtists = () => async dispatch => {
  const res = await fetch(`/api/users`);

  if (res.ok) {
    const artists = await res.json();
    dispatch(loadArtists(artists))
    return artists;
  }
}



// REDUCER ************************************************
const artistsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ARTISTS: {
      newState = { ...state };
      action.artists.forEach(artist => newState[artist.id] = artist);
      return newState;
    }
    
    case LOAD_ARTIST: {
      newState = { ...state };
      newState[action.artist.id] = action.artist;
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default artistsReducer;
