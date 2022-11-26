import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoardThunk } from '../store/board';
import './index.css'
import List from './lists/list';

function BoardView() {

    const dispatch = useDispatch()
    const boards = useSelector((state) => Object.values(state.board.allBoards));
    const currUser = useSelector((state) => state.session.user);
    const currBoard = useSelector((state) => state.board.currentBoard.board);
    const [loaded, setLoaded] = useState(false);
    const {boardId} = useParams()

    useEffect(() => {
      (async () => {
        await dispatch(getBoardThunk(boardId));
        setLoaded(true);
      })();
    }, [dispatch]);

    if (!loaded) {
      return null;
    }

  return (
    <div className='boardview-div'>
      <h2>Boardview: board name {currBoard.boardName}</h2>
      <ul>
        <List />
      </ul>
    </div>
  );
}

export default BoardView