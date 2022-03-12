import { NavLink } from "react-router-dom";
import './SongCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';


export default function SongCardSmall({ song }) {
  if (!song) return null;
  const commentCount = !song.Comments ? 0 : song.Comments.length;
  const likeCount = !song.Likes ? 0 : song.Likes.length;
  
  return (
    <div className='song_card_small_container'>

      <NavLink to={`/songs/${song.id}`}>
        <img src={song.artworkURL
          ? song.artworkURL
          : "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        }
          alt="artwork"
        />
      </NavLink>

      <div className='song_card_small__content'>
        <div className='song_card_small__top'>
          {/* <div className='top__play'></div> */}

          <div className='top__title_artist'>
            <NavLink to={`/users/${song.User.id}`}>
              <span style={{ color: '#b3b3b3' }}>{song.User.username}</span>
            </NavLink>
            <NavLink to={`/songs/${song.id}`}>
              <span>{song.title}</span>
            </NavLink>
          </div>
        </div>

        <div className='song_card_small__bottom'>
          <div className='bottom__right'>
            <span>
              <FontAwesomeIcon icon={faHeart} style={{ color: '#b3b3b3', position: 'relative', top: '-1px' }}></FontAwesomeIcon>
              &nbsp;{likeCount}
            </span>

            <span style={{ color: '#b3b3b3' }}>
              ▶ 
              <span style={{ color: 'white', marginLeft: '6px' }}>{song.plays}</span>
            </span>

            <span>
              <FontAwesomeIcon icon={faMessage} style={{ color: '#b3b3b3', position: 'relative', bottom: '-1px' }}></FontAwesomeIcon>
              &nbsp;{commentCount}
            </span>

          </div>
        </div>
      </div>

    </div>

  )
}
