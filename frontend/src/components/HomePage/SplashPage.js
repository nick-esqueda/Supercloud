import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';
import './SplashPage.css';

export default function SplashPage() {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  // if (user) history.push('/');

  return (
    <div className='splash_container'>
      <div className='splash_header'>
        <img className='splash_bg' src="https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt='gradient'
        ></img>

        <div className='splash__greeting'>
          <span className='greeting__left'>looking for music? <br /> you're in the right place.</span>
          <span className='greeting__right'>super<span style={{ textDecoration: 'overline', textDecorationColor: '#FFFF5d' }}>cloud</span></span>
        </div>


      </div>

      <div className='splash_buttons'>
        <LoginModal />
        <SignupModal />
      </div>

    </div>
  )
}
