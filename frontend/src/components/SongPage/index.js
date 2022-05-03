import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchArtist } from '../../store/artists'
import { fetchSongsComments } from '../../store/comments'
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
  const [route, setRoute] = useState(songId);
  const dispatch = useDispatch();
  
  const song = useSelector(state => state.songs.songs[songId]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    (async () => {
      const song = await dispatch(fetchSong(songId));
      const artist = await dispatch(fetchArtist(song.userId));
      setArtist(artist);
      setIsLoaded(true);
    })();
  }, [dispatch, songId]);

  if (songId !== route) {
    setRoute(songId);
    return window.location.reload();
  }

  return !isLoaded ? <h2 id='loading'>loading...</h2> : (
    <>
      <div className='song_header'>
        <Header song={song} />
      </div>

      <div className='song_main'>
        <div className='song__actions'>
          <Actions song={song} />
        </div>

        <div className='song__profile_card'>
          <ArtistBadge artist={song?.User} />
        </div>

        <div className='song__body'>
          <div className="song__description">
            {song?.description}
          </div>
          <div className='song__comments'>
            <CommentSection comments={song.Comments} />
          </div>
        </div>

        <div className='song_sidebar'>
          <Sidebar artist={artist} />
        </div>

      </div>
    </>
  )
}
