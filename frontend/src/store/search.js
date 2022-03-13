// ACTION VARIABLES ***************************************
const LOAD_SEARCH = 'session/LOAD_SEARCH';


// ACTION CREATORS ****************************************
const loadSearch = (artist) => {
  return {
    type: LOAD_SEARCH,
    artist
  }
}




// THUNK ACTION CREATORS **********************************
export const fetchQuery = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const artist = await res.json();
    dispatch(loadSearch(artist))
    return artist;
  }
}



// REDUCER ************************************************
const searchReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD_SEARCH: {
      newState = { ...state };
      action.artists.forEach(artist => newState[artist.id] = artist);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default searchReducer;
