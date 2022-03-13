// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HeaderFooter from './components/HeaderFooter';
import HomePage from './components/HomePage';
import SplashPage from './components/HomePage/SplashPage';
import SongPage from './components/SongPage';
import UploadSongPage from './components/UploadSongPage';
import AudioPlayerProvider from './Context/AudioPlayerContext';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return !isLoaded ? <h2>one second please...</h2> : (
    <AudioPlayerProvider>
      <HeaderFooter>
        <Switch>
          <Route exact path="/splash">
            <SplashPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/songs/:songId(\d+)">
            <SongPage />
          </Route>

          <Route exact path="/upload">
            <UploadSongPage />
          </Route>
          
          <Route exact path="/likes">
            <h2>sorry! this feature is currently under construction</h2>
            <small>routed here instead of / in order to see navlink activeStyle</small>
          </Route>
          
          <Route exact path="/random">
            <h2>sorry! this feature is currently under construction</h2>
            <small>routed here instead of / in order to see navlink activeStyle</small>
          </Route>

          <Route>
            <h2>sorry! we couldn't find the page you were looking for</h2>
          </Route>
        </Switch>
      </HeaderFooter>
    </AudioPlayerProvider>
  )
}

export default App;
