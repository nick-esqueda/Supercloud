import { useSelector } from 'react-redux';
import './PlayControls.css';
import Player from './Player';

export default function PlayControls() {
  const song = useSelector(state => state.songs.playing);
  console.log(song);

  return (
    <div className='play_controls'>
      <Player />

      <div className='play_controls__details'>
        <img
          src={song?.artworkURL}
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
