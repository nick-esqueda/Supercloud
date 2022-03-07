// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SongCard from './components/SongCard';
import SongPage from './components/SongPage';
import UploadSongPage from './components/UploadSongPage';
import S3Test from './components/s3Test';
import { restoreUser } from './store/session';
import { fetchSongs } from './store/songs';

function App() {
  const dispatch = useDispatch();
  const songs = useSelector(state => Object.values(state.songs));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <>
          <Navigation />
          <Switch>

            <Route exact path="/">
              <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

              {songs.map(song => (
                <SongCard key={songs.id} song={song} />
              ))}
            </Route>

            <Route exact path="/songs/:songId(\d+)">
              <SongPage />
            </Route>

            <Route exact path="/upload">
              <UploadSongPage />
            </Route>

            
            
            
            <Route exact path="/s3-test">
              <S3Test />
            </Route>
            
            <Route>
              404 page
            </Route>
          </Switch>
        </>

      ) : (
        <h4>loading...</h4>
      )}
    </>
  );
}

export default App;
