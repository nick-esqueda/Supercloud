import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import 'react-h5-audio-player/lib/styles.css';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
  const { audioPlayer, setPaused } = useAudioPlayer();

  return (
    <>
      <AudioPlayer
        autoPlay
        src={song?.songURL}
        onPlay={e => setPaused(false)}
        onPause={e => setPaused(true)}
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
