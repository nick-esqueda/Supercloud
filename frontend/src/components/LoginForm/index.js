import React, { useEffect, useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const validationErrors = [];
    if (credential === '') validationErrors.push('please enter a name');
    if (password === '') validationErrors.push('please enter your password');
    setValidationErrors(validationErrors);

    if (!validationErrors.length) setShowErrors(false);
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) return setShowErrors(true);

    setValidationErrors([]);

    return dispatch(loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
          setShowErrors(true);
        }
      });
  }

  return (
    <div className='login_container'>
      <h2>login</h2>

      <img src='https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        alt='login-image'
        className='login_image'
      />

      <form onSubmit={onSubmit} className="login_form">

        <div className='form_group'>
          <label htmlFor="credential">username/email</label>
          <input
            type="text"
            id="credential"
            className='form_input'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </div>


        <div className='form_group'>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id='password'
            className='form_input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='login_btn_container'>
          <button type="submit" className='btn btn--primary'>Log In</button>
        </div>
      </form>

      <ul>
        {showErrors && validationErrors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>

      <small className="login__bottom">
        bruh
      </small>
    </div>
  );
}

export default LoginForm;
