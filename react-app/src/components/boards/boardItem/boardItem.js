import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoardThunk, loadBoardsThunk } from '../../../store/board';
import UpdateBoardModal from '../update/updateBoardModal';

function BoardItem({board}) {

    const dispatch = useDispatch();
    const boardId = board.id
    const [showModal, setShowModal] = useState(false);

    // console.log("board from board item", board.id)

    const handleDelete = (boardId) => {
        if (boardId){
            dispatch(deleteBoardThunk(boardId))
        } else {
            return "board does not exist"
        }
    }

    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])

  return (
    <div>
        {board.boardName}
        <button onClick={(e) => setShowModal(true)}>
            edit
            <UpdateBoardModal board={board} setShowModal={setShowModal} showModal={showModal} />
            </button>
        <button onClick={() => handleDelete(boardId)}>delete</button>
    </div>
  );
}

export default BoardItem