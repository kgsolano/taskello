import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadCardsThunk, addCardThunk } from '../../store/card';
import { getListThunk, loadListsThunk, sort, updateListOrder } from '../../store/list';
import Card from '../cards/Card';
import SettingsList from './SettingsList';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function ListItem({list, boardId}) {
    const dispatch = useDispatch()
    const listId = list.id
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const cardsArr = useSelector((state) => state.list.allLists[listId].cards);
    const cards = cardsArr?.length > 0 ?  Object.values(cardsArr) : []
    const [showSettings, setShowSettings] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [addDisplay, setAddDisplay] = useState(false)
    const [errors, setErrors] = useState([]);

    // console.log("this is cardsArr -----", useSelector((state) => state.list))

    useEffect(() => {
      const errorsArr = [];

      if (!cardTitle.length) errorsArr.push("Please enter a title");
      if (cardTitle.length > 50)
        errorsArr.push("Title must be less than 50 characters");

      setErrors(errorsArr);
    }, [cardTitle]);

    const onDragEnd = (result) => {
      const { destination, source, draggableId } = result

      const droppableIdStart = source.droppableId
      const droppableIndexStart = source.index
      const droppableIndexEnd = destination.index

      if (!result.destination) return;

      if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
      ) return;

      const cardOrder = list.cards
      console.log("this is cardOrder", cardOrder)
      
      cardOrder.splice(droppableIndexEnd, 0, cardOrder.splice(droppableIndexStart, 1)[0])


      const payload = {
        cards: cardOrder,
      }

      dispatch(updateListOrder(payload, listId))
    
    }

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
            {errors.length ? (
              <div>
                {errors.map((error, i) => (
                  <div className="error-msg" key={i}>
                    {error}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="add-card-item-div">
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
            <p className='add-card-div'>+ Add a card</p>
          </div>
        ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={listId.toString()}>
        {(provided) => (
          <div
            className="list-card-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="list-title-div">
              <h4 className="list-title">{list.title}</h4>
              <button
                className="list-settings-btn"
                onClick={() => setShowSettings(true)}
              >
                <i class="fa-solid fa-ellipsis"></i>
                {showSettings && (
                  <SettingsList
                    list={list}
                    boardId={boardId}
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                  />
                )}
              </button>
            </span>
            <div className="cards-wrapper">
              <ul className="card-ul-div">
                {cardsArr?.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="card-item-div"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Card
                          card={card}
                          list={list}
                          listId={listId}
                          boardId={boardId}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                <li className="add-card-li">
                  {/* conditional render var here */}
                  {createCard}
                </li>
              </ul>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListItem