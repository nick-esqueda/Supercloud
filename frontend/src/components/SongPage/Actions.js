import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSong } from '../../store/songs';
import EditSongModal from '../Modal/EditSongModal';
import './Actions.css';

export default function Actions({ song, isArtist }) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className='actions_container'>
      <div className='write_comment'>
        <img src='https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt='profile'
        />

        <form className="comment_form">
          <div className="form_group" style={{ width: '100%' }}>
            <input type="text"
              id="comment"
              placeholder='write a comment'
              // value={}
              // onChange={}
              className="form_input"
            // style={
            //   showErrors && (validationErrors.includes('please enter a title'))
            //     ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null
            // }
            />
          </div>
        </form>
      </div>

      <div className='bottom__buttons'>
        <button className='btn btn--secondary--outline'>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjgwNSAzQzguNzg1IDMgOCA1LjM0NSA4IDUuMzQ1UzcuMjE0IDMgNS4xOTcgM0MzLjQ5NCAzIDEuNzQ4IDQuMDk2IDIuMDMgNi41MTRjLjM0NCAyLjk1MyA1LjcyNSA2LjQ4IDUuOTYzIDYuNDg3LjIzOC4wMSA1LjczOC0zLjcyIDUuOTg4LTYuNS4yMDgtMi4zLTEuNDczLTMuNS0zLjE3NS0zLjV6Ii8+Cjwvc3ZnPgo="
            style={{ transform: 'scale(1.2)' }}
            alt=''
          />
          &nbsp;{'# of likes'}
        </button>
        <button className='btn btn--secondary--outline'>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjEgMTEuODZjLS44MjUtLjQxOC0xLjI0My0xLjUzNi0xLjI0My0yLjMyIDAtLjQuMjY4LS43MzUuNTA3LTEuMDA3LjY0OC0uNzQzIDEuMTU0LTEuNjI0IDEuMTU0LTMuNTA3QzEyLjUxOCAyLjI1IDEwLjg1OCAxIDguOTg4IDFjLTEuODcgMC0zLjUzIDEuMjUtMy41MyA0LjAyNiAwIDEuODgzLjUwNSAyLjc2NCAxLjE1MyAzLjUwNy4yNC4yNzIuNTEuNjA3LjUxIDEuMDA2IDAgLjc4NC0uNDIgMS45MDItMS4yNDYgMi4zMi0xLjI0NC42My0zLjQyMyAxLjE2Ny00LjM2NSAxLjg4Qy4yNSAxNC42OTUgMCAxNyAwIDE3aDE4cy0uMjc3LTIuMzA2LTEuNTM0LTMuMjZjLS45NDItLjcxMy0zLjEyLTEuMjUtNC4zNjUtMS44OHoiLz4KPC9zdmc+Cg=="
            style={{ height: '16px' }}
            alt=''
          />
          &nbsp;
          <NavLink to={`/users/COME-BACK-AND-MAKE-DYNAMIC`}>artist profile</NavLink>
        </button>
        <button className='btn btn--secondary--outline'>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTIgNmgxMHYxMEgyeiIvPgogICAgICAgIDxwYXRoIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik01IDJoMTF2MTBoLTJWNEg1eiIvPgogICAgPC9nPgo8L3N2Zz4K"
            style={{ transform: 'scale(1.0)' }}
            alt=''
          />
          &nbsp;add to playlist
        </button>

        {isArtist && (
          <>
            <EditSongModal song={song} />

            <button className='btn btn--secondary--outline'
              onClick={e => {
                if (window.confirm(`Are you sure you want to delete your song? This cannot be undone`)) {
                  if (window.confirm(`This is a double check - clicking "OK" will delete your song permanently`)) {
                    dispatch(deleteSong(song.id));
                    return history.push('/');
                  }
                }
              }}
            >
              <img src="https://a-v2.sndcdn.com/assets/images/delete-d90bf5e4.svg"
                style={{ transform: 'scale(1.0)' }}
                alt=''
              />
              &nbsp;delete
            </button>
          </>
        )}

      </div>
    </div>
  )
}
