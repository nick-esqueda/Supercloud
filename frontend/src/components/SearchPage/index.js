import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuery } from '../../store/search';
import SongCard from '../SongCard';

import './SearchPage.css';
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

export default function SearchPage() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const user = useSelector(state => state.session.user);
  const searchResults = useSelector(state => state.search);
  const [sortedResults, setSortedResults] = useState([]);

  useEffect(() => {
    if (!searchResults.length) {
      dispatch(fetchQuery(query));
    }
  }, [query])
  
  useEffect(() => {
    const fuse = new Fuse(searchResults, options);
    const fuseResults = fuse.search(query);
    setSortedResults(fuseResults);
  }, [searchResults])

  return !searchResults ? <h2>sorry, we could't find anything that matches "{query}"</h2> : (
    <div className='search_page'>
      <h2>search results for "{query}"</h2>

      <div className='search__main'>
        <div className='search__sidebar'>
          <h1 style={{ fontSize: '24px', textAlign: 'left', padding: '0 0 8px', width: '100%', marginBottom: '12px' }}><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

          <h4>disclaimer: this page is a work in progress. please be gentle!</h4>
          <br />
          <div>generated results: {searchResults.length}</div>
          <div>generated results: {searchResults.length}</div>
          <div>generated results: {searchResults.length}</div>
          <div>generated results: {searchResults.length}</div>
          <div>generated results: {searchResults.length}</div>
          <div>generated results: {searchResults.length}</div>

        </div>

        <ul className='search__body'>
          {sortedResults.slice(0, 20).map(result => (
            <SongCard key={result.item.id} song={result.item} user={user} />
          ))}
        </ul>
      </div>

    </div>
  )
}
