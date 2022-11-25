import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBoardThunk, loadBoardsThunk, addBoardThunk, getBoardThunk } from '../../../store/board';
import AddBoardModal from '../add/addBoardModal';
import UpdateBoardModal from '../update/updateBoardModal';
import '../../index.css'

function BoardItem({board}) {

    const dispatch = useDispatch();
    const history = useHistory()
    const boardId = board.id
    const [showModal, setShowModal] = useState(false);
    const [clicked, setClicked] = useState(false)
    // console.log("board from board item", board.id)

    const handleDelete = async (boardId) => {
        console.log("this is the boardId", board)
        if (boardId){
            await dispatch(deleteBoardThunk(boardId))
            await dispatch(loadBoardsThunk())
        } else {
            return "board does not exist"
        }
    }

    const goToBoard = () => {
        dispatch(getBoardThunk(boardId))
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 200)
        history.push(`/workspace/${boardId}`)
    }


    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])


  return (
    <div onClick={() => {goToBoard()}}>
        {board.boardName}
            <UpdateBoardModal board={board} />
        <button onClick={() => handleDelete(boardId)}>delete</button>
    </div>
  );
}

export default BoardItem