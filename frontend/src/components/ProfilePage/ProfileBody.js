import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../SongCard';
import SongBadge from '../SongBadge/SongBadge';
import CommentCard from '../CommentCard'
import './ProfileBody.css';

export default function ProfileBody({ user }) {
  const [activeTab, setActiveTab] = useState(1);
  const usersLikes = useSelector(state => state.likes.usersLikes2);

  return (
    <div className='profile_body_container'>
      <div className='profile__tabs'>
        {/* !user.Songs.length ? null : */
          <div
            className={activeTab === 1 ? 'tab active_tab' : 'tab'}
            onClick={() => setActiveTab(1)}
          >songs</div>
        }
        {/* !user.Likes.length ? null : */
          <div
            className={activeTab === 2 ? 'tab active_tab' : 'tab'}
            onClick={() => setActiveTab(2)}
          >likes</div>
        }
        {/* !user.Comments.length ? null : */
          <div
            className={activeTab === 3 ? 'tab active_tab' : 'tab'}
            onClick={() => setActiveTab(3)}
          >comments</div>
        }
      </div>


      <div
        className={activeTab === 1 ? 'active_content content songs_tab' : 'inactive content songs_tab'}
      >
        {!user.Songs.length ? (<h2 style={{ color: '#535353' }}>this user doesn't have any songs yet.</h2>)
          :
          user.Songs.map(song => (
            <SongCard key={song.id} song={song} user={user} />
          ))
        }

      </div>
      <div
        className={activeTab === 2 ? 'active_content content likes_tab' : 'inactive content likes_tab'}
      >
        {!user.Likes.lenth ? (<h2 style={{ color: '#535353', width: '840px' }}>this user hasn't liked anything yet.</h2>)
          :
          usersLikes.map(like => (
            <SongBadge key={like.id} song={like.Song} artist={user} />
          ))
        }
      </div>
      <div
        className={activeTab === 3 ? 'active_content content comments_tab' : 'inactive content comments_tab'}
      >
        {!user.Comments.length ? (<h2 style={{ color: '#535353' }}>this user hasn't made any comments.</h2>)
          :
          user.Comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} on={comment.Song} />
          ))
        }
      </div>
    </div>
  )
}
