import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Player({ song }) {
  
 
  return (
    <AudioPlayer
      autoPlay
      src={song.songURL}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  );
}
