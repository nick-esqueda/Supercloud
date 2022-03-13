import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchArtist } from '../../store/artists';
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
        // fetch user's likes here
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
            {artist.Likes.slice(0,3).map((song, i) => (
              <li key={song.id}><SongCardSmall song={song} /></li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}
