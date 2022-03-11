import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLikes } from '../../store/likes';
import { fetchSongs } from '../../store/songs';
import SongBadge from '../SongBadge/SongBadge';
import SongCard from '../SongCard';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => Object.values(state.songs.songs));
  const [isLoaded, setIsLoaded] = useState(false);
  let usersPlayCount = 0;
  user.Songs.forEach(song => usersPlayCount += song.plays);

  useEffect(() => {
    (async () => {
      await dispatch(fetchSongs());
      await dispatch(fetchLikes());
      setIsLoaded(true);
    })()
  }, [dispatch])

  return !isLoaded ? <h2>loading...</h2> : (
    <div id='home'>
      {/* <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1> */}

      {/* <ul>
        {songs.map(song => (
          <SongCard key={song.id} song={song} user={user} />
        ))}

      </ul> */}

      <h2 className='badge_grid1h'>hot tracks</h2>
      <div className='badge_grid__g1'>
        {songs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid2h'>your favorite tracks</h2>
      <div className='badge_grid__g2'>
        {songs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid3h'>recent tracks</h2>
      <div className='badge_grid__g3'>
        {songs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid4hc'>artist's you might like</h2>
      <div className='badge_grid__g4'>
        {songs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>


      <div className='home__sidebar'>
        <div className='greeting'>
          <h3>hi {user.username}, you've gotten</h3>
          <h3 style={{ margin: '24px 0', fontWeight: '400', fontSize: '32px', fontStyle: 'normal' }}>{usersPlayCount} plays</h3>
          <h3>in total since you joined.</h3>

          <NavLink to={`/users/${user.id}`} className='btn btn--primary--outline'
            onClick={() => alert('Sorry! This feature is currently under construction')}
          >view your profile</NavLink>
        </div>

      </div>

    </div>
  )
}
