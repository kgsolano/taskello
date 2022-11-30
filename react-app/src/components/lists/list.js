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
    // const cards = useSelector((state) => Object.values(state.card.allCards));
    const {boardId} = useParams()

    // console.log("this is cards----------", cards)

    

    useEffect(() => {
        dispatch(loadListsThunk(boardId))
    },[boardId])

  return (
    <div className='list-item-wrapper'>
      <ul className='list-item-parent'>
        {lists.map((list) => (
          <li className='list-item-div' key={list.id}>
            <ListItem list={list} boardId={boardId}/>
          </li>
        ))}
          <AddList />
      </ul>
    </div>
  );
}

export default List