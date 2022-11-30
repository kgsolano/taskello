import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadBoardsThunk, updateBoardThunk } from '../../../store/board';
import '../../index.css'

function UpdateBoard({showModal, setShowModal, board}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    // console.log("this is the board", board)

    const updateTitle = (e) => setTitle(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowModal(false)

        const payload = {
            userId: user.id,
            boardName: title,
        };

        await dispatch(updateBoardThunk(payload, board.id))
        await dispatch(loadBoardsThunk())
        history.push("/workspace");
    }

    return (
      <div className="edit-form">
        <img
          className="workspace-img"
          src="https://i.imgur.com/Amt9rTd.png"
          alt="workspace-pic"
        />
        <h2 className="edit-title">Edit your Board</h2>
        <div className="edit-form-div">
          <p className="edit-name">Name</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              // placeholder={board.boardName}
              defaultValue={board.boardName}
              onChange={updateTitle}
            />
            <button className='submit-btn' type="submit">Save</button>
          </form>
        </div>
      </div>
    );
}

export default UpdateBoard