import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  useEffect(() => {
    (async () => {
      await dispatch(fetchSongs());
      await dispatch(fetchLikes());
      setIsLoaded(true);
    })()
  }, [dispatch])
  
  return !isLoaded ? <h2>loading...</h2> : (
    <div id='home'>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      {/* <ul>
        {songs.map(song => (
          <SongCard key={song.id} song={song} user={user} />
        ))}

      </ul> */}
      
      <div className='badge_grid'>
        {songs.map(song => (
          <SongBadge song={song} />
        ))}
      </div>
    </div>
  )
}
