import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { loginUser, signupUser } from "../../store/session";

import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar'
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [demoUser, setDemoUser] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    const validationErrors = [];
    if (email === '') validationErrors.push('please enter your email');
    if (email && !email.includes('@')) validationErrors.push('email must be a valid');
    if (username === '') validationErrors.push('please enter a username');
    if (password === '') validationErrors.push('please enter your password');
    if (confirmPassword === '') validationErrors.push('please confirm your password');
    setValidationErrors(validationErrors);

    if (!validationErrors.length) setShowErrors(false);
  }, [email, username, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (demoUser) {
      setDemoUser(false);
      return dispatch(loginUser({ credential: 'Demo User', password: 'password' }));
    }

    if (validationErrors.length) return setShowErrors(true);

    if (password === confirmPassword) {
      setValidationErrors([]);

      dispatch(showLoading())
      dispatch(signupUser({ email, username, password }))
      .then(res => {
          dispatch(hideLoading())
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          return history.push('/');
        })
        .catch(async (res) => {
          dispatch(hideLoading())
          const data = await res.json();
          if (data && data.errors) {
            setValidationErrors(data.errors);
            setShowErrors(true);
          }
        });
    } else {
      setShowErrors(true);
      return setValidationErrors(['passwords must match']);
    }
  };

  return (
    <>
      <LoadingBar style={{ backgroundColor: '#FFFF5D', height: '4px', maxWidth: '460px', position: 'absolute', top: '0', left: '0' }} updateTime={150} progressIncrease={15} />
      <div className="signup_container">
        <h2 className="signup__header">welcome to the <span style={{ textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h2>

        <form onSubmit={onSubmit} className="signup_form">
          <div className="form_group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              className="form_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={256}
              style={
                showErrors && (validationErrors.includes('please enter your email')
                  || validationErrors.includes('email must be a valid')
                  || validationErrors.includes('email must be unique')
                ) ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null
              }
            />
          </div>

          <div className="form_group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              className="form_input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={30}
              style={
                showErrors && (validationErrors.includes('please enter a username') || validationErrors.includes('username must be unique'))
                  ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null
              }

            />

          </div>

          <div className="form_group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              className="form_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={showErrors && validationErrors.includes('please enter your password') ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null}
            />
          </div>

          <div className="form_group">
            <label htmlFor="confirmPassword">confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form_input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={
                showErrors && (validationErrors.includes('please confirm your password') || validationErrors.includes('passwords must match'))
                  ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null}
            />
          </div>

          <div className=''>
            <button type="submit" className='btn btn--primary' style={{ width: '100%', }}>sign up</button>
            <button type="submit" className='btn btn--secondary--outline'
              style={{ width: '100%', marginTop: '8px' }}
              onClick={(e) => setDemoUser(true)}
            >demo user</button>
          </div>
        </form>

        <img src='https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt='gradient'
          className='signup_image'
        />

        <ul className="signup__error_container">
          {showErrors && validationErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>

        <small className="signup__bottom">
          <div>
            by creating an account, you acknowledge that you have read and agree with our <a href="https://github.com/nick-esqueda/supercloud">
              terms of use</a> and our <a href="https://www.linkedin.com/in/nick-esqueda/">terms & conditions</a>
          </div>
        </small>

      </div>
    </>
  );
}

export default SignupForm;
