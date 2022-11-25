import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBoardsThunk } from "../../store/board";
import { Modal } from "../context/Modal";
import AddBoard from "./add/addBoard";
import AddBoardModal from "./add/addBoardModal";
import '../../index.css'


function Boards() {

    const dispatch = useDispatch();
    const boards = useSelector((state) => Object.values(state.board.allBoards));
    const currUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false)

    const userBoards = boards.filter((board) => currUser.id === board.userId);
    

    useEffect(() => {
      dispatch(loadBoardsThunk());
    }, [dispatch]);

  return (
    <div className='board-index-div'>
      <h3>Boards</h3>
      <ul>
        {userBoards.map((board) => (
          <li key={board.id}>{board.boardName}</li>
        ))}
        <li>
          <AddBoardModal />
        </li>
      </ul>
    </div>
  );
}

export default Boards