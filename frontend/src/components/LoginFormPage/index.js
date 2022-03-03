import React, { useEffect, useState } from 'react';
import { login } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
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

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) return setShowErrors(true);

    setValidationErrors([]);

    return dispatch(login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
          setShowErrors(true);
        }
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <ul>
        {showErrors && validationErrors.map((err, i) => (
            <li key={i}>{err}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          // required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
