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