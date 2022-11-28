import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBoardThunk } from '../../store/board';

function BoardIndexItem({board}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const boardId = board.id;
    const [showSettings, setShowSettings] = useState(false);
    const [clicked, setClicked] = useState(false);

    const goToBoard = () => {
      dispatch(getBoardThunk(boardId));
      setClicked(!clicked);
      setTimeout(() => {
        setClicked(false);
      }, 200);
      history.push(`/workspace/${boardId}`);
    };

    

  return (
    <div className='board-index-expand' onClick={() => {goToBoard()}}>
        <div className='board-index-name'>
            <h3>
                {board.boardName}
            </h3>
        </div>
            
    </div>
  )
}

export default BoardIndexItem