import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import SongForm from '../SongForm'
import './UploadSongPage.css'

export default function UploadSongPage() {
  const user = useSelector(state => state.session.user);
  
  if (!user) return <h2 style={{ height: '100vh' }}>{"you're not supposed to be here."}</h2>
  
  return user && (
    <div className='upload_page'>
      <h1><span style={{ color: '#FFFF5D' }}>super</span><span style={{ color: 'white', textDecoration: 'overline', textDecorationColor: '#FFFF5D' }}>cloud</span></h1>

      <SongForm />
    </div>
  )
}
