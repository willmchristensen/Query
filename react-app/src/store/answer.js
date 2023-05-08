



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
