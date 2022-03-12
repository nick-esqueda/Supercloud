import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteLike, postLike } from '../../store/likes';
import './Footer.css';
import Player from './Player';

export default function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const playingSong = useSelector(state => state.songs.playing);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (playingSong) {
      const liked = playingSong.Likes.find(like => like.userId === user.id);
      if (liked) setIsLiked(true);
      else setIsLiked(false);
    }
  }, [user, playingSong])

  const likeSong = (e) => {
    if (!user) return document.getElementById('login_button').click();
    if (!playingSong) return;
    setIsLiked(true);
    dispatch(postLike(user.id, playingSong.id));
  }
  
  const unLikeSong = (e) => {
    if (!user) return document.getElementById('login_button').click();
    if (!playingSong) return;
    setIsLiked(false);
    dispatch(deleteLike(user.id, playingSong.id));
  }


  return (
    <div id='footer'>
      <div className='play_controls'>
        <div className='player_wrapper'>
          <Player />
        </div>

        <div className='play_controls__details'>
          <img
            src={playingSong ? playingSong.artworkURL : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
            alt=''
            style={{ cursor: 'pointer' }}
            onClick={() => playingSong ? history.push(`/songs/${playingSong.id}`) : null}
          />

          <div className='flexColLeft'>
            <span style={{ color: '#b3b3b3', cursor: 'pointer' }}
              onClick={() => playingSong ? history.push(`/users/${playingSong.User.id}`) : null}
            >
              {playingSong ? playingSong.User.username : "..."}
            </span>
            <span style={{ cursor: 'pointer' }}
              onClick={() => playingSong ? history.push(`/songs/${playingSong.id}`) : null}
            >
              {playingSong ? playingSong.title : "..."}
            </span>
          </div>

          <div className='like_button_footer'>
            {isLiked ? (
              <span onClick={unLikeSong}>
                <FontAwesomeIcon icon={faHeart} style={{ color: '#d73543', transform: 'scale(1.5)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
              </span>
            ) : (
              <span onClick={likeSong}>
                <FontAwesomeIcon icon={faHeart} style={{ color: '#535353', transform: 'scale(1.5)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
              </span>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
