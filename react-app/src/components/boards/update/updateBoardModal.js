import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBoardThunk } from "../../../store/board";
import { Modal } from "../../context/Modal";
import UpdateBoard from "./updateBoard";


function UpdateBoardModal({board}) {
//   const [showModal, setShowModal] = useState(false);
const currBoard = useSelector(state => Object.values(state.board.currentBoard))
const [showModal, setShowModal] = useState(false)
// console.log(board)
// console.log('show modal from update board modal', showModal)

useEffect(() => {
  getBoardThunk(board.id)
})

  return (
    <div>
      <button onClick={() => {setShowModal(true)}}>Edit</button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false)}}>
          <UpdateBoard showModal={showModal} setShowModal={setShowModal} board={board}/>
        </Modal>
      )}
    </div>
  );
}

export default UpdateBoardModal;
