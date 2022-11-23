import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadBoardsThunk, updateBoardThunk } from '../../../store/board';

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
    <div>
        <h2>Edit your Board</h2>
        <p>Name</p>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder={board.boardName}
                value={title}
                onChange={updateTitle}
            />
        </form>
    </div>
    )
}

export default UpdateBoard