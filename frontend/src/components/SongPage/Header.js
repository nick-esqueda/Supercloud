import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header_container'>
      
      <div className="song_header__top">
        <div className="song_header__top_left">
          <div className="song_header__play"></div>
          <div className="song_header__song">
            <h2>song title goes here</h2>
            <NavLink to={'/artist-link-here'}>artist</NavLink>
          </div>
        </div>
        <div className="song_header__top_right">
          <span>x months ago</span>
          <span className='genre'>genre</span>
        </div>
      </div>
      
      <div className="song_header__bottom">
        <div className="song_header__waveform">
          waveform here
        </div>
      </div>
      
      <div className="song_header__right">
        <img src="https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="gradient"
        />
      </div>
      
    </div>
  )
}
