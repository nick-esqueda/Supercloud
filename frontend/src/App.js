// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded
        ? <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
          </Switch>
        : <h4>loading...</h4>
      }
    </>
  );
}

export default App;
