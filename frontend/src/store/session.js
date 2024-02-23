import { csrfFetch, customFetch } from './csrf';

// ACTION VARIABLES ***************************************
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// ACTION CREATORS ****************************************
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// THUNK ACTION CREATORS **********************************
export const loginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await customFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await customFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return data; // this was originally "return res;" in the reading - why?
};

export const signupUser = (user) => async (dispatch) => {
  const {
    username, email, password, bio, location, profileImageURL, bannerImageURL
  } = user;

  const res = await customFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username, email, password, bio, location, profileImageURL, bannerImageURL
    }),
  });
  const data = await res.json();

  dispatch(setUser(data.user));
  return res;
};

export const logoutUser = () => async (dispatch) => {
  const res = await customFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};



// REDUCER ************************************************
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = {...state};
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = {...state};
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
