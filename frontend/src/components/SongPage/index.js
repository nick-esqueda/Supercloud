import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const song = useSelector(state => state.songs.songs[songId]);
  const comments = useSelector(state => state.comments);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(fetchSong(songId));
      await dispatch(fetchSongsComments(songId))
      await dispatch(fetchLikes());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return !isLoaded ? <h2>loading...</h2> : (
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
            {!comments ? <h4>loading comments...</h4> : (
              <CommentSection comments={Object.values(comments)} />
            )}
          </div>
        </div>

        <div className='song_sidebar'>
          <Sidebar artist={song.User} />
        </div>

      </div>
    </>
  )
}
