import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { postLike, deleteLike } from '../../store/songs';
import { deleteSong } from '../../store/songs';
import EditSongModal from '../Modal/EditSongModal';

import './Actions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { postComment } from '../../store/comments';

export default function Actions({ song }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  // const songsLikes = useSelector(state => state.likes.songsLikes)[song.id];
  // const likeCount = !songsLikes ? 0 : songsLikes.length;
  const isArtist = song.User.id === user.id;
  const [isLiked, setIsLiked] = useState(song.Likes.find(like => like.userId === user.id));
  const [commentCount, setCommentCount] = useState(song.Comments ? song.Comments.length : 0);
  
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  
  // useEffect(() => {
  //   if (user && song.Likes.find(like => like.userId === user.id)) {
  //     setIsLiked(true);
  //   } else {
  //     setIsLiked(false);
  //   }
  // }, [song, user])
  
  useState(() => {
    const errors = [];
    if (content.length > 255) errors.push('comments must be under 255 characters');
    setValidationErrors(errors);
  }, [content]);

  const likeSong = (e) => {
    if (!user) return document.getElementById('login_button').click();
    
    setIsLiked(true);
    dispatch(postLike(user.id, song.id));
  }
  const unLikeSong = (e) => {
    if (!user) return document.getElementById('login_button').click();
    
    setIsLiked(false);
    dispatch(deleteLike(user.id, song.id));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (content.length === 0) {
      validationErrors.push('please type someting before sending comment');
      return setShowErrors(true);
    }

    setShowErrors(false);
    dispatch(postComment({ content, songId: song.id, userId: user.id }));
    setCommentCount(prev => prev + 1);
    setContent('');
  }

  return (
    <div className='actions_container'>
      <div className='write_comment'>
        <img src='https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt='profile'
        />

        <form className="comment_form" onSubmit={onSubmit}>
          <div className="form_group">
            <input type="text"
              id="comment"
              placeholder='write a comment...'
              value={content}
              onChange={e => setContent(e.target.value)}
              className="form_input"
              style={showErrors ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null}
            />
            <button type="submit" className='btn btn--primary'>send</button>
          </div>
          
        </form>
      </div>

      <div className='bottom__buttons'>
        {isLiked ? (
          <button onClick={unLikeSong} className='btn btn--liked'>
            <FontAwesomeIcon icon={faHeart} style={{ color: '#d73543', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
            &nbsp;{song.Likes.length}
          </button>
        ) : (
          <button onClick={likeSong} className='btn btn--secondary--outline'>
            <FontAwesomeIcon icon={faHeart} style={{ color: '#535353', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
            &nbsp;{song.Likes.length}
          </button>)
        }

        <button className='btn btn--secondary--outline'>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjEgMTEuODZjLS44MjUtLjQxOC0xLjI0My0xLjUzNi0xLjI0My0yLjMyIDAtLjQuMjY4LS43MzUuNTA3LTEuMDA3LjY0OC0uNzQzIDEuMTU0LTEuNjI0IDEuMTU0LTMuNTA3QzEyLjUxOCAyLjI1IDEwLjg1OCAxIDguOTg4IDFjLTEuODcgMC0zLjUzIDEuMjUtMy41MyA0LjAyNiAwIDEuODgzLjUwNSAyLjc2NCAxLjE1MyAzLjUwNy4yNC4yNzIuNTEuNjA3LjUxIDEuMDA2IDAgLjc4NC0uNDIgMS45MDItMS4yNDYgMi4zMi0xLjI0NC42My0zLjQyMyAxLjE2Ny00LjM2NSAxLjg4Qy4yNSAxNC42OTUgMCAxNyAwIDE3aDE4cy0uMjc3LTIuMzA2LTEuNTM0LTMuMjZjLS45NDItLjcxMy0zLjEyLTEuMjUtNC4zNjUtMS44OHoiLz4KPC9zdmc+Cg=="
            style={{ height: '16px' }}
            alt=''
          />
          &nbsp;
          <NavLink to={`/users/${song.User.id}`}>artist profile</NavLink>
        </button>

        {isArtist && (
          <>
            <EditSongModal song={song} />

            <button className='btn btn--secondary--outline'
              onClick={e => {
                if (window.confirm(`Are you sure you want to delete your song? This cannot be undone`)) {
                  if (window.confirm(`This is a double check - clicking "OK" will delete your song permanently`)) {
                    dispatch(deleteSong(song.id));
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                    return history.push(`/`);
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

        <div className='bottom__right'>
          <span>▶ {song?.plays}</span>
          <span>
            <FontAwesomeIcon icon={faMessage} style={{ color: '#b3b3b3', position: 'relative', bottom: '-1px' }}></FontAwesomeIcon>
            &nbsp;{commentCount}
          </span>
        </div>

      </div>
    </div>
  )
}
