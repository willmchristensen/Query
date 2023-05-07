const POST_QUESTION = "questions/new";
const LOAD = "questions/load";

const load = (data) => ({
  type: LOAD,
  payload: data,
});

const postQuestion = (details) => ({
    type: POST_QUESTION,
    details
});

const normalize = (data) => {
    let newObj = {}
    data.forEach(item => {
        newObj[item.id] = item
    })
    return newObj
}

export const retreiveAllQuestions = () => async (dispatch) => {
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

export const createQuestion = (details) => async (dispatch) => {
    console.log('details in THUNK',details)
    const response = await fetch("/api/questions/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: details
        // body: JSON.stringify({
        //     details
        // }),
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

const initialState = { questions: {} };

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        const newState = { ...state };
        newState.questions = {...action.payload};
        return newState;
      case POST_QUESTION:
        const post_newState = { ...state };
        post_newState.questions[action.details.id] = action.details;
        return post_newState;
      default:
        return state;
    }
};

export default questionReducer;
