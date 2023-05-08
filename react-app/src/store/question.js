import normalize from './normalizer'

const POST_QUESTION = "questions/new";
const LOAD = "questions/load";
const LOAD_ONE = "questions/load_one";

const load = (data) => ({
    type: LOAD,
    payload: data,
});

const loadOne = (data) => ({
    type: LOAD_ONE,
    payload: data,
});

const postQuestion = (details) => ({
    type: POST_QUESTION,
    details
});


export const getAllQuestions = () => async (dispatch) => {
    console.log('All Question THUNK')
    const response = await fetch("/api/questions")
    if (response.ok) {
        const data = await response.json();
        const allQuestions = normalize(data.questions);
        dispatch(load(allQuestions))
        return response
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const getOneQuestion = (id) => async (dispatch) => {
    const response = await fetch(`/api/questions/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log('data received in getOneQuestion',data)
        dispatch(loadOne(data))
        return data
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const createQuestion = (details) => async (dispatch) => {
    console.log('details in THUNK', details)
    const response = await fetch("/api/questions/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: details
        body: JSON.stringify(
            details
        ),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(postQuestion(data));
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
    questions: {},
    singleQuestion: {}
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state };
            newState.questions = { ...action.payload };
            return newState;
        case LOAD_ONE:
            const single_newState = { ...state };
            single_newState.singleQuestion = {...action.payload};
            return single_newState;
        case POST_QUESTION:
            const post_newState = { ...state };
            post_newState.questions[action.details.question.id] = action.details.question;
            return post_newState;
        default:
            return state;
    }
};

export default questionReducer;
