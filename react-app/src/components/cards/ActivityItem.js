import React from 'react'

function ActivityItem({comment, user, userInitial}) {
  return (
    <div className='comment-div'>
        <span className='comment-title'>
            <div className='user-initial'>{userInitial}</div>
            <div className='comment-user-name'>{user.username}</div>
        </span>
        <div className='comment-text'>{comment.comment}</div>

    </div>
  )
}

export default ActivityItem