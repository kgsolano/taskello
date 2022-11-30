import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardThunk, getCardThunk, loadCardsThunk } from '../../store/card';
import { getListThunk, loadListsThunk } from '../../store/list';
import { Modal } from '../context/Modal';
import CardModal from './CardModal';

function Card({card, list, listId, boardId}) {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const cardId = card.id

  console.log("idk what this should be--------",listId)

  const handleDelete = async (cardId) => {
    if (cardId) {
      await dispatch(deleteCardThunk(cardId))
      await dispatch(loadListsThunk(boardId))
      console.log("delete worked")
    } 
  }

  useEffect(() => {
    dispatch(loadCardsThunk(listId))
  }, [dispatch, listId]);
    
  return (
      <div className="card-item">
        
        
      <p className="card-title" onClick={() => setShowModal(true)}>
      {card.name}
      <i class="fa-sharp fa-solid fa-minus" onClick={() => {handleDelete(cardId)}}></i>
      </p>
      
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