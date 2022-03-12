import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLikes } from '../../store/likes';
import { fetchSongs } from '../../store/songs';
import SongBadge from '../SongBadge/SongBadge';
import SongCard from '../SongCard';
import SongCardSmall from '../SongCard/SongCardSmall'

import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';


export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const allSongs = useSelector(state => state.songs.songs);
  const popularSongs = useSelector(state => state.songs.popularSongs);
  const recentSongs = useSelector(state => state.songs.recentSongs);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const usersPlayCount = user.Songs.reduce((acc, song) => ({ plays: acc.plays + song.plays }), { plays: 0 }).plays;
  const songsArr = Object.values(allSongs);
  const songsUserLikes = user.Likes.slice(0, 3).map(like => allSongs[like.Song.id])


  // get 'favorite tracks' - users likes ordered by listens

  // get 'recent tracks' - order by createdAt

  // get artists of songs that user likes

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

      <h2 className='badge_grid2h'>your favorite tracks</h2>
      <div className='badge_grid__g2'>
        {songsArr.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid3h'>recent tracks</h2>
      <div className='badge_grid__g3'>
        {recentSongs.map(song => (
          <SongBadge key={song.id} song={song} />
        ))}
      </div>

      <h2 className='badge_grid4hc'>artist's you might like</h2>
      <div className='badge_grid__g4'>
        {songsArr.map(song => (
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


        <div className='sidebar_container'>
          <h4 className='flexRowBetween'>
            <div className='alignItems'>
              <FontAwesomeIcon icon={faHeart} style={{ color: '#b3b3b3', transform: 'scale(1.2)', position: 'relative', }}></FontAwesomeIcon>
              &nbsp;songs you liked
            </div>

            <NavLink to={`/users/${user.id}/likes`} className="italic">view all</NavLink>
          </h4>

          <ul className="songs">
            {songsUserLikes.map((song) => (
              <li key={song.id}><SongCardSmall song={song} artist={song.User} /></li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
