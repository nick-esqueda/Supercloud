import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLikes } from '../../store/likes';
import { fetchSongs } from '../../store/songs';
import SongBadge from '../SongBadge/SongBadge';

import './HomePage.css';
import ArtistBadge from '../SongPage/ArtistBadge';
import HomeSidebar from './HomeSidebar';
import { fetchArtists } from '../../store/artists';


export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs.songs);
  const artists = useSelector(state => state.artists);
  const popularSongs = useSelector(state => state.songs.popularSongs);
  const recentSongs = useSelector(state => state.songs.recentSongs);
  const [isLoaded, setIsLoaded] = useState(false);
  const [usersSuggestedArtists, setUsersSuggestedArtists] = useState('');

  const usersPlayCount = user.Songs.reduce((acc, song) => ({ plays: acc.plays + song.plays }), { plays: 0 }).plays;
  const usersLikedSongs = user.Likes.slice(0, 3).map(like => songs[like.Song.id])
  const usersPopularLikes = user.Likes.sort((likeA, likeB) => likeA.Song.plays - likeB.Song.plays < 0 ? 1 : -1).slice(0, 10);

  useEffect(() => {
    (async () => {
      await dispatch(fetchSongs());
      await dispatch(fetchLikes());
      await dispatch(fetchArtists());
      setIsLoaded(true);
    })()
  }, [dispatch])

  useEffect(() => {
    const suggestedArtistIds = user.Likes.slice(0, 5).map(like => like.Song.User.id);
    const uniqueArtistIds = [...new Set(suggestedArtistIds)];
    setUsersSuggestedArtists(uniqueArtistIds.map(artistId => artists[artistId]));
  }, [artists])


  return !isLoaded ? <h2>loading...</h2> : (
    <div id='home'>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      <div className='badge_grid1h'>
        <h2>hot tracks</h2>
        <h4>songs that are stuck on repeat worldwide</h4>
      </div>
      <div className='badge_grid__g1'>
        {popularSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <div className='badge_grid2h'>
        <h2>popular favorites</h2>
        <h4>songs you like that are on everybody's mind</h4>
      </div>
      <div className='badge_grid__g2'>
        {usersPopularLikes.map(like => (
          <SongBadge key={like.id} song={like.Song} />
        ))}
      </div>

      <div className='badge_grid3h'>
        <h2>recent tracks</h2>
        <h4>freshly uploaded tracks that are ready to dig in to</h4>
      </div>
      <div className='badge_grid__g3'>
        {recentSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <div className='badge_grid4h'>
        <h2>artists you might like</h2>
        <h4>we've been digging your taste - here are some cool artists we found for you</h4>
      </div>
      <div className='badge_grid__g4'>
        {usersSuggestedArtists.map(artist => (
          <ArtistBadge key={artist.id} artist={artists[artist.id]} />
        ))}
      </div>

      <HomeSidebar user={user} usersPlayCount={usersPlayCount} usersLikedSongs={usersLikedSongs} />
    </div>
  )
}
