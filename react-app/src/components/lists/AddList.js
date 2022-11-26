import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addListThunk, loadListsThunk } from '../../store/list'

function AddList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {boardId} = useParams()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [addDisplay, setAddDisplay] = useState(false)

    const addTitle = (e) => setTitle(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddDisplay(!addDisplay)

        const payload = {
            title,
            boardId,
            userId: user.id
        }

        let newList = await dispatch(addListThunk(payload, boardId))

        if(newList){
            await dispatch(loadListsThunk(boardId))
        }

        setTitle('')
    }
    let addList;
    addDisplay
      ? (addList = (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter list title..."
              value={title}
              onChange={addTitle}
            />
            <button type="submit">Add list</button>
          </form>
        ))
      : (addList = (
          <div onClick={() => {setAddDisplay(!addDisplay)}}>
            <p>+ Add another list</p>
          </div>
        ));
        

  return (
    <div>
        {addList}
    </div>
  )
}

export default AddList