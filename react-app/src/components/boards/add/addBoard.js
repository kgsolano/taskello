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
    <div>
    <h2>Create board</h2>
    <h3>Board title *</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Board Title"
                value={title}
                onChange={addTitle}
            />
            <button type='submit'>Create</button>
      </form>
      <p>Board title is required</p>
    </div>
  );
}

export default AddBoard