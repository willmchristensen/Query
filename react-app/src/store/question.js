const POST_QUESTION = "questions/new";

const postQuestion = (question) => ({
    type: POST_QUESTION,
    question
});


export const createQuestion = (question) => async (dispatch) => {
    const response = await fetch("/api/questions/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question
        }),
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
        return ["An error occurred. Please try again."];
    }
}

const initialState = { questions: null };

export default function questionReducer(state = initialState, action) {
	switch (action.type) {
		case POST_QUESTION:
            const newState = { ...state };
            newState.questions[action.question.id] = action.question;
            return newState;
		default:
			return state;
	}
}