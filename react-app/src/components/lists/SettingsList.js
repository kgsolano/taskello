import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteListThunk, loadListsThunk, updateListThunk } from '../../store/list';

function SettingsList({list, boardId, showSettings, setShowSettings}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const listId = list.id
    const [title, setTitle] = useState("")
    const [showEdit, setShowEdit] = useState(false)

    const updateTitle = (e) => setTitle(e.target.value)

    const handleUpdate = async (e) => {
        e.preventDefault()
        setShowSettings(false)
        setShowEdit(!showEdit)

        const payload = {
          title,
          boardId,
          userId: user.id
        };

        await dispatch(updateListThunk(payload, listId))
        await dispatch(loadListsThunk(boardId))
    }

    const handleDelete = async (listId) => {
        if (listId){
            await dispatch(deleteListThunk(listId))
            await dispatch(loadListsThunk(boardId))
        } else {
            return "list does not exist"
        }
    }
  return (
    <div className="list-settings-div">
      <span className='list-icon-span'>
        <p
          className="list-settings-icon"
          onClick={(e) => {
            handleDelete(listId);
          }}
        >
          <i class="fa-solid fa-trash" />
        </p>
        <p className="list-settings-icon" onClick={() => {setShowEdit(!showEdit)}}>
          <i class="fa-solid fa-pen" />
        </p>
      </span>
      {showEdit &&
      <form onSubmit={handleUpdate}>
        <input
          className='list-edit-form'
          type="text"
          placeholder={list.title}
          value={title}
          onChange={updateTitle}
          />
      </form>
        }
    </div>
  );
}

export default SettingsList