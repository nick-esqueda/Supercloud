import './CommentCard.css'

export default function CommentCard({ comment }) {
  return (
    <div className='comment__wrapper'>
      <div className='comment__left'>
        <img src="https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />

        <span style={{ color: '#b3b3b3' }}>{comment.User.username}</span>
        <span>comment content</span>
      </div>
      
      <div className='comment__right'>
        <span style={{ color: '#b3b3b3' }}>
          time elapsed
        </span>
      </div>
    </div>
  )
}
