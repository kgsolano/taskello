import React, { useState } from 'react'
import SettingsList from './SettingsList';

function ListItem({list, boardId}) {
    const [showSettings, setShowSettings] = useState(false)
  return (
    <div>
      <span>
        {list.title}
        <button onClick={() => setShowSettings(!showSettings)}>
          <i class="fa-solid fa-ellipsis"></i>
        </button>
        {showSettings &&
          <SettingsList list={list} boardId={boardId}/>
        }
      </span>
    </div>
  );
}

export default ListItem