import { useState } from 'react';
import './CommentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMessage } from '@fortawesome/free-solid-svg-icons';


export default function CommentCard({ comment }) {
  const [isHovered, setIsHovered] = useState(false);

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
            <button className='btn btn--secondary'
              onClick={e => {
                if (window.confirm(`Are you sure you want to delete your song? This cannot be undone`)) {
                  if (window.confirm(`This is a double check - clicking "OK" will delete your song permanently`)) {
                    // dispatch(deleteSong(song?.id));
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
            </button>
          </div>
        )
      }
    </div>
  )
}
