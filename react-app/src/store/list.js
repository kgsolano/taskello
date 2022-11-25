// CONSTANTS
const LOAD_LISTS = "boards/LOAD_LISTS";
const GET_LIST = "boards/GET_LIST";
const ADD_LIST = "boards/ADD_LIST";
const DELETE_LIST = "boards/DELETE_LIST";

// ACTIONS
const loadLists = (lists) => ({
    type: LOAD_LISTS,
    lists
})

const getList = (list) => ({
    type: GET_LIST,
    list

})

const addList = (list) => ({
    type: ADD_LIST,
    list
})

const deleteList = (list) => ({
    type: DELETE_LIST,
    list
})

// THUNKS
export const loadListsThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/lists`)

    if (response.ok) {
      const data = await response.json();
      dispatch(loadLists(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

export const getListThunk = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`)

    if (response.ok) {
      const data = await response.json();
      await dispatch(getList(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

export const addListThunk = (list, boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/lists`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(list)
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(addList(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

export const updateListThunk = (list, listId) => async (dispatch) => {
  const response = await fetch(`/api/lists/${listId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addList(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteListThunk = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`,
    {
        method: "DELETE"
    })

    if (response.ok) {
      dispatch(deleteList(listId));
      return;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}

// REDUCER
const initialState = { allLists: {}, currentList: {} };
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LISTS:
      const allLists = normalizeArray(action.lists.lists);
      return { ...state, allLists: { ...allLists } };
    case GET_LIST:
      // const allBoardsForRender = normalizeArray(action.allBoards.boards)
      const currentList = { ...state, currentList: { ...action.list } };
      return currentList;
    case ADD_LIST:
      if (!state[action.list.id]) {
        const newState = {
          ...state,
          allLists: { ...state.allLists, [action.list.id]: action.list },
        };
        return newState;
      }
      return {
        ...state,
        allLists: {
          ...state.allLists,
          [action.list.id]: {
            ...state[action.list.id],
            ...action.list,
          },
        },
      };
    case DELETE_LIST:
      const deleteState = { ...state };
      delete deleteState.allLists[action.listId];
      return deleteState;
    default:
      return state;
  }
}

//HELPERS
function normalizeArray(dataArray) {
  if (!dataArray instanceof Array)
    throw new Error("Normalize problem: data invalid");
  const obj = {};
  dataArray.forEach((element) => {
    obj[element.id] = element;
  });
  return obj;
}