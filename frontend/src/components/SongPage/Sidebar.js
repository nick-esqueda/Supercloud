import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <span className='inner_section_header'>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDE1MywgMTUzLCAxNTMpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo="
          style={{ position: 'relative', bottom: '-8px' }}
          alt=''
        />
        &nbsp;more songs by the artist
        
        <NavLink to={'/link-to-artist-page-songs-tab'} 
          style={{ position: 'absolute', right: '0', bottom: '6px' }}
        >view all</NavLink>
      </span>

      <ul className="songs">
        {/* map through artist's and render out song card (small) component (limit 3(?)) */}
        <li>song placeholder</li>
        <li>song placeholder</li>
        <li>song placeholder</li>
      </ul>
    </div>
  )
}
