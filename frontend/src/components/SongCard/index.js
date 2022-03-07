import './SongCard.css';

export default function SongCard({ song }) {
  console.log('INDIVIDUAL SONG IN SONGCARD', song.User);
  return (
    <div className='song_card_container'>
      <img src="https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        alt="artwork"
      />

      <div className='song_card__content'>
        <div className='song_card__top'>
          <div className='top__play'></div>
          <div className='top__title_artist'>
            <small>{song?.User?.username}</small>
            <span>song title here</span>
          </div>
          <div className='top__right'>
            <small>11 months ago</small>
            <span className='genre'>genre</span>
          </div>
        </div>

        <div className='song_card__waveform'>
          waveform
        </div>

        <div className='song_card__bottom'>
          <div className='bottom__buttons'>
            <button className='btn btn--secondary--outline'>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjgwNSAzQzguNzg1IDMgOCA1LjM0NSA4IDUuMzQ1UzcuMjE0IDMgNS4xOTcgM0MzLjQ5NCAzIDEuNzQ4IDQuMDk2IDIuMDMgNi41MTRjLjM0NCAyLjk1MyA1LjcyNSA2LjQ4IDUuOTYzIDYuNDg3LjIzOC4wMSA1LjczOC0zLjcyIDUuOTg4LTYuNS4yMDgtMi4zLTEuNDczLTMuNS0zLjE3NS0zLjV6Ii8+Cjwvc3ZnPgo="
                style={{ transform: 'scale(1.2)' }}
              />
              &nbsp;{'# likes placeholder'}
            </button>
            <button className='btn btn--secondary--outline'>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjEgMTEuODZjLS44MjUtLjQxOC0xLjI0My0xLjUzNi0xLjI0My0yLjMyIDAtLjQuMjY4LS43MzUuNTA3LTEuMDA3LjY0OC0uNzQzIDEuMTU0LTEuNjI0IDEuMTU0LTMuNTA3QzEyLjUxOCAyLjI1IDEwLjg1OCAxIDguOTg4IDFjLTEuODcgMC0zLjUzIDEuMjUtMy41MyA0LjAyNiAwIDEuODgzLjUwNSAyLjc2NCAxLjE1MyAzLjUwNy4yNC4yNzIuNTEuNjA3LjUxIDEuMDA2IDAgLjc4NC0uNDIgMS45MDItMS4yNDYgMi4zMi0xLjI0NC42My0zLjQyMyAxLjE2Ny00LjM2NSAxLjg4Qy4yNSAxNC42OTUgMCAxNyAwIDE3aDE4cy0uMjc3LTIuMzA2LTEuNTM0LTMuMjZjLS45NDItLjcxMy0zLjEyLTEuMjUtNC4zNjUtMS44OHoiLz4KPC9zdmc+Cg=="
                style={{ height: '16px' }}
              />
              &nbsp;artist profile
            </button>
            <button className='btn btn--secondary--outline'>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTIgNmgxMHYxMEgyeiIvPgogICAgICAgIDxwYXRoIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik01IDJoMTF2MTBoLTJWNEg1eiIvPgogICAgPC9nPgo8L3N2Zz4K"
                style={{ transform: 'scale(1.0)' }}
              />
              &nbsp;add to playlist
            </button>
            <button className='btn btn--secondary--outline'>
              <img src="https://a-v2.sndcdn.com/assets/images/edit-2fe52d66.svg"
                style={{ transform: 'scale(1.0)' }}
              />
              &nbsp;edit  
            </button>
            <button className='btn btn--secondary--outline'>
              <img src="https://a-v2.sndcdn.com/assets/images/delete-d90bf5e4.svg"
                style={{ transform: 'scale(1.0)' }}
              />
              &nbsp;delete
            </button>
          </div>
          <div className='bottom__right'>
            <span>▶ 100k</span>
            <span>💬 965</span>
          </div>
        </div>
        
      </div>

    </div>
  )
}
