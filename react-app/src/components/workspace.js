import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadBoardsThunk } from '../store/board';
import UpdateBoardModal from './boards/update/updateBoardModal';


function Workspace() {
    const dispatch = useDispatch()
    const boards = useSelector(state => Object.values(state.board.allBoards))
    const currUser = useSelector(state => state.session.user)
    const userBoards = boards.filter(board => currUser.id === board.userId)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(loadBoardsThunk())
    }, [dispatch])

    return (
      <div>
        <h2>Demo's workspace</h2>
        <h3>Your Boards</h3>
        {userBoards.map((board) => (
          <li key={board.id}>
            {board.boardName}
            <button onClick={() => {setShowModal(true)}}>
                <UpdateBoardModal showModal={showModal} setShowModal={setShowModal} boardId={board.id} board={board}/>edit</button>
            <button>delete</button>
          </li>
        ))}
      </div>
    );
}

export default Workspace