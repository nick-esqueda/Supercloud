import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import 'react-h5-audio-player/lib/styles.css';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
 
  return (
    <AudioPlayer
      autoPlay
      src={song?.songURL}
      onPlay={e => console.log("onPlay")}
      // other props here
      layout='horizontal-reverse'
      customAdditionalControls={[]}
      style={{
        backgroundColor: '#212121',
        paddingLeft: '0',
        
      }}
    />
  );
}
