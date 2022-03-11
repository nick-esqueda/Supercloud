import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Footer.css';
import Player from './Player';

export default function Footer() {
  const history = useHistory();
  const song = useSelector(state => state.songs.playing);

  return (
    <div id='footer'>
      <div className='play_controls'>
        <div className='player_wrapper'>

          <Player />
        </div>

        <div className='play_controls__details'>
          <img
            src={song ? song.artworkURL : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
            alt=''
            style={{ cursor: 'pointer' }}
            onClick={() => song ? history.push(`/songs/${song.id}`) : null}
          />

          <div className='flexColLeft'>
            <span style={{ color: '#b3b3b3', cursor: 'pointer' }}
              onClick={() => song ? history.push(`/users/${song.User.id}`) : null}
            >
              {song ? song.User.username : "..."}
            </span>
            <span style={{ cursor: 'pointer' }}
              onClick={() => song ? history.push(`/songs/${song.id}`) : null}
            >
              {song ? song.title : "..."}
            </span>
          </div>

          <div>

          </div>
        </div>
      </div>
    </div>
  );
}
