import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchArtistsLikedSongs, fetchSongs } from '../../store/songs';
import SongBadge from '../SongBadge/SongBadge';

import './HomePage.css';
import ArtistBadge from '../SongPage/ArtistBadge';
import HomeSidebar from './HomeSidebar';
import { fetchArtists } from '../../store/artists';


export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs.songs);
  const artists = useSelector(state => state.artists);
  const popularSongs = useSelector(state => state.songs.popularSongs);
  const recentSongs = useSelector(state => state.songs.recentSongs);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPopulated, setIsPopulated] = useState(false);
  const [usersSuggestedArtists, setUsersSuggestedArtists] = useState([]);
  const [usersPlayCount, setUsersPlayCount] = useState(0);
  const [usersLikedSongs, setUsersLikedSongs] = useState([]);
  const [usersPopularLikedSongs, setUsersPopularLikedSongs] = useState([]);

  const populate = () => {
    if (user && user.Songs && user.Likes) {
      // USER'S PLAY COUNT
      setUsersPlayCount(user.Songs.reduce((acc, song) => ({ plays: acc.plays + song.plays }), { plays: 0 }).plays);
      // POPULAR SONGS THAT USER LIKED
      const popLiked = user.Likes
        .sort((likeA, likeB) => likeA.Song.plays - likeB.Song.plays < 0 ? 1 : -1)
        .slice(0, 10)
        // map might put undefined in an index for songs that are in user's likes array but not in songs slice of state
        .map(like => songs[like.Song.id]);
      setUsersPopularLikedSongs(popLiked);
      // ARTISTS OF SONGS THAT USER HAS LIKED
      const suggestedArtistIds = user.Likes.slice(0, 5).map(like => like.Song.User.id);
      const uniqueArtistIds = [...new Set(suggestedArtistIds)];
      setUsersSuggestedArtists(uniqueArtistIds.map(artistId => artists[artistId]));

      setIsPopulated(true);
    } else if (user) {
      setIsPopulated(true);
    } else {
      setIsPopulated(false);
    }
  }

  useEffect(() => {
    if (!user) {
      return history.push('/splash');
    }

    dispatch(fetchSongs())
      .then(_ => dispatch(fetchArtists()))
      .then(_ => dispatch(fetchArtistsLikedSongs(user.id)))
      .then(usersLikedSongs => {
        setUsersLikedSongs(usersLikedSongs.slice(0, 3))
        setIsLoaded(true);
      });
  }, [dispatch, user]);

  useEffect(() => {
    if (isLoaded) {
      populate();
    }
  }, [isLoaded]);


  return !isLoaded || !isPopulated || !user ? <h2 id='loading'>loading...</h2> : (
    <div id='home'>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      <div className='badge_grid1h'>
        <h2>hot tracks</h2>
        <h4>songs that are stuck on repeat worldwide</h4>
      </div>
      <div className='badge_grid__g1 flexRowBetween'>
        {popularSongs.slice(0, 10).map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <div className='badge_grid2h'>
        <h2>recent tracks</h2>
        <h4>freshly uploaded tracks that are ready to dig in to</h4>
      </div>
      <div className='badge_grid__g2 flexRowBetween'>
        {recentSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>



      {!user.Likes || !user.Likes.length ? <h2 style={{ textAlign: 'right', color: '#b3b3b3', padding: '24px 0', margin: '16px 0', borderTop: '1px solid #535353' }}>browse around and like some songs to get some curated suggestions from us!</h2> : (
        <>
          <div className='badge_grid3h'>
            <h2>artists you might like</h2>
            <h4>we've been digging your taste - here are some cool artists we found for you</h4>
          </div>
          <div className='badge_grid__g3 flexRowBetween'>
            {usersSuggestedArtists.map(artist => (
              <ArtistBadge key={artist?.id} artist={artists[artist.id]} />
            ))}
          </div>

          {usersPopularLikedSongs[0] === undefined && usersPopularLikedSongs.length === 1 ? null : (
            <>
              <div className='badge_grid4h'>
                <h2>popular favorites</h2>
                <h4>songs you like that are on everybody's mind</h4>
              </div>
              <div className='badge_grid__g4 flexRowBetween'>
                {usersPopularLikedSongs.map((song, i) => (
                  <SongBadge key={i} song={song} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <HomeSidebar user={user} usersPlayCount={usersPlayCount} usersLikedSongs={usersLikedSongs} />
    </div>
  )
}
