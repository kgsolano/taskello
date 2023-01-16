// CONSTANTS
const LOAD_ACTIVITIES = "activities/LOAD_ACTIVITIES";
const ADD_ACTIVITY = "activities/ADD_ACTIVITY";
const DELETE_ACTIVITY = "activities/DELETE_ACTIVITY";

// ACTIONS
const loadActivities = (activities) => ({ 
    type: LOAD_ACTIVITIES,
    activities
})

const addActivity = (activity) => ({
    type: ADD_ACTIVITY,
    activity
})

const deleteActivity = (activity) => ({
    type: DELETE_ACTIVITY,  
    activity
})

// THUNKS
export const loadActivitiesThunk = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/activities`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadActivities(data));
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

export const addActivityThunk = (cardId, activity) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/activities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addActivity(data));
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

export const updateActivityThunk = (activityId, activity) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(activity)
    });
    if(response.ok) {
        const data = await response.json();
        dispatch(addActivity(data));    
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

export const deleteActivityThunk = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteActivity(data));
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

// REDUCER
const initialState = {};
export default function activityReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACTIVITIES:
            // const allActivities = {...state};
            console.log("this is load activities", action.activities.activities)
            // action.activities.activities.forEach((activity) => {
            //     allActivities[activity.id] = activity;
            // });
            const allActivities = normalizeArray(action.activities.activities);
            return {...state,
                ...allActivities,
            };
        case ADD_ACTIVITY:
            // console.log("this is add activity", action.activity)
            if (!state[action.activity.id]) {
                const newState = {
                    ...state,
                    [action.activity.id]: action.activity,
                };
                return newState;
            }
            return {
                ...state,
                [action.activity.id]: {
                    ...state[action.activity.id],
                    ...action.activity,
                },
            };
        case DELETE_ACTIVITY:
            const newState = {...state};
            delete newState[action.activity.id];
            return newState;
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