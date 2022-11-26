import React from 'react'
import SettingsList from './SettingsList';

function ListItem({list, boardId}) {
  return (
    <div>
      <span>
        {list.title}
        <button>
          <i class="fa-solid fa-ellipsis"></i>
        </button>
          <SettingsList list={list} boardId={boardId}/>
      </span>
    </div>
  );
}

export default ListItem