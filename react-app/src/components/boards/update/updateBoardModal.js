import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBoard from "./updateBoard";


function UpdateBoardModal({showModal, setShowModal, boardId, board}) {
//   const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* <div
        onClick={() => {
          setShowModal(true);
        }}
      >
      </div> */}
      {showModal && (
        <Modal onClose={() => {setShowModal(false)}}>
          <UpdateBoard showModal={showModal} setShowModal={setShowModal} boardId={boardId} board={board}/>
        </Modal>
      )}
    </div>
  );
}

export default UpdateBoardModal;
