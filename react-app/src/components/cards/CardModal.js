import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadCardsThunk, updateCardThunk } from '../../store/card'

function CardModal({card, list, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState('')
    const user = useSelector(state => state.session.user)
    const cardId = card.id
    const listId = list.id




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

    const newDescription = (e) => setDescription(e.target.value)

    let descriptionText;
    
    editDescription
    ? descriptionText = (
        <div>
            <form onSubmit={() => handleSubmit()}>
              <input
                type="textarea"
                placeholder="Add a more detailed description..."
                value={description}
                onChange={newDescription}
                />
              <button type="submit">Save</button>
            </form>
          </div>
        )
        : (descriptionText = <p>{card.description}</p>);

        console.log('this is description', description)


  return (
    <div>
        {/* title div */}
    <div className='card-title-area'>
      <img src="https://i.imgur.com/OexFgJj.png" alt="title-card" />
      <div className="modal-title">
        <h3>{card.name}</h3>
        <p>In list {list.title}</p>
      </div>
    </div>
        {/* description div */}
    <div className='card-description-area'>
        <i className="fa-solid fa-align-left"></i>
        <div className='modal-description'>
            <span>
                <h4>Description</h4>
                <button onClick={() => {setEditDescription(!editDescription)}}>Edit</button>
            </span>
            {descriptionText}
            
        </div>
    </div>

    </div>
  );
}

export default CardModal