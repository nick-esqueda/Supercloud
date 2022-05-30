import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { useEffect, useState } from 'react';
import { editSong, editSongPlays } from '../../store/songs';
import './Player.css';

function amplifyMedia(mediaElem, multiplier) {
  var context = new (window.AudioContext || window.webkitAudioContext),
      result = {
        context: context,
        source: context.createMediaElementSource(mediaElem),
        gain: context.createGain(),
        media: mediaElem,
        amplify: function(multiplier) { result.gain.gain.value = multiplier; },
        getAmpLevel: function() { return result.gain.gain.value; }
      };
  result.source.connect(result.gain);
  result.gain.connect(context.destination);
  result.amplify(multiplier);
  return result;
}

export default function Player() {
  const dispatch = useDispatch();
  const song = useSelector(state => state.songs.playing);
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  const [timer, setTimer] = useState('');
  
  useEffect(() => {
    clearTimeout(timer);
  }, [paused]);
  
  const onPlay = () => {
    audioPlayer.current.audio.current.crossOrigin = "anonymous";
    amplifyMedia(audioPlayer.current.audio.current, .5);
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
        id={'bruh'}
        src={song?.songURL}
        onPlay={e => onPlay()}
        onPause={e => onPause()}
        ref={audioPlayer}
        // other props here
        layout='horizontal-reverse'
        showSkipControls={false}
        showJumpControls={false}
        customAdditionalControls={[]}
        showFilledVolume={true}
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
