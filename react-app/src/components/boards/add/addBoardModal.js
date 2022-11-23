import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import AddBoard from './addBoard';

function AddBoardModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        create a board
      </button>
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