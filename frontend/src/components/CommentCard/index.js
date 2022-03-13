import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';

import './CommentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMessage } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


export default function CommentCard({ comment, on }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(+(comment.createdAt.split(' ')[0]) + 1);

  useEffect(() => {
    let timer;

    if (tick === 59) {
      timer = setTimeout(() => {
        comment.createdAt = '1 minute ago';
        setTick(60);
      }, 1000);
      return;
    }

    if (comment.createdAt.endsWith('seconds ago') || comment.createdAt.endsWith('second ago')) {
      timer = setTimeout(() => setTick(prev => prev + 1), 1000);
      comment.createdAt = `${tick + 1} seconds ago`;
    }

    return () => clearTimeout(timer);
  }, [comment, tick])

  const commentDelete = () => {
    if (window.confirm(`Are you sure you want to delete your comment? This cannot be undone.`)) {
      return dispatch(deleteComment(comment));
    }
  }

  return (
    <div className='comment__wrapper' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className='comment__left'>
        <img src={comment.User.profileImageURL
          ? comment.User.profileImageURL
          : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
          alt=""
        />

        {on ?
          <span style={{ color: '#b3b3b3' }}> on
            <NavLink to={`/songs/${on.id}`}
              style={{ color: '#FFFF5D' }}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >&nbsp;{on.title}</NavLink>
          </span>
          : 
          <span style={{ color: '#b3b3b3' }}>{comment.User.username}</span>
        }

        <span>{comment.content}</span>
      </div>

      {isHovered && comment.userId === user?.id
        ? (
          <div className='comment__right'>
            <button className='btn btn--secondary' onClick={commentDelete}>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
            </button>
          </div>
        ) : (
          <div className='comment__right createdAt'>
            <span style={{ color: '#b3b3b3' }}>
              {comment.createdAt}
            </span>
          </div>
        )
      }
    </div>
  )
}
