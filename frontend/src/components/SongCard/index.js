import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { deleteSong, setPlaying } from '../../store/songs';
import EditSongModal from '../Modal/EditSongModal';

import './SongCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { deleteLike, postLike } from '../../store/likes';
import { useEffect, useState } from 'react';
import { getTimeElapsed } from '../../utils';

export default function SongCard({ song, user }) {
  const dispatch = useDispatch();
  const { audioPlayer, paused, setPaused } = useAudioPlayer();
  const playingSong = useSelector(state => state.songs.playing);
  // REFACTOR LIKES TO JUST USE THE ASSOCIATED DATA OF "SONG"
  // ALSO REFACTOR TO USE A USEEFFECT
  const songsLikes = useSelector(state => state.likes.songsLikes[song.id]);
  const isLiked = songsLikes?.find(like => like.userId === user?.id);
  const likeCount = !songsLikes ? 0 : songsLikes.length;
  const commentCount = !song.Comments ? 0 : song.Comments.length;
  const isArtist = song?.User?.id === user?.id;
  const createdAt = getTimeElapsed(song.createdAt);
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

  const likeSong = async (e) => {
    if (!user) return document.getElementById('login_button').click();
    dispatch(postLike(user.id, song.id));
  }
  const unLikeSong = async (e) => {
    if (!user) return document.getElementById('login_button').click();
    dispatch(deleteLike(user.id, song.id));
  }

  return !song ? null : (
    <div className='song_card_container'>
      <NavLink to={`/songs/${song?.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
        <img src={song?.artworkURL
          ? song?.artworkURL
          : "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        }
          alt="artwork"
        />
      </NavLink>


      <div className='song_card__content'>
        <div className='song_card__top'>
          <div
            className={paused || playingSong?.id !== song?.id ? "top__play" : "top__play hidden"}
            onClick={playSong}
          ></div>
          <div
            className={!paused && playingSong?.id === song?.id ? "top__pause" : "top__pause hidden"}
            onClick={pauseSong}
          ></div>

          <div className='top__title_artist'>
            <NavLink to={`/users/${song?.User.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
              <small>{song?.User.username}</small>
            </NavLink>
            <NavLink to={`/songs/${song?.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
              <span>{song?.title}</span>
            </NavLink>
          </div>

          <div className='top__right'>
            <small>{createdAt}</small>
            <span className='genre'>{song?.genre}</span>
          </div>
        </div>

        <div className='song_card__waveform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {'[ sorry! this feature is currently under construction ]'}
        </div>

        <div className='song_card__bottom'>
          <div className='bottom__buttons'>
            {isLiked ? (
              <button onClick={unLikeSong} className='btn btn--liked'>
                <FontAwesomeIcon icon={faHeart} style={{ color: '#d73543', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
                &nbsp;{likeCount}
              </button>
            ) : (
              <button onClick={likeSong} className='btn btn--secondary--outline'>
                <FontAwesomeIcon icon={faHeart} style={{ color: '#535353', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
                &nbsp;{likeCount}
              </button>)
            }

            <NavLink to={`/users/${song?.User.id}`} className='btn btn--secondary--outline' onClick={() => alert('Sorry! This feature is currently under construction')}>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjEgMTEuODZjLS44MjUtLjQxOC0xLjI0My0xLjUzNi0xLjI0My0yLjMyIDAtLjQuMjY4LS43MzUuNTA3LTEuMDA3LjY0OC0uNzQzIDEuMTU0LTEuNjI0IDEuMTU0LTMuNTA3QzEyLjUxOCAyLjI1IDEwLjg1OCAxIDguOTg4IDFjLTEuODcgMC0zLjUzIDEuMjUtMy41MyA0LjAyNiAwIDEuODgzLjUwNSAyLjc2NCAxLjE1MyAzLjUwNy4yNC4yNzIuNTEuNjA3LjUxIDEuMDA2IDAgLjc4NC0uNDIgMS45MDItMS4yNDYgMi4zMi0xLjI0NC42My0zLjQyMyAxLjE2Ny00LjM2NSAxLjg4Qy4yNSAxNC42OTUgMCAxNyAwIDE3aDE4cy0uMjc3LTIuMzA2LTEuNTM0LTMuMjZjLS45NDItLjcxMy0zLjEyLTEuMjUtNC4zNjUtMS44OHoiLz4KPC9zdmc+Cg=="
                style={{ height: '16px' }}
                alt=''
              />
              &nbsp;
              artist profile
            </NavLink>

            <button className='btn btn--secondary--outline' onClick={() => alert('Sorry! This feature is currently under construction')}>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTIgNmgxMHYxMEgyeiIvPgogICAgICAgIDxwYXRoIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik01IDJoMTF2MTBoLTJWNEg1eiIvPgogICAgPC9nPgo8L3N2Zz4K"
                style={{ transform: 'scale(1.0)' }}
                alt=''
              />
              &nbsp;add to playlist
            </button>

            {isArtist && (
              <>
                <EditSongModal song={song} />

                <button className='btn btn--secondary--outline'
                  onClick={e => {
                    if (() => window.confirm(`Are you sure you want to delete your song? This cannot be undone`)) {
                      if (() => window.confirm(`This is a double check - clicking "OK" will delete your song permanently`)) {
                        dispatch(deleteSong(song?.id));
                      }
                    }
                  }}
                >
                  <img src="https://a-v2.sndcdn.com/assets/images/delete-d90bf5e4.svg"
                    style={{ transform: 'scale(1.0)' }}
                    alt=''
                  />
                  &nbsp;delete
                </button>
              </>
            )}

          </div>

          <div className='bottom__right'>
            <span style={{ color: '#b3b3b3' }}>
              ▶
              <span style={{ color: 'white', marginLeft: '6px' }}>{song.plays}</span>
            </span>

            <span>
              <FontAwesomeIcon icon={faMessage} style={{ color: '#b3b3b3', position: 'relative', bottom: '-1px' }}></FontAwesomeIcon>
              &nbsp;{commentCount}
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}
