import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchArtist } from '../../store/artists';
import SongCardSmall from '../SongCard/SongCardSmall';
import ProfileBody from './ProfileBody';
import './ProfilePage.css';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.artists)[userId];
  
  useEffect(() => {
    (async () => {
      await dispatch(fetchArtist(userId));
    })()
  }, [dispatch]);

  return !user ? <h2>loading...</h2> : (
    <div id='profile_page'>
      <div className="profile__header">
        <div className="profile_header__banner">
          <img src={user.bannerImageURL
            ? user.bannerImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt="gradient"
          />
        </div>

        <div className='user_info_container'>
          <img src={user.profileImageURL
            ? user.profileImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt='profile'
          />
          <div className='profile__info'>
            <h2>{user.username}</h2>
            {user.location && (<span style={{ fontStyle: 'italic' }}>{user.location}</span>)}
            <p>{'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non'}</p>
          </div>
        </div>
      </div>


      <div className='profile__body'>
        <ProfileBody />
      </div>

      {/* <div className='profile__sidebar'>
        <div className='sidebar_container'>
          <h4 className='flexRowBetween'>
            <div className='alignItems'>
              <FontAwesomeIcon icon={faHeart} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', }}></FontAwesomeIcon>
              &nbsp;songs you liked
            </div>

            <NavLink to={`/users/${user.id}/likes`} className="italic">view all</NavLink>
          </h4>

          <ul className="songs">
            {user.Likes.slice(0,3).map((song, i) => (
              <li key={i}><SongCardSmall song={song} /></li>
            ))}
          </ul>
        </div>
      </div> */}

    </div>
  )
}
