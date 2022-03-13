import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuery } from '../../store/search';
import SongCard from '../SongCard';
import './SearchPage.css';

export default function SearchPage() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const searchResults = useSelector(state => state.search);
  const user = useSelector(state => state.session.user);

  console.log(searchResults);

  useEffect(() => {
    if (!searchResults.length) {
      dispatch(fetchQuery(query));
    }
  }, [query])

  return (
    <div className='search_page'>
      <h2>search results for "{query}"</h2>

      <div className='search__main'>
        <div className='search__sidebar'>
          <h4>generated results: {searchResults.length}</h4>
          <h4>generated results: {searchResults.length}</h4>
          <h4>generated results: {searchResults.length}</h4>
          <h4>generated results: {searchResults.length}</h4>
          <h4>generated results: {searchResults.length}</h4>
          <h4>generated results: {searchResults.length}</h4>
          
        </div>

        <ul className='search__body'>
          {searchResults.slice(20).map(song => (
            <SongCard key={song.id} song={song} user={user} />
          ))}
        </ul>
      </div>

    </div>
  )
}
