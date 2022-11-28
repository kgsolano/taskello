import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import AddBoard from './addBoard';
import '../../index.css'

function AddBoardModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        className='add-board-btn'
        onClick={() => {
          setShowModal(true);
        }}
      >
        <h4 className='add-board-text'>
          create new board
        </h4>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddBoard 
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddBoardModal