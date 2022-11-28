import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBoardThunk, loadBoardsThunk } from '../../../store/board'

function AddBoard({setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')

    const addTitle = (e) => setTitle(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setShowModal=false

        const payload = {
            userId: user.id,
            boardName: title
        };

        let newBoard = await dispatch(addBoardThunk(payload))

        if (newBoard) {
          setShowModal(false)
          await dispatch(loadBoardsThunk())
        }
        history.push('/workspace')
    }
  return (
    <div className="add-board-modal">
      <h3 className="create-board-heading">Create board</h3>
      <img src="https://i.imgur.com/Wnntd5Z.png" alt="add-template-pic" />
      <p className="add-board-title">
        Board title <span>*</span>
      </p>
      <form className="add-board-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Board Name"
          value={title}
          onChange={addTitle}
        />
        {title.length === 0 &&
        <p className="add-modal-text">👋 Board title is required</p>
        }
        <button className="submit-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddBoard