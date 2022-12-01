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
          <div className="add-list-form-div">
            <form className="add-card-form" onSubmit={handleSubmit}>
              <input
                className="add-list-input"
                type="text"
                placeholder="Enter list title..."
                value={title}
                onChange={addTitle}
              />
              <button className="add-list-btn" type="submit">
                Add list
              </button>
              <span
                className="add-list-esc"
                onClick={() => {
                  setAddDisplay(!addDisplay);
                }}
              >
                <i class="fa-regular fa-x"></i>
              </span>
            </form>
          </div>
        ))
      : (addList = (
          <div
            className="add-list-div"
            onClick={() => {
              setAddDisplay(!addDisplay);
            }}
          >
            <p>+ Add another list</p>
          </div>
        ));
        

  return (
    <li className='add-list-li'>
        {addList}
    </li>
  )
}

export default AddList