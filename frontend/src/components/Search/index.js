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
    {name: 'title', weight: 0.9},
    {name: 'User.username', weight: 0.5},
    {name: 'description', weight: 0.2},
  ]
}

export default function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSongs = useSelector(state => state.songs.popularSongs);
  const dbQueryResults = useSelector(state => state.search);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(!allSongs.length ? [] : allSongs);
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    if (!query) return;
    
    let timer;
    if (dbQueryResults.length < 20 && query.length > 1) {
      timer = setTimeout(async () => {
        const dbResults = await dispatch(fetchQuery(query));
        const fuse = new Fuse(dbResults, options);
        const fuseResults = fuse.search(query);
        setResults(fuseResults);
      }, 400);
      
    } else {
      const fuse = new Fuse(dbQueryResults, options);
      const fuseResults = fuse.search(query);
      setResults(fuseResults);
    }

    return () => clearTimeout(timer);
  }, [query]);

  // const removeDuplicates = (songs) => {
  //   const songIds = songs.map(song => song.id);
  //   const uniqueIds = [...new Set(songIds)];
  //   return uniqueIds.map(id => songs.find(song => song.id === id));
  // }
  
  const closeMenu = (e) => {
    setShowMenu(false);
    setResults([]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setShowMenu(false);
    return history.push(`/search/${query}`)
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
            <NavLink to={`/search/${query}`} id="search_message">press enter to search for "{query}"...</NavLink>
            {results.map((result, i) => (
              <li key={i}>
                <NavLink to={`/songs/${result?.item?.id}`}>
                  <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', marginRight: '12px' }}></FontAwesomeIcon>
                  {result.item.title}
                  <span style={{ fontStyle: 'italic', color: '#b3b3b3' }} >&nbsp;by {result.item?.User?.username}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
