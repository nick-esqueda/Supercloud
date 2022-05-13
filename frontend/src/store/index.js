import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import artistsReducer from './artists';
import searchReducer from './search';

import sessionReducer from './session';
import songsReducer from './songs';

const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  artists: artistsReducer,
  search: searchReducer,
  loadingBar: loadingBarReducer
});

let enhancer;
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
