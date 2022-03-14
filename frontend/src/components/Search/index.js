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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    if (!query) return;
    
    // const filtered = allSongs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
    
    const fuse = new Fuse(allSongs, options);
    const results = fuse.search(query);
    setResults(results);

    let timer;
    if (results.length < 30) {
      timer = setTimeout(async () => {
        const dbResults = await dispatch(fetchQuery(query));
        const fuse = new Fuse(dbResults, options);
        const results = fuse.search(query);
        setResults(results);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

  // const removeDuplicates = (songs) => {
  //   const songIds = songs.map(song => song.id);
  //   const uniqueIds = [...new Set(songIds)];
  //   return uniqueIds.map(id => songs.find(song => song.id === id));
  // }
  
  // FUSE******************

  
  

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
                <NavLink to={`/songs/${result.item.id}`}>
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
