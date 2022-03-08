import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import 'react-h5-audio-player/lib/styles.css';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
  const audioPlayer = useAudioPlayer();

  return (
    <>
      <AudioPlayer
        autoPlay
        src={song?.songURL}
        onPlay={e => console.log("onPlay")}
        onPause={e => console.log('onPause')}
        ref={audioPlayer}
        // other props here
        layout='horizontal-reverse'
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        style={{
          backgroundColor: '#212121',
          paddingLeft: '0',

        }}
      />
      
    </>
  );
}
