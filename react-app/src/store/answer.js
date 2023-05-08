import normalize from './normalizer'

const POST_ANSWER = "answers/new";
const LOAD = "answers/load"

const load = (data) => ({
    type: LOAD,
    payload: data
})

const postAnswer = (details) => ({
    type: POST_ANSWER,
    details
});

export const getAllAnswers = (userId) => async (dispatch) => {
    //This is the get all answers Thunk
    console.log("inside gett all answers thunk")
    const response = await fetch(`/api/answers/${userId}`)
    if (response.ok) {
        const data = await response.json();
        const allAnswers = normalize(data.answers);
        dispatch(load(allAnswers))
        return response
    }
}

export const createAnswer = (details) => async (dispatch) => {
    //This is the create an answer Thunk
    console.log('details in create answer THUNK', details)
    const response = await fetch("/api/answers/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: details
        body: JSON.stringify(
            details
        ),
    });
    console.log("create answer thunk response", response);
    if (response.ok) {
        const data = await response.json();
        dispatch(postAnswer(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}


const initialState = {
    answers: {},
};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state };
            newState.answers = { ...action.payload };
            return newState;
        // case LOAD_ONE:
        //     const single_newState = { ...state };
        //     single_newState.singleQuestion = {...action.payload};
        //     return single_newState;
        case POST_ANSWER:
            // NOT DONE OR TESTED!
            const post_newState = { ...state };
            post_newState.answers[action.details.answer.id] = action.details.answer;
            return post_newState;
        default:
            return state;
    }
};

export default answerReducer;
