import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBoardsThunk } from "../../store/board";
import { Modal } from "../context/Modal";
import AddBoard from "./add/addBoard";
import AddBoardModal from "./add/addBoardModal";
import '../../index.css'
import BoardIndexItem from "./BoardIndexItem";


function Boards() {

    const dispatch = useDispatch();
    const boards = useSelector((state) => Object.values(state.board.allBoards));
    const currUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const userBoards = boards.filter((board) => currUser.id === board.userId);

    console.log("this is boards", boards)
    

    useEffect(() => {
      dispatch(loadBoardsThunk());
    }, [dispatch]);

    

    let showLength;
    userBoards.length === 1
      ? (showLength = (
          <p>
            Showing {userBoards.length} of {userBoards.length} board
          </p>
        ))
      : (showLength = (
          <p>
            Showing {userBoards.length} of {userBoards.length} boards
          </p>
        )); 

  return (
    <div className="board-index-div">
      <div className='board-index-header'>
        <h3 className="board-index-title">Boards</h3>
        {showLength}
      </div>
      <ul className='board-index-item-parent'>
        {userBoards.map((board) => (
          <li className="board-index-item" key={board.id}>
            <BoardIndexItem board={board} userBoards={userBoards} />
          </li>
        ))}
        <li className="add-board-modal-div">
          <AddBoardModal />
        </li>
      </ul>
    </div>
  );
}

export default Boards