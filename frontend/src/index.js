import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { csrfFetch, restoreCSRF } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import * as songsActions from './store/songs';
import * as artistsActions from './store/artists';
import * as searchActions from './store/search';
import App from './App';

const store = configureStore();

restoreCSRF();

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
