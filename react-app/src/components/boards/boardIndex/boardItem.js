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
    const [showSettings, setShowSettings] = useState(false);
    const [clicked, setClicked] = useState(false)
    // console.log("board from board item", board.id)

    const handleDelete = async (boardId) => {
        console.log("this is the boardId", board)
        if (boardId){
            await dispatch(deleteBoardThunk(boardId))
            await dispatch(loadBoardsThunk())
            history.push('/workspace')
        } else {
            return "board does not exist"
        }
    }

    const goToBoard = () => {
        dispatch(getBoardThunk(boardId))
        setClicked(!clicked)
        setTimeout(() => {
            setClicked(false)
        }, 200)
        history.push(`/workspace/${boardId}`)
    }


    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])


  return (
    <div className='board-item-div'>
        <div
      onClick={() => {
        goToBoard();
      }}
    >
      {board.boardName}
      <button className='settings-btn' onClick={() => setShowSettings(!showSettings)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
        </div>
      {showSettings &&
      <div className='board-settings'>
      <UpdateBoardModal board={board} />
      <button className='board-settings-btns delete-btn' onClick={() => handleDelete(boardId)}>Delete</button>
      </div>
      }
    </div>
    
  );
}

export default BoardItem