import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './SongBadge.css'
import '../SongCard/SongCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { setPlaying } from '../../store/songs';

export default function SongBadge({ song }) {
  const dispatch = useDispatch();
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  const playingSong = useSelector(state => state.songs.playing);
  const [isHovered, setIsHovered] = useState(false);


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
    <div className='song_badge'>
      <div
        className='song_badge__art'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        <div onClick={playSong}
          id={isHovered ? 'play' : ''}
          className={(paused || playingSong.id !== song.id)
            ? "song_header__play" : "song_header__play hidden"}
        ></div>
        <div onClick={pauseSong}
          id={isHovered ? 'pause' : ''}
          className={(!paused && playingSong.id === song.id)
            ? "song_header__pause" : "song_header__pause hidden"}
        ></div>

        <NavLink to={`/songs/${song.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
          <img src={song.artworkURL ? song.artworkURL : 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}
            alt=''
          />
          <div className='hallway'></div>
        </NavLink>

      </div>

      <div className='top__title_artist'>
        <NavLink to={`/songs/${song.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
          <span>{song.title}</span>
        </NavLink>
        <NavLink to={`/users/${song.User.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
          <small>{song.User.username}</small>
        </NavLink>
      </div>

    </div>
  )
}
