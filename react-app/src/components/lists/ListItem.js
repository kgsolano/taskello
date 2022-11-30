import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadCardsThunk, addCardThunk } from '../../store/card';
import Card from '../cards/Card';
import SettingsList from './SettingsList';

function ListItem({list, boardId}) {
    const dispatch = useDispatch()
    const listId = list.id
    const user = useSelector((state) => state.session.user);
    const cards = useSelector((state) => Object.values(state.card.allCards));
    const [showSettings, setShowSettings] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [addDisplay, setAddDisplay] = useState(false)

    useEffect(() => (
      dispatch(loadCardsThunk(listId))
    ), [dispatch, listId])

    const addCard = (e) => setCardTitle(e.target.value)

    const handleSubmit = async (e) => {
      e.preventDefault()
      setAddDisplay(!addDisplay)

      const payload = {
        userId: user.id,
        listId,
        name: cardTitle,
        // description: null
      }

      let newCard = await dispatch(addCardThunk(payload, listId))

      if(newCard){
        await dispatch(loadCardsThunk(listId))
      }
    }

    let createCard;

    addDisplay ?
    (createCard = (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter a title for this card...'
          value={cardTitle}
          onChange={addCard}
          />
          <button type='submit'>
            Add Card
          </button>
          <span
                className="add-list-esc"
                onClick={() => {
                  setAddDisplay(!addDisplay);
                }}
              >
                <i class="fa-regular fa-x"></i>
              </span>
      </form>
    )) :
    (createCard = (
      <div className='add-card-div' onClick={() => {setAddDisplay(!addDisplay)}}>
        <p>+ Add a card</p>
      </div>
    ))

  return (
    <div className='list-card-wrapper'>
      <span className='list-title-div'>
        <h4 className='list-title'>{list.title}</h4>
        <button className='list-settings-btn' onClick={() => setShowSettings(true)}>
          <i class="fa-solid fa-ellipsis"></i>
          {showSettings && <SettingsList list={list} boardId={boardId} showSettings={showSettings} setShowSettings={setShowSettings} />}
        </button>
      </span>
      <div className='cards-wrapper'>
        <ul className='card-ul-div'>
          {cards.map((card) => (
            card.listId === listId ?
            <li className='card-item-div' key={card.id}>
              <Card card={card} list={list} />
            </li> : <></>
          ))}
          <li>
            {/* conditional render var here */}
            {createCard}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ListItem