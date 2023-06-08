import { getOneQuestion } from "./question";

const POST_REPLY = "replies/new"
const DELETE_REPLY = "replies/delete"

const postReply = (details) => ({
    type: POST_REPLY,
    details
})

const deleteReplyAction = (replyId) => ({
    type: DELETE_REPLY,
    replyId
});


export const createReply = (details, questionId) => async (dispatch) => {
    // console.log("reply details in thunk", details);
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
        // dispatch(postReply(data));
        dispatch(getOneQuestion(questionId))
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

// Delete a reply Thunk
export const deleteReply = (ids) => async (dispatch) => {
    const {replyId, questionId} = ids
    // This deletes an answer by id
    const response = await fetch(`/api/replies/${replyId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        // dispatch(deleteReplyAction(replyId));
        dispatch(getOneQuestion(questionId))
        return replyId
    }
    else {
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
        case POST_REPLY: {
            const newState = { ...state };
            newState.replies[action.details.reply.id] = action.details.reply;
            return newState;
        }
        case DELETE_REPLY: {
            const newState = {...state}
            delete newState[action.replyId]
            // console.log("newState", newState)
            return {...newState}
            return newState
        }
        default:
            return state;
    }
};

export default ReplyReducer;
