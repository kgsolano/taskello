// CONSTANTS
const LOAD_CARDS = "cards/LOAD_CARDS"
const GET_CARD = "cards/GET_CARD"
const ADD_CARD = "cards/ADD_CARD"
const DELETE_CARD = "cards/DELETE_CARDS"

// ACTIONS
const loadCards = (cards) => ({
    type: LOAD_CARDS,
    cards
})

const getCard = (card) => ({
    type: GET_CARD,
    card
})

const addCard = (card) => ({
    type: ADD_CARD,
    card
})

const deleteCard = (card) => ({
    type: DELETE_CARD,
    card
})

// THUNKS
export const loadCardsThunk = (listId) => async (dispatch) => {
  const response = await fetch(`/api/lists/${listId}/cards`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadCards(data));
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

export const getCardThunk = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`);

  if (response.ok) {
    const data = await response.json();
    await dispatch(getCard(data));
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

export const addCardThunk = (card, listId) => async (dispatch) => {
  const response = await fetch(`/api/lists/${listId}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addCard(data));
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

export const updateCardThunk = (card, cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
  console.log("update is making it here--------", response)
  if (response.ok) {
    const data = await response.json();
    dispatch(addCard(data));
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

export const deleteCardThunk = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCard(cardId));
    return;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// REDUCER
const initialState = { allCards: {}, currentCard: {} };
export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS:
      const allCards = normalizeArray(action.cards.cards);
      return { ...state, allCards: {...allCards } };
    case GET_CARD:
      const currentCard = { ...state, allCards: {...state.allCards}, currentCard: { ...action.card } };
      return currentCard;
    case ADD_CARD:
      if (!state[action.card.id]) {
        const newState = {
          ...state,
          allCards: { ...state.allCards, [action.card.id]: action.card },
        };
        return newState;
      }
      return {
        ...state,
        allCards: {
          ...state.allCards,
          [action.card.id]: {
            ...state[action.card.id],
            ...action.card,
          },
        },
      };
    case DELETE_CARD:
      const deleteState = { ...state };
      delete deleteState.allCards[action.cardId];
      return {...state, allCards: {...state.allCards}};
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