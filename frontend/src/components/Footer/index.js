import { useSelector } from 'react-redux';
import './Footer.css';
import Player from './Player';

export default function Footer() {
  const song = useSelector(state => state.songs.playing);

  return (
    <div className='play_controls'>
      <Player />

      <div className='play_controls__details'>
        <img
          src={song ? song?.artworkURL : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
          alt=''
        />

        <div className='flexColLeft'>
          <span style={{ color: '#b3b3b3' }}>{song?.User.username}</span>
          <span>{song?.title}</span>
        </div>

        <div>

        </div>
      </div>
    </div>
  );
}
