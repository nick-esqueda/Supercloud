import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import SongCardSmall from '../SongCard/SongCardSmall';

export default function HomeSidebar({ user, usersPlayCount, usersLikedSongs }) {
  return (
    <div className='home__sidebar'>
      <div className='greeting'>
        <h3>hi {user.username}, you've gotten</h3>
        <h3 style={{ margin: '24px 0', fontWeight: '400', fontSize: '32px', fontStyle: 'normal' }}>
          {usersPlayCount} plays
        </h3>
        <h3>in total since you joined.</h3>

        <NavLink to={`/users/${user.id}`} className='btn btn--primary--outline'
          onClick={() => alert('Sorry! This feature is currently under construction')}
        >view your profile</NavLink>
      </div>


      <div className='sidebar_container'>
        <h4 className='flexRowBetween'>
          <div className='alignItems'>
            <FontAwesomeIcon icon={faHeart} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', }}></FontAwesomeIcon>
            &nbsp;songs you liked
          </div>

          <NavLink to={`/users/${user.id}/likes`} className="italic">view all</NavLink>
        </h4>

        <ul className="songs">
          {usersLikedSongs.forEach((song, i) => console.log(`USERS LIKED SONG #${i + 1}`, song))}
          {/* {usersLikedSongs.map((song) => (
            <li key={song.id}><SongCardSmall song={song} artist={song.User} /></li>
          ))} */}
        </ul>
      </div>

    </div>
  )
}
