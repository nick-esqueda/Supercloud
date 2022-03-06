import React from 'react';
import './CommentSection.css';

export default function CommentSection() {
  return (
    <div className='comment_section'>
      
      <span className='comments__comment_count'>💬 69 comments</span>
      
      <ul className='comments'>
        {/* map through comments and render out comment component */}
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
        <li>comment placeholder</li>
      </ul>
      
      
    </div>
  )
}
