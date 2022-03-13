import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchQuery } from '../../store/search';
import './Search.css';

export default function Search() {
  const dispatch = useDispatch();
  const allSongs = useSelector(state => state.songs.popularSongs);
  // const dbResults = useSelector(state => state.search);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!query) return;

    const filtered = allSongs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
    setResults(filtered);

    let timer;
    if (results.length < 30) {
      timer = setTimeout(async () => {
        setResults([]);
        const dbResults = await dispatch(fetchQuery(query));
        setResults(filtered.concat(dbResults));
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

  const closeMenu = (e) => {
    setShowMenu(false);
    setResults([]);
  }


  return (
    <div className='search'>
      <form className="header__searchForm">
        <input type="text" placeholder="search"
          className="header__searchInput"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={e => setShowMenu(true)}
        />
        <button type="submit" className="btn btn--secondary" style={{ boxShadow: "none" }}>
          <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', transform: 'scale(1.2)' }}></FontAwesomeIcon>
        </button>
      </form>

      {showMenu &&
        (
          <div id="search_bg" onClick={closeMenu}>
            <ul className='search_filter' onClick={closeMenu}>
              <NavLink to={`/search/${query}`} id="search_message">search for "{query}"...</NavLink>
              {results.sort().map((song, i) => (
                <li key={i}>
                  <NavLink to={`/songs/${song.id}`}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', marginRight: '12px' }}></FontAwesomeIcon>
                    {song.title}
                    <span style={{ fontStyle: 'italic', color: '#b3b3b3' }} >&nbsp;by {song.User.username}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}
