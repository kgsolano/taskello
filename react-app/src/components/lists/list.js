import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadListsThunk } from '../../store/list'
import AddList from './AddList'
import ListItem from './ListItem'
import SettingsList from './SettingsList'

function List() {

    const dispatch= useDispatch()
    const lists = useSelector(state => Object.values(state.list.allLists))
    const {boardId} = useParams()
    console.log("this is lists", lists)

    

    useEffect(() => {
        dispatch(loadListsThunk(boardId))
    },[boardId])

  return (
    <div>
      <h1>Lists</h1>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <ListItem list={list} boardId={boardId}/>
          </li>
        ))}
        <li>
          <AddList />
        </li>
      </ul>
    </div>
  );
}

export default List