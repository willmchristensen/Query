const POST_QUESTION = "questions/new";

const postQuestion = (details) => ({
    type: POST_QUESTION,
    details
});


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

export default function questionReducer(state = initialState, action) {
	switch (action.type) {
		case POST_QUESTION:
            const newState = { ...state };
            newState.questions[action.details.id] = action.details;
            return newState;
		default:
			return state;
	}
}