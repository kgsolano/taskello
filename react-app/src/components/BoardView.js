import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoardThunk } from '../store/board';
import './index.css'

function BoardView() {

    const dispatch = useDispatch()
    const boards = useSelector((state) => Object.values(state.board.allBoards));
    const currUser = useSelector((state) => state.session.user);
    const currBoard = useSelector((state) => state.board.currentBoard.board);
    const {boardId} = useParams()
    console.log("this is currboard boardname", currBoard.boardName)

    useEffect(() => {
        dispatch(getBoardThunk(boardId))
    }, [dispatch])

  return (
    <div className='boardview-div'>
      <h2>Boardview: board name {currBoard.boardName}</h2>
    </div>
  );
}

export default BoardView