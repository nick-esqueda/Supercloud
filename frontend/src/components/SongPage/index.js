import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchLikes } from '../../store/likes'
import { fetchSong } from '../../store/songs'
import Actions from './Actions'
import ArtistBadge from './ArtistBadge'
import CommentSection from './CommentSection'
import Header from './Header'
import Sidebar from './Sidebar'
import './SongPage.css'

export default function SongPage() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector(state => state.songs.songs[songId]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchSong(songId));
    dispatch(fetchLikes());
  }, [dispatch]);
  
  return !song ? <h2>loading...</h2> : (
    <>
      <div className='song_header'>
        <Header song={song} />
      </div>

      <div className='song_main'>
        <div className='song__actions'>
          <Actions song={song} user={user} />
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
