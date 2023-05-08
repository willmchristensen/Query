import normalize from './normalizer'

const LOAD = "answers/load"

const load = (data) => ({
    type: LOAD,
    payload: data
})

export const getAllAnswers = (userId) => async (dispatch) => {
    //This is the get all answers Thunk
    console.log("inside gett all answers thunk")
    const response = await fetch(`/api/answers/${userId}`)
    if (response.ok) {
        const data = await response.json();
        const allQuestions = normalize(data.questions);
        dispatch(load(allQuestions))
        return response
    } else { }
}


const initialState = {
    answers: {},
};

const answerReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        // case LOAD:
        //     const newState = { ...state };
        //     newState.questions = { ...action.payload };
        //     return newState;
        // case LOAD_ONE:
        //     const single_newState = { ...state };
        //     single_newState.singleQuestion = {...action.payload};
        //     return single_newState;
        // case POST_QUESTION:
        //     const post_newState = { ...state };
        //     post_newState.questions[action.details.question.id] = action.details.question;
        //     return post_newState;
        default:
            return state;
    }
};

export default answerReducer;
