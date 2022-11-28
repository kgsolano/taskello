import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteBoardThunk, getBoardThunk, loadBoardsThunk } from '../store/board';
import AddBoard from './boards/add/addBoard';
import AddBoardModal from './boards/add/addBoardModal';
import BoardItem from './boards/boardIndex/boardItem';
import UpdateBoardModal from './boards/update/updateBoardModal';
import { Modal } from "./context/Modal";
import './index.css'


function Workspace() {
    const dispatch = useDispatch()
    const boards = useSelector(state => Object.values(state.board.allBoards))
    const currUser = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.board.currentBoard)
    const userBoards = boards.filter(board => currUser.id === board.userId)
    const [showModal, setShowModal] = useState(false)
    

    console.log("curr user here ", currUser)

    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])

    return (
      <div className='workspace-root'>
        <div className='workspace-title-div'>
          <h3 className='workspace-title'>{currUser.username}'s workspace</h3>
        </div>
        <div className ='workspace-board-list'>
          <h3 className ='your-boards'>
            Your Boards <span className='workspace-add-btn' onClick={() => setShowModal(!showModal)}>+</span>
            {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddBoard 
            setShowModal={setShowModal}
          />
        </Modal>)}
          </h3>
          <ul className='boards-list-div'>
            {userBoards.map((board) => (
              <li className='workspace-board-item' key={board.id}>
                <BoardItem board={board} />
              </li>
            ))}
          </ul>
        </div>  
      </div>
    );
}

export default Workspace