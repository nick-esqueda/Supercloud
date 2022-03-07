import React from 'react'
import SongForm from '../SongForm'
import './UploadSongPage.css'

export default function UploadSongPage() {
  return (
    <div className='upload_page'>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      <SongForm />
    </div>
  )
}
