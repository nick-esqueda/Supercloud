// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Backdrop from './components/Backdrop';
import HeaderFooter from './components/HeaderFooter';
import HomePage from './components/HomePage';
import SongPage from './components/SongPage';
import UploadSongPage from './components/UploadSongPage';
import AudioPlayerProvider from './Context/AudioPlayerContext';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return !isLoaded ? null : (
    <AudioPlayerProvider>
      <HeaderFooter>
        <Backdrop />
        
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/songs/:songId(\d+)">
            <SongPage />
          </Route>

          <Route exact path="/upload">
            <UploadSongPage />
          </Route>

          <Route>
            404 page
          </Route>
        </Switch>
      </HeaderFooter>
    </AudioPlayerProvider>
  )
}

export default App;
