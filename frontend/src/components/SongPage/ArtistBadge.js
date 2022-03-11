import { NavLink } from 'react-router-dom';
import './ArtistBadge.css';

export default function ArtistBadge({ artist }) {
  return (
    <div className='artist_badge'>
      <NavLink to="/artists-profile-page">
        <img src={artist.profileImageURL
          ? artist?.profileImageURL
          : "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
          alt='artist'
        />
      </NavLink>

      <div className='badge__info'>
        <NavLink to="/artists-profile-page">{artist.username}</NavLink>
        <span>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDE1MywgMTUzLCAxNTMpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo="
            style={{ position: 'relative', bottom: '-8px' }}
            alt=''
          />
          &nbsp;{artist.Songs.length}
        </span>
      </div>

    </div>
  )
}
