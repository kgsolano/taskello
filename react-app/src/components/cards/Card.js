import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardThunk, getCardThunk, loadCardsThunk } from '../../store/card';
import { getListThunk } from '../../store/list';
import { Modal } from '../context/Modal';
import CardModal from './CardModal';

function Card({card, list, listId}) {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const cardId = card.id
  const matchedList = card.listId === listId

  console.log("idk what this should be--------",listId)

  const handleDelete = async (cardId) => {
    if (cardId) {
      await dispatch(deleteCardThunk(cardId))
      await dispatch(loadCardsThunk(listId))
    } else {
      return "card does not exist"
    }
  }

  useEffect(() => 
    dispatch(getCardThunk(listId))
  , [dispatch]);
    
  return (
      <div className="card-item">
        {card.listId === listId &&
        
      <p className="card-title" onClick={() => setShowModal(true)}>
      {card.name}
      <i class="fa-sharp fa-solid fa-minus" onClick={() => {handleDelete(cardId)}}></i>
      </p>
      }
      {card.description && <i class="fa-solid fa-align-left"></i>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <CardModal card={card} list={list} setShowModal={setShowModal} />
        </Modal>
        )}
      
        </div>
        );
}

export default Card