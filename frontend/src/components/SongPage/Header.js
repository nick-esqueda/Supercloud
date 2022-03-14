import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying } from '../../store/songs';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import './Header.css';
import { useEffect, useState } from 'react';

export default function Header({ song }) {
  const dispatch = useDispatch();
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  const playingSong = useSelector(state => state.songs.playing);
  const [tick, setTick] = useState(+(song.createdAt.split(' ')[0]) + 1);

  useEffect(() => {
    let timer;
    
    if (tick === 59) {
      timer = setTimeout(() => {
        song.createdAt = '1 minute ago';
        setTick(60);
      }, 1000);
      return;
    }
    
    if (song.createdAt.endsWith('seconds ago') || song.createdAt.endsWith('second ago')) {
      timer = setTimeout(() => setTick(prev => prev + 1), 1000);
      song.createdAt = `${tick + 1} seconds ago`;
    }
    
    return () => clearTimeout(timer);
  }, [song, tick]);

  const playSong = async () => {
    await new Promise(async (resolve, reject) => {
      await dispatch(setPlaying(song));
      resolve();
    });
    audioPlayer.current.audio.current.play();
    setPaused(false);
  }

  const pauseSong = () => {
    audioPlayer.current.audio.current.pause();
    setPaused(true);
  }

  return !song ? null : (
    <div className='header_container'>

      <div className="song_header__top">
        <div className="song_header__top_left">
          <div
            className={paused || playingSong.id !== song.id ? "song_header__play" : "song_header__play hidden"}
            onClick={playSong}
          ></div>
          <div
            className={!paused && playingSong.id === song.id ? "song_header__pause" : "song_header__pause hidden"}
            onClick={pauseSong}
          ></div>
          <div className="song_header__song">
            <h2>{song.title}</h2>
            <NavLink to={`/users/${song.User.id}`}>{song.User.username}</NavLink>
          </div>
        </div>
        <div className="song_header__top_right">
          <span>{song.createdAt}</span>
          {song.genre && (<span className='genre'>{song.genre}</span>)}
        </div>
      </div>

      <div className="song_header__bottom">
        <div className="song_header__waveform" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {'[ sorry! this feature is currently under construction ]'}
        </div>
      </div>

      <div className="song_header__right">
        <img src={song.artworkURL
          ? song.artworkURL
          : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
          alt="gradient"
        />
      </div>

    </div>
  )
}
