import { useState } from 'react';
import './CommentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store/comments';


export default function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const deleteComment = () => {
    if (window.confirm(`Are you sure you want to delete your comment? This cannot be undone`)) {
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

        <span style={{ color: '#b3b3b3' }}>{comment.User.username}</span>
        <span>{comment.content}</span>
      </div>

      {!isHovered
        ? (
          <div className='comment__right'>
            <span style={{ color: '#b3b3b3' }}>
              {comment.createdAt}
            </span>
          </div>
        ) : (
          <div className='comment__right'>
            <button className='btn btn--secondary' onClick={deleteComment}>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
            </button>
          </div>
        )
      }
    </div>
  )
}
