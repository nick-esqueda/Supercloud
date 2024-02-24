import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../store/songs';
import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';
import SongBadge from '../SongBadge/SongBadge';
import './SplashPage.css';

export default function SplashPage() {
  const dispatch = useDispatch();
  const popularSongs = useSelector(state => state.songs.popularSongs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);
  
  return popularSongs.length && (
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

      <h2 style={{ borderBottom: '1px solid #535353', margin: '10px' }}>hear what's trending right now on supercloud</h2>

      <div className='splash__grid'>
        {popularSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      {/* <h2 style={{ borderBottom: '1px solid #535353', margin: '10px' }}>hear what's trending right now on supercloud</h2> */}

      <div className='cta'>
        <h2>thanks for listening. now join in.</h2>
        <h3>create an account to save tracks, share your music, and join the conversation. all for free.</h3>
        <SignupModal />
        <div className='flexRow' >
          already have an account? 
          <LoginModal />
        </div>
        

      </div>

    </div>
  )
}
