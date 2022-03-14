import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { useEffect, useState } from 'react';
import { editSong, editSongPlays } from '../../store/songs';
import './Player.css';

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
      dispatch(editSongPlays(song));
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
        onPlay={e => onPlay()}
        onPause={e => onPause()}
        ref={audioPlayer}
        // other props here
        layout='horizontal-reverse'
        showSkipControls={false}
        showJumpControls={false}
        customAdditionalControls={[]}
        style={{
          backgroundColor: 'transparent',
        }}
        customIcons={{
          play: '▶',
          pause: '||'
        }}
      />

    </>
  );
}
