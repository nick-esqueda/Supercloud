import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../SongCard';
import SongBadge from '../SongBadge/SongBadge';
import CommentCard from '../CommentCard'
import './ProfileBody.css';

export default function ProfileBody({ user }) {
  const [activeTab, setActiveTab] = useState(1);
  

  return (
    <div className='profile_body_container'>
      <div className='profile__tabs'>
        <div
          className={activeTab === 1 ? 'tab active_tab' : 'tab'}
          onClick={() => setActiveTab(1)}
        >songs</div>
        <div
          className={activeTab === 2 ? 'tab active_tab' : 'tab'}
          onClick={() => setActiveTab(2)}
        >likes</div>
        <div
          className={activeTab === 3 ? 'tab active_tab' : 'tab'}
          onClick={() => setActiveTab(3)}
        >cements</div>
      </div>

      <div
        className={activeTab === 1 ? 'active_content content songs_tab' : 'inactive content songs_tab'}
      >
        {user.Songs.map(song => (
          <SongCard key={song.id} song={song} user={user} />
        ))}

      </div>
      <div
        className={activeTab === 2 ? 'active_content content likes_tab' : 'inactive content likes_tab'}
      >
        {user.Likes.map(like => (
          <SongBadge key={like.id} song={like.Song} />
        ))}
      </div>
      <div
        className={activeTab === 3 ? 'active_content content comments_tab' : 'inactive content comments_tab'}
      >
        {user.Comments.map(comment => (
          <CommentCard key={comment.id} comment={comment} on={comment.Song} />
        ))}
      </div>
    </div>
  )
}
