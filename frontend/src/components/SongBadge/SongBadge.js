import React from 'react'
import { NavLink } from 'react-router-dom'
import './SongBadge.css'
import '../SongCard/SongCard.css'

export default function SongBadge({ song }) {
  return (
    <div className='song_badge_container'>
      <div className='song_badge__art'>
        <img src={song.artworkURL ? song.artworkURL : 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}
          alt=''
        />
        <div className='hallway'></div>

      </div>

      <div className='top__title_artist'>
        <NavLink to={`/songs/${song.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
          <span>{song.title}</span>
        </NavLink>
        <NavLink to={`/users/${song.User.id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
          <small>{song.User.username}</small>
        </NavLink>
      </div>

    </div>
  )
}
