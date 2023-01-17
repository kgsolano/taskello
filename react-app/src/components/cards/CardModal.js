import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadActivitiesThunk, addActivityThunk } from '../../store/activity'
import { loadCardsThunk, updateCardThunk } from '../../store/card'
import ActivityItem from './ActivityItem'

function CardModal({card, list, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState('')
    const [addComment, setAddComment] = useState('')
    const user = useSelector(state => state.session.user)
    const activityObj = useSelector(state => state.activity)
    const activity = Object.values(activityObj)
    const cardId = card.id
    const listId = list.id
    const comments = card.activities

    const userInitial = user.username[0].toUpperCase()

    useEffect(() => {
      dispatch(loadActivitiesThunk(cardId))
    },[comments])

    console.log("this is activity state", activity)
    console.log("this is comments", comments)



    const handleSubmit = async () => {
        // e.preventDefault()

        const payload = {
            userId: user.id,
            listId: list.id,
            description,
            name: card.name
        };

        await dispatch(updateCardThunk(payload, card.id))
        // await dispatch(loadCardsThunk(listId))
        // setEditDescription(!editDescription)
    }

    const handleActivitySubmit = async (e) => {
      e.preventDefault()

      const payload = {
        cardId: card.id,
        userId: user.id,
        comment: addComment
      }

      let newComment = await dispatch(addActivityThunk(card.id, payload))

      if (newComment) {
        setAddComment('')
        await dispatch(loadActivitiesThunk(cardId))
      }
    }

    const newDescription = (e) => setDescription(e.target.value)

    let descriptionText;
    
    editDescription
    ? descriptionText = (
        <div className='modal-input-div'>
            <form className='modal-form-div' onSubmit={() => handleSubmit()}>
              <input
                className='modal-input'
                type="textarea"
                placeholder="Add a more detailed description..."
                value={card.description ? card.description : description}
                onChange={newDescription}
                />
              <button className='modal-submit-btn' type="submit">Save</button>
            </form>
          </div>
        )
        : (descriptionText = <p>{card.description}</p>);

        console.log('this is description', description)


  return (
    <div className="card-modal-div">
      {/* title div */}
      <div className="card-title-area">
        <img
          className="title-card-img"
          src="https://i.imgur.com/OexFgJj.png"
          alt="title-card"
        />
        <div className="modal-title">
          <h3>{card.name}</h3>
          <p>In list: {list.title}</p>
        </div>
      </div>
      {/* description div */}
      <div className="card-description-area">
        <i className="fa-solid fa-align-left title-card-img"></i>
        <div className="modal-description">
          <span className="description-area">
            <h4>Description (optional)</h4>
            <button
              className="modal-edit-btn"
              onClick={() => {
                setEditDescription(!editDescription);
              }}
            >
              Edit
            </button>
          </span>
          {descriptionText}
        </div>
      </div>
      <div className="activity-area-div">
        <div className="activity-title">
          <i class="fa-solid fa-list-ul title-card-img"></i>
          <span className='activity-text-div'>
            <h4 className='activity-text'>Activity</h4>
          </span>
        </div>
        <div className="activity-area">
          <div className="comment-form-div">
            <div className="user-initial user-circle">{userInitial}</div>
            <form className="comment-form" onSubmit={handleActivitySubmit}>
              <input
                className="comment-input"
                type="textarea"
                placeholder="Write a comment..."
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
              />
              <button className="comment-submit-btn" type="submit">
                Save
              </button>
            </form>
          </div>
          <div className="activity-list">
            <ul className="activity-list-ul">
              {activity &&
                activity.map((comment) => (
                  <li className="activity-comment">
                    <ActivityItem
                      key={comment.id}
                      comment={comment}
                      user={user}
                      userInitial={userInitial}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardModal