// import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SignupForm from './components/SignupForm';
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

            </Route>
            {/* <Route exact path="/login">
              <LoginForm />
            </Route> */}
            {/* <Route exact path="/signup">
              <SignupForm />
            </Route> */}
          </Switch>
        </>

      ) : (
        <h4>loading...</h4>
      )}
    </>
  );
}

export default App;
