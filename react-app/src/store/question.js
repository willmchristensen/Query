import normalize from './normalizer'

const LOAD = "questions/load";
const LOAD_ONE = "questions/load_one";
const POST_QUESTION = "questions/new";
const EDIT_QUESTION = "questions/edit"
const DELETE_QUESTION = "questions/delete"

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

const editQuestion = (details) => ({
    type: EDIT_QUESTION,
    details
})

const deleteQuestionAction = (questionId) => ({
    type: DELETE_QUESTION,
    questionId
});

export const getAllQuestions = () => async (dispatch) => {
    // console.log('All Question THUNK')
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
        // console.log('data received in getOneQuestion', data)
        dispatch(loadOne(data))
        return data
    } else {
        return [
            "An error occurred. Please try again."
        ];
    }
}

export const createQuestion = (details) => async (dispatch) => {
    // console.log('details in CREATE QUESTION THUNK', details)
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
        dispatch(postQuestion(data.question));
        return data;
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

export const editOneQuestion = (res) => async (dispatch) => {
    // console.log('details in Edit Thunk', res);
    const { item, questionId } =  res;
    const response = await fetch(`/api/questions/${questionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            item
        ),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editQuestion(data.question));
        // dispatch(getAllQuestions())
        return data
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

export const deleteQuestion = (questionId) => async (dispatch) => {
    // This deletes an answer by id
    const response = await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {

        dispatch(deleteQuestionAction(questionId));
        // dispatch(getAllQuestions())


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
        case LOAD: {
            const newState = { ...state };
            newState.questions = { ...action.payload };
            return newState;
        }
        case LOAD_ONE: {
            const single_newState = { ...state, singleQuestion: { ...state.singleQuestion } };
            single_newState.singleQuestion = { ...action.payload };
            return single_newState;
        }
        case POST_QUESTION: {
            const post_newState = { ...state, questions: {...state.questions} };
            post_newState.questions[action.details.id] = action.details;
            return post_newState;
        }
        case EDIT_QUESTION: {
            const newState = { ...state, questions: { ...state.questions } };
            newState.questions[action.details.id] = action.details
            return newState
        }
        case DELETE_QUESTION: {
            const newState = {...state, questions: { ...state.questions }}
            delete newState.questions[action.questionId]
            return newState
        }
        default:
            return state;
    }
};

export default questionReducer;
