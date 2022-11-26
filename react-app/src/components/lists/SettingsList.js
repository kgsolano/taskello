import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteListThunk, loadListsThunk, updateListThunk } from '../../store/list';

function SettingsList({list, boardId}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const listId = list.id
    const [title, setTitle] = useState("")

    const updateTitle = (e) => setTitle(e.target.value)

    const handleUpdate = async (e) => {
        e.preventDefault()

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
    <div>
        <p>edit list</p>
        <form onSubmit={handleUpdate}>
            <input
                type='text'
                placeholder={list.title}
                value={title}
                onChange={updateTitle}
                />
        </form>
        <p onClick={(e) => {handleDelete(listId)}}>Delete list</p>
    </div>
  );
}

export default SettingsList