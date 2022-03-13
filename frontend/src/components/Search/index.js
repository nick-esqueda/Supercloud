import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.css';

export default function Search() {
  return (
    <form className="header__searchForm">
      <input type="text" placeholder="search" className="header__searchInput" />
      <button type="submit" className="btn btn--secondary" style={{ boxShadow: "none" }}>
        <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', transform: 'scale(1.2)' }}></FontAwesomeIcon>
      </button>
    </form>
  )
}
