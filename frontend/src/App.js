// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HeaderFooter from './components/HeaderFooter';
import SongCard from './components/SongCard';
import SongPage from './components/SongPage';
import UploadSongPage from './components/UploadSongPage';
import AudioPlayerProvider from './Context/AudioPlayerContext';
import { fetchLikes } from './store/likes';
import { restoreUser } from './store/session';
import { fetchSongs } from './store/songs';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => Object.values(state.songs.songs));
  const likes = useSelector(state => state.likes);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
    dispatch(fetchSongs());
    dispatch(fetchLikes());
  }, [dispatch]);
  
  useEffect(() => {
    // if (user) dispatch(fetchLikes(user.id));
  }, [user])

  return (
    <>
      {isLoaded ? (
        <AudioPlayerProvider>
          <HeaderFooter>
            <Switch>
              <Route exact path="/">
                <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

                <ul style={{ width: '100%' }}>
                  {songs.map(song => (
                    <SongCard key={song.id} song={song} like={user.Likes.find(like => song.id === like.songId)} />
                  ))}

                </ul>
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

      ) : (
        <h4>loading...</h4>
      )}
    </>
  );
}

export default App;
