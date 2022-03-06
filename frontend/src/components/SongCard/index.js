import './SongCard.css';

export default function SongCard() {
  return (
    <div className='song_card_container'>
      <img src="https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        alt="artwork"
      />

      <div className='song_card__content'>
        <div className='song_card__top'>
          <div className='top__play'></div>
          <div className='top__title_artist'>
            <small>artist name</small>
            <span>song title here</span>
          </div>
          <div className='top__right'>
            <small>11 months ago</small>
            <span className='genre'>genre</span>
          </div>
        </div>

        <div className='song_card__waveform'>

        </div>

        <div className='song_card__bottom'>
          <div className='bottom__buttons'>
            <button className='btn btn--secondary--outline'>♥ 7</button>
            <button className='btn btn--secondary--outline'>🙋‍♂️</button>
            <button className='btn btn--secondary--outline'>📚</button>
            <button className='btn btn--secondary--outline'>edit</button>
            <button className='btn btn--secondary--outline'>🗑 delete</button>
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
