// CONSTANTS
const LOAD_BOARDS = 'boards/LOAD_BOARDS'
const GET_BOARD = 'boards/GET_BOARD'
const ADD_BOARD = 'boards/ADD_BOARD'
const DELETE_BOARD = 'boards/DELETE_BOARD'

// ACTIONS
const loadBoards = (boards) => ({
    type: LOAD_BOARDS,
    boards
})

const getBoard = (board) => ({
    type: GET_BOARD,
    board

})

const addBoard = (board) => ({
    type: ADD_BOARD,
    board
})

const deleteBoard = (board) => ({
    type: DELETE_BOARD,
    board
})

// THUNKS 
export const loadBoardsThunk = () => async (dispatch) => {
    const response = await fetch('/api/boards')

    if(response.ok){
        const data = await response.json()
        dispatch(loadBoards(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`)
    // next response goes here if needed to load all boards

    if(response.ok){
        const data = await response.json()
        dispatch(getBoard(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }
}

export const addBoardThunk = (board) => async (dispatch) => {
    const response = await fetch('/api/boards', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
    })

    if(response.ok){
        const data = await response.json()
        dispatch(addBoard(data))

        // if want to add default list goes here
        return data;
    } else if (response.status < 500) {
        const data = await response.json()
        if (data) {
            return data;
        }
    } else {
        return ["An error occurred. Please try again"];
    }
}

export const updateBoardThunk = (board, boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
    })
    // console.log("this is the response -------------", response)
    if (response.ok) {
        const data = await response.json();
      dispatch(addBoard(data)); // console log this to confirm
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
        return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const deleteBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "DELETE"
    })
    console.log("delete response--------", response)
    if (response.ok) {
        dispatch(deleteBoard(boardId));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
        return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}


// REDUCER
const initialState = {allBoards:{}, currentBoard: {}}
export default function boardReducer(state = initialState, action){
    switch (action.type){
        case LOAD_BOARDS:
            const allBoards = normalizeArray(action.boards.boards);
            return {...state, allBoards:{...allBoards}}
        case GET_BOARD:
            // const allBoardsForRender = normalizeArray(action.allBoards.boards)
            const currentBoard = {...state, currentBoard: {...action.board}}
            return currentBoard
        case ADD_BOARD:
            if(!state[action.board.id]) {
                const newState = {
                    ...state, allBoards: {...state.allBoards, [action.board.id]: action.board}
                }
                return newState
            }
            return {
                ...state, allBoards: {...state.allBoards, 
                    [action.board.id]: {
                        ...state[action.board.id],
                        ...action.board
                }}
            }
        case DELETE_BOARD:
            const deleteState = {...state}
            delete deleteState.allBoards[action.boardId]
            return deleteState
    default:
        return state;
    }
}

//HELPERS
function normalizeArray(dataArray){
  if (!dataArray instanceof Array) throw new Error('Normalize problem: data invalid')
  const obj = {}
  dataArray.forEach(element => {
    obj[element.id] = element
  })
  return obj
}