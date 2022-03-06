import { NavLink } from 'react-router-dom';
import './ArtistBadge.css';

export default function ArtistBadge() {
  return (
    <div>
      <NavLink to="/artists-profile-page">
        <img src="https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt='artist'
        />
      </NavLink>

      <div className='artist_badge'>
        <span>artist name</span>
        <span>69</span>
      </div>

    </div>
  )
}
