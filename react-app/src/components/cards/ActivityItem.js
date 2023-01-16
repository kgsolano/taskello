import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteActivityThunk, loadActivitiesThunk } from '../../store/activity'

function ActivityItem({comment, user, userInitial}) {
    const commentId = comment.id
    const cardId = comment.cardId
    const dispatch = useDispatch()

    const handleDelete = async (commentId) => {
        if (commentId){
            await dispatch(deleteActivityThunk(comment.id))
            await dispatch(loadActivitiesThunk(cardId))
        } else {
            return "comment does not exist"
        }
    }


  return (
    <div className='comment-div'>
        <span className='comment-title'>
            <div className='user-initial user-circle'>{userInitial}</div>
            <h4 className='comment-user-name'>{user.username}</h4>
        </span>
        <div className='comment-text'>{comment.comment}</div>
        <p className='delete-comment' onClick={(e) => {handleDelete(commentId)}}>Delete</p>

    </div>
  )
}

export default ActivityItem