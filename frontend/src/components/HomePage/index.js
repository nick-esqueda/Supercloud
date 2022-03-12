import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLikes } from '../../store/likes';
import { fetchSongs } from '../../store/songs';
import SongBadge from '../SongBadge/SongBadge';
import SongCard from '../SongCard';
import SongCardSmall from '../SongCard/SongCardSmall'

import './HomePage.css';
import ArtistBadge from '../SongPage/ArtistBadge';
import HomeSidebar from './HomeSidebar';


export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs.songs);
  const popularSongs = useSelector(state => state.songs.popularSongs);
  const recentSongs = useSelector(state => state.songs.recentSongs);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const usersPlayCount = user.Songs.reduce((acc, song) => ({ plays: acc.plays + song.plays }), { plays: 0 }).plays;
  const usersLikedSongs = user.Likes.slice(0, 3).map(like => songs[like.Song.id])
  const usersPopularLikes = user.Likes.sort((likeA, likeB) => likeA.Song.plays - likeB.Song.plays < 0 ? 1 : -1).slice(0, 10);
  const usersSuggestedArtists = user.Likes.slice(0, 5).map(like => like.Song.User);

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

      <h2 className='badge_grid1h'>hot tracks</h2>
      <div className='badge_grid__g1'>
        {popularSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid2h'>popular favorites</h2>
      <div className='badge_grid__g2'>
        {usersPopularLikes.map(like => (
          <SongBadge key={like.id} song={like.Song} />
        ))}
      </div>

      <h2 className='badge_grid3h'>recent tracks</h2>
      <div className='badge_grid__g3'>
        {recentSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      {/* <h2 className='badge_grid4hc'>artists you might like</h2>
      <div className='badge_grid__g4'>
        {usersSuggestedArtists.map(artist => (
          <ArtistBadge key={artist.id} artist={artist} />
        ))}
      </div> */}


      <HomeSidebar user={user} usersPlayCount={usersPlayCount} usersLikedSongs={usersLikedSongs} />
    </div>
  )
}
