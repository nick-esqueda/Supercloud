import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSong } from '../../store/songs'
import ArtistBadge from './ArtistBadge'
import CommentSection from './CommentSection'
import Header from './Header'
import Sidebar from './Sidebar'
import './SongPage.css'

export default function SongPage() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  
  const song = useSelector(state => state.songs[songId]);
  
  useEffect(() => {
    dispatch(fetchSong(songId));
  }, [dispatch]);
  
  return (
    <>
      <div className='song_header'>
        <Header song={song} />
      </div>

      <div className='song_main'>
        <div className='song__actions'>
          actions
        </div>

        <div className='song__profile_card'>
          <ArtistBadge artist={song?.User} />
        </div>

        <div className='song__body'>
          <div className="song__description">
            {song?.description}
          </div>
          <div className='song__comments'>
            <CommentSection />
          </div>
        </div>

        <div className='song_sidebar'>
          <Sidebar artist={song?.User} />
        </div>

      </div>
    </>
  )
}
