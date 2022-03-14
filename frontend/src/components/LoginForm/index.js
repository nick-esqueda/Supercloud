import React, { useEffect, useState } from 'react';
import { loginUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const validationErrors = [];
    if (credential === '') validationErrors.push('please enter your username or email');
    if (password === '') validationErrors.push('please enter your password');
    setValidationErrors(validationErrors);

    if (!validationErrors.length) setShowErrors(false);
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) return setShowErrors(true);

    setValidationErrors([]);
    
    dispatch(showLoading())
    dispatch(loginUser({ credential, password }))
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
  }

  const demoLogin = (e) => {
    dispatch(showLoading())

    setCredential('Demo User');
    setPassword('password');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(loginUser({ credential: 'Demo User', password: 'password' }))
      .then(res => {
        dispatch(hideLoading())
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return history.push('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
          setShowErrors(true);
        }
      });
  }

  return (
    <>
      <LoadingBar style={{ backgroundColor: '#FFFF5D', height: '4px', maxWidth: '460px', position: 'absolute', top: '0', left: '0' }} updateTime={150} progressIncrease={15} />
      <div className='login_container'>
        <h2>login</h2>

        <img src='https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt='gradient'
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
              style={showErrors && validationErrors.includes('please enter your username or email') ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null}
              maxLength={256}
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
              style={showErrors && validationErrors.includes('please enter your password') ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null}
            />
          </div>

          <div className='login_btn_container'>
            <button type="button" onClick={demoLogin} className='btn btn--secondary--outline'>demo user</button>
            <button type="submit" className='btn btn--primary'>log in</button>
          </div>
        </form>

        <ul className='login__error_container'>
          {showErrors && validationErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>



        <a href='https://github.com/nick-esqueda/supercloud' className="login__bottom">
          JavaScript | Node.js | Express.js | React.js | Redux | PostgreSQL Sequelize | HTML | CSS | Git | AWS S3
        </a>

      </div>
    </>
  );
}

export default LoginForm;
