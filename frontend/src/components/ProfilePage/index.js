import { useSelector } from 'react-redux';
import ProfileBody from './ProfileBody';
import './ProfilePage.css';

export default function ProfilePage() {
  // need to fetch the "artist" using the artist thunk to get the user's info
  const user = useSelector(state => state.session.user);

  return (
    <div id='profile_page'>
      <div className="profile__header">
        <div className="profile_header__banner">
          <img src={user?.bannerImageURL
            ? user?.bannerImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt="gradient"
          />
        </div>

        <div className='user_info_container'>
          <img src={user?.profileImageURL
            ? user?.profileImageURL
            : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
            alt='profile'
          />
          <div className='profile__info'>
            <h2>{user?.username}</h2>
            <span style={{ fontStyle: 'italic' }}>{user?.location ? null : 'nashville cocknuts'}</span>
            <p>{'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non'}</p>
          </div>
        </div>
      </div>


      <div className='profile__body'>
        <ProfileBody />
      </div>
    </div>
  )
}
