import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { csrfFetch, restoreCSRF } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import * as songsActions from './store/songs';
import * as likesActions from './store/likes';
import * as commentsActions from './store/comments';
import * as artistsActions from './store/artists';
import App from './App';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.songsActions = songsActions;
  window.likesActions = likesActions;
  window.commentsActions = commentsActions;
  window.artistsActions = artistsActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
