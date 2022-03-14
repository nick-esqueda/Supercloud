import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchArtist } from '../../store/artists';
import { fetchUsersLikes } from '../../store/likes';
import CommentCard from '../CommentCard';
import SongCardSmall from '../SongCard/SongCardSmall';
import ProfileBody from './ProfileBody';
import './ProfilePage.css';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if (sessionUser.id === userId) {
      setArtist(sessionUser);
    } else {
      (async () => {
        const artist = await dispatch(fetchArtist(userId));
        await dispatch(fetchUsersLikes(userId));
        setArtist(artist);
      })()
    }
  }, [dispatch]);
  
  
  return !artist ? <h2>loading...</h2> : (
    <div id='profile_page'>
      <div className="profile__header">
        <div className="profile_header__banner">
          <img src={artist.bannerImageURL
            ? artist.bannerImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt="gradient"
          />
        </div>

        <div className='user_info_container'>
          <img src={artist.profileImageURL
            ? artist.profileImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt='profile'
          />
          <div className='profile__info'>
            <h2>{artist.username}</h2>
            {artist.location && (<span style={{ fontStyle: 'italic' }}>{artist.location}</span>)}
            <p>{'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non'}</p>
          </div>
        </div>
      </div>


      <div className='profile__body'>
        <ProfileBody user={artist} />
      </div>

      <div className='profile__sidebar'>
        <div className='sidebar_container'>
          <h4 className='flexRowBetween'>
            <div className='alignItems'>
              <FontAwesomeIcon icon={faHeart} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', }}></FontAwesomeIcon>
              &nbsp;{artist.Likes.length === 1 ? `${artist.Likes.length} like` : `${artist.Likes.length} likes`}
            </div>

            <NavLink to={`/users/${artist.id}/likes`} className="italic">view all</NavLink>
          </h4>

          <ul className="songs">
            {artist.Likes.slice(0, 3).map((like, i) => (
              <li key={like.Song.id}><SongCardSmall song={like.Song} /></li>
            ))}
          </ul>
        </div>
        
        <div className='sidebar_container' id='sidebar_comments'>
          <h4 className='flexRowBetween'>
            <div className='alignItems'>
              <FontAwesomeIcon icon={faComment} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', }}></FontAwesomeIcon>
              &nbsp;{artist.Comments.length === 1 ? `${artist.Comments.length} comment` : `${artist.Comments.length} comments`}
            </div>

            <NavLink to={`/users/${artist.id}/comments`} className="italic">view all</NavLink>
          </h4>

          <ul className="songs sidebar_comments" >
            {artist.Comments.slice(0, 3).map((comment, i) => (
              <li key={comment.id}><CommentCard comment={comment} on={comment.Song} /></li>
            ))}
          </ul>
        </div>
        
        
      </div>

    </div>
  )
}
