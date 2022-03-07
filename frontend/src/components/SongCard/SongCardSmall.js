import { NavLink } from "react-router-dom";
import './SongCard.css';


export default function SongCardSmall({ artist, index }) {
  const song = artist.Songs[index];
  return (
    <div className='song_card_small_container'>
      
      <NavLink to={`/songs/${song?.id}`}>
        <img src={song?.artworkURL
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
            <NavLink to={`/users/${artist.id}`}>
              <span style={{ color: '#b3b3b3' }}>{artist.username}</span>
            </NavLink>
            <NavLink to={`/songs/${song?.id}`}>
              <span>{song?.title}</span>
            </NavLink>
          </div>
        </div>

        <div className='song_card_small__bottom'>
          <div className='bottom__right'>
            <span>♥ {'# likes'}</span>
            <span>▶ {song?.plays}</span>
            <span>💬 {"cmnts"}</span>
          </div>
        </div>
      </div>

    </div>

  )
}
