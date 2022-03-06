import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArtistBadge from './ArtistBadge'
import CommentSection from './CommentSection'
import Header from './Header'
import Sidebar from './Sidebar'
import './SongPage.css'

export default function SongPage() {
  const { songId } = useParams();
  console.log(songId);
  // const song = useSelector(state => state.songs[songId]); // adjust after making reducer
  
  return (
    <>
      <div className='song_header'>
        <Header />
      </div>

      <div className='song_main'>
        <div className='song__actions'>
          actions
        </div>

        <div className='song__profile_card'>
          <ArtistBadge />
        </div>

        <div className='song__body'>
          <div className="song__description">
            {'song description'}
          </div>
          <div className='song__comments'>
            <CommentSection />
          </div>
        </div>

        <div className='song_sidebar'>
          <Sidebar />
        </div>

      </div>
    </>
  )
}
