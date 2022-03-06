// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SongCard from './components/SongCard';
import SongPage from './components/SongPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>
              <SongCard />
            </Route>

            <Route exact path="/songs/:songId(\\d+)">
              <SongPage />
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
