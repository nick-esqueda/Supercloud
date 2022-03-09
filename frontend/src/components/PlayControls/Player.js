import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from 'react';

export default function Player() {
  const song = useSelector(state => state.songs.playing);
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  
  const [timer, setTimer] = useState('');

  useEffect(() => {
    console.log('CLEARING TIMER.');
    clearTimeout(timer);
  }, [paused]);

  const onPlay = () => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      console.log('TIMER DONE! HERE IS SONG TITLE...', song.title);
    }, 5000))

    setPaused(false);
  }
  
  const onPause = () => {
    clearTimeout(timer);
    setPaused(true);
  }
  
  return (
    <>
      <AudioPlayer
        autoPlay
        src={song?.songURL}
        onPlay={e => {
          onPlay()
        }}
        onPause={e => {
          onPause()
        }}
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
