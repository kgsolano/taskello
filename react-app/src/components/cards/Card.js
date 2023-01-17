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
  const commentArr = card.activities
 
  // useEffect(() => {
  //   console.log(commentArr.length)
  // },[commentArr])


  const handleDelete = async (cardId) => {
    if (cardId) {
      await dispatch(deleteCardThunk(cardId))
      await dispatch(loadListsThunk(boardId))
  
    } 
  }

  useEffect(() => {
    dispatch(loadCardsThunk(listId))
  }, [dispatch, commentArr]);

  // console.log("this is commentArr", commentArr)
    
  return (
      <div className="card-item">
        
      <div className='card-title'>
        <p className='card-name-text' onClick={() => setShowModal(true)}>
        {card.name}
        </p>
        <i class="fa-sharp fa-solid fa-square-minus" onClick={() => {handleDelete(cardId)}}></i>
      </div>
      <div className='card-icons'>
        {card.description && <i class="fa-solid fa-align-left"></i>}
        {commentArr.length ? <div className='comment-icon'><i class="fa-regular fa-comment"></i> {commentArr.length} </div> : null}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <CardModal card={card} list={list} setShowModal={setShowModal} />
        </Modal>
        )}
      
        </div>
        );
}

export default Card