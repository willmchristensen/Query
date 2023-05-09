import normalize from "./normalizer"

const LOAD = "spaces/load"
const LOAD_ONE = "spaces/load_one";
const DELETE_ONE = "spaces/delete"

const load = (spaces) => ({
    type: LOAD,
    spaces
})

const loadOne = (space) => ({
    type: LOAD_ONE,
    space
});

const deleteOne = (id) => ({
    type: DELETE_ONE,
    id
})

export const getAllSpaces = () => async (dispatch) => {
    //This is the get all answers Thunk
    // console.log("inside gett all spaces thunk")
    const response = await fetch('/api/spaces')
    if (response.ok) {
        const data = await response.json();
        // console.log("this is data", data)
        const allSpaces = normalize(data.spaces);
        dispatch(load(allSpaces))
        return response
    }
}

export const getOneSpace = (id) => async (dispatch) => {
    const response = await fetch(`/api/spaces/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadOne(data))
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const deleteOneSpace = (id) => async (dispatch) => {
    const response = await fetch(`/api/spaces/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        dispatch(deleteOneSpace);
    } else {
        return [
            "An error occurred. Please try again."
        ];
    };
};

const initialState = {
    spaces: {},
    singleSpace: {}
};

const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = { ...state };
            newState.spaces = { ...action.spaces };
            return newState;
        }
        case LOAD_ONE: {
            const newState = { ...state };
            newState.singleSpace = { ...action.space }
            return newState
        }
        case DELETE_ONE: {
            const newState = { ...state };
            delete newState.spaces[action.id]
            return newState
        }
        default:
            return state
    }
}

export default spaceReducer;
