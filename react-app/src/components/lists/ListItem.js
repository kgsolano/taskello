import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadCardsThunk, addCardThunk } from '../../store/card';
import { getListThunk, loadListsThunk } from '../../store/list';
import Card from '../cards/Card';
import SettingsList from './SettingsList';

function ListItem({list, boardId}) {
    const dispatch = useDispatch()
    const listId = list.id
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const cardsArr = useSelector((state) => state.list.allLists[listId].cards);
    const cards = cardsArr?.length > 0 ?  Object.values(cardsArr) : []
    const [showSettings, setShowSettings] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    // const [description, setDescription] = useState('')
    const [addDisplay, setAddDisplay] = useState(false)


    useEffect(() => {
      dispatch(loadListsThunk(boardId))
} , [dispatch, cardsArr?.length])

    useEffect(() => (
      dispatch(getListThunk(boardId))
    ), [dispatch])

    const addCard = (e) => setCardTitle(e.target.value)
    // const addDescription = (e) => setDescription(e.target.value)

    const handleSubmit = async (e) => {
      e.preventDefault()
      setAddDisplay(!addDisplay)

      const payload = {
        userId,
        listId,
        name: cardTitle,
        // description
      }

      let newCard = await dispatch(addCardThunk(payload, listId))


      if(newCard){
        await dispatch(loadListsThunk(boardId))
        await dispatch(loadCardsThunk(listId))
      }
    }

    let createCard;

    addDisplay
      ? (createCard = (
        <form className="add-list-form" onSubmit={handleSubmit}>
              <div className="card-item-div">
              <input
                className="add-list-input"
                type="text"
                placeholder="Enter a title for this card..."
                value={cardTitle}
                onChange={addCard}
              />
              </div>
              <button className="add-list-btn" type="submit">
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
        ))
      : (createCard = (
          <div
            // className="card-item-div"
            onClick={() => {
              setAddDisplay(!addDisplay);
            }}
          >
            <p>+ Add a card</p>
          </div>
        ));

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
          {cardsArr?.map((card) => (
            
            <li className='card-item-div' key={card.id}>
              <Card card={card} list={list} listId={listId} boardId={boardId}/>
              
            </li> 
            ))}
          <li className='add-card-li'>
            {/* conditional render var here */}
            {createCard}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ListItem