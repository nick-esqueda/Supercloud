import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from 'react';
import { editSong } from '../../store/songs';

export default function Player() {
  const dispatch = useDispatch();
  const song = useSelector(state => state.songs.playing);
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  const [timer, setTimer] = useState('');
  

  useEffect(() => {
    clearTimeout(timer);
  }, [paused]);

  const onPlay = () => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      song.plays++;
      dispatch(editSong(song));
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
