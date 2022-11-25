import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteBoardThunk, getBoardThunk, loadBoardsThunk } from '../store/board';
import BoardItem from './boards/boardIndex/boardItem';
import UpdateBoardModal from './boards/update/updateBoardModal';
import './index.css'


function Workspace() {
    const dispatch = useDispatch()
    const boards = useSelector(state => Object.values(state.board.allBoards))
    const currUser = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.board.currentBoard)
    const userBoards = boards.filter(board => currUser.id === board.userId)
    const [showModal, setShowModal] = useState(false)
    

    // console.log("this is boards", userBoards)

    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])

    return (
      <div className='workspace-root'>
        <h2>Demo's workspace</h2>
        <h3>Your Boards</h3>
        <ul>
          {userBoards.map((board) => (
            <li key={board.id}>
              <BoardItem board={board} />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Workspace