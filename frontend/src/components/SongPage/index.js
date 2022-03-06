import React from 'react'
import './SongPage.css'

export default function SongPage() {
  return (
    <>
      <div className='song_header'>
        header
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
            comment section
          </div>
        </div>

        <div className='song_sidebar'>
          sidebar
        </div>
        
      </div>
    </>
  )
}
