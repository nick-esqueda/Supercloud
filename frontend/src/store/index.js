import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import artistsReducer from './artists';
import commentsReducer from './comments';
import likesReducer from './likes';
import searchReducer from './search';

import sessionReducer from './session';
import songsReducer from './songs';

const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  likes: likesReducer,
  comments: commentsReducer,
  artists: artistsReducer,
  search: searchReducer,
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
