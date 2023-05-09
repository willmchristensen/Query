import normalize from "./normalizer"

const LOAD = "spaces/load"

const load = (spaces) => ({
    type: LOAD,
    spaces
})

export const getAllSpaces = () => async (dispatch) => {
    //This is the get all answers Thunk
    console.log("inside gett all spaces thunk")
    const response = await fetch('/api/spaces')
    if (response.ok) {
        const data = await response.json();
        const allSpaces = normalize(data);
        dispatch(load(allSpaces))
        return response
    }
}

const initialState = {
    spaces: {},
};

const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:{
            const newState = { ...state };
            newState.spaces = { ...action.payload };
            return newState;
        }
        default:
            return state
    }
}

export default spaceReducer;