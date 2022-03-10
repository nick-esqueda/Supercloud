import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikes } from '../../store/likes';
import { fetchSongs } from '../../store/songs';
import SongCard from '../SongCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => Object.values(state.songs.songs));

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchLikes());
  }, [dispatch])
  
  return !songs ? <h2>loading...</h2> : (
    <>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      <ul style={{ width: '100%' }}>
        {songs.map(song => (
          <SongCard key={song.id} song={song} user={user} />
        ))}

      </ul>
    </>
  )
}
