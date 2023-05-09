import normalize from "./normalizer";

const POST_REPLY = "replies/new"

const postReply = (details) => ({
    type: POST_REPLY,
    details
})


export const createReply = (details) => async (dispatch) => {
    console.log("reply details in thunk", details);
    const response = await fetch("/api/replies/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: details
        body: JSON.stringify(
            details
        ),
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(postReply(data));
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
    replies: {},
};

const ReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD:
        //     const newState = { ...state };
        //     newState.answers = { ...action.payload };
        //     return newState;
        case POST_REPLY: {
            const newState = { ...state };
            newState.replies[action.details.reply.id] = action.details.reply;
            return newState;
        }
        // case DELETE_ANSWER:
        //     const deleteNewState = {...state}
        //     delete deleteNewState[action.answerId]
        //     return deleteNewState
        default:
            return state;
    }
};

export default ReplyReducer;
