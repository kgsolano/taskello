import React, { useEffect, useRef, useState } from 'react'
import SettingsList from './SettingsList';

function ListItem({list, boardId}) {
    const ref = useRef() 
    const [showSettings, setShowSettings] = useState(false)

  return (
    <div>
      <span className='list-title-div'>
        <h4 className='list-title'>{list.title}</h4>
        <button className='list-settings-btn' onClick={() => setShowSettings(true)}>
          <i class="fa-solid fa-ellipsis"></i>
          {showSettings && <SettingsList list={list} boardId={boardId} showSettings={showSettings} setShowSettings={setShowSettings} />}
        </button>
      </span>
    </div>
  );
}

export default ListItem