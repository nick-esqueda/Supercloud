import CommentSection from './CommentSection'
import Header from './Header'
import Sidebar from './Sidebar'
import './SongPage.css'

export default function SongPage() {
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
          profile card
        </div>

        <div className='song__body'>
          <div className="song__description">
            song description
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
