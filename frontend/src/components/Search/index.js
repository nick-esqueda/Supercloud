import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchQuery } from '../../store/search';

import './Search.css';
import Fuse from 'fuse.js'
const options = {
  includeScore: true,
  findAllMatches: true,
  useExtendedSearch: true,
  keys: [
    { name: 'title', weight: 2 },
    { name: 'username', weight: 1 },
    { name: 'description', weight: 0.2 },
  ]
}

export default function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSongs = useSelector(state => state.songs.popularSongs);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(!allSongs.length ? [] : allSongs);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!query) return;


    let timer = setTimeout(async () => {
      const dbQueryResults = await dispatch(fetchQuery(query.toLowerCase()));

      if (dbQueryResults.length) {
        // FOR FILTERING OUT DUPLICATES
        const songsSet = new Set();
        const usersSet = new Set();
        results.forEach(item => {
          if (item.item.songURL !== undefined) songsSet.add(item.item.id);
          if (item.item.username !== undefined) usersSet.add(item.item.id);
        });
        const newResults = dbQueryResults.filter(item => {
          // for songs
          if (item.songURL !== undefined) {
            if (!songsSet.has(item.id)) return true;
          }
          // for users
          if (item.username !== undefined) {
            if (!usersSet.has(item.id)) return true;
          }
        });

        const fuse = new Fuse(newResults.concat(results), options);
        const fuseResults = fuse.search(query);
        setResults(prev => fuseResults);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [query]);


  const closeMenu = (e) => {
    setShowMenu(false);
    setResults([]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // TEMPORARILY DISABLING NAVIGATION TO SEARCH PAGE
    // if (!query) return;
    // setShowMenu(false);
    // return history.push(`/search/${query}`)
  }


  return (
    <div className='search'>
      <form className="header__searchForm" onSubmit={onSubmit}>
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

      {showMenu && (
        <div id="search_bg" onClick={closeMenu}>
          <ul className='search_filter' onClick={closeMenu}>
            <div style={{ cursor: 'pointer' }} onClick={onSubmit} id="search_message">searching for "{query}"...</div>

            {results.map((result, i) => {
              if (result.item?.username !== undefined) {
                // for users
                return (
                  <li key={i}>
                    <NavLink to={`/songs/${result.item.id}`}>
                      <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', marginRight: '12px' }}></FontAwesomeIcon>
                      {result.item.username}
                      {/* <span style={{ fontStyle: 'italic', color: '#b3b3b3' }} >&nbsp;by {result.item.User.username}</span> */}
                    </NavLink>
                  </li>
                )
              } else if (result.item?.songURL) {
                // for songs
                return (
                  <li key={i}>
                    <NavLink to={`/songs/${result.item.id}`}>
                      <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', marginRight: '12px' }}></FontAwesomeIcon>
                      {result.item.title}
                      <span style={{ fontStyle: 'italic', color: '#b3b3b3' }} >&nbsp;by {result.item.User.username}</span>
                    </NavLink>
                  </li>
                )
              }
            })}

          </ul>
        </div>
      )}
    </div>
  )
}
