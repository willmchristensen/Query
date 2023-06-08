import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './createReplyForm.css'
import { createReply } from "../../store/reply";



function CreateReviewForm({ answerId, questionId }) {
    const dispatch = useDispatch();
    const [details, setDetails] = useState("");
    const currentUser = useSelector((state) => state.session.user)
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.length >= 2) {
            const item = {
                'details': details,
                'owner_id': currentUser.id,
                'answer_id': answerId
            }
            setDetails("")
            // console.log("item in handle submit for create reply", item);
            const data = await dispatch(createReply(item, questionId));
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors([
                "Answer must be at least 2 characters.",
            ]);
        }
    };

    return (
        <div className="create-reply-container reply-form-background">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <ul className="modal-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="reply-center">
                    <textarea
                        className="reply-center-width"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder={`Add a comment...`}
                        required
                    />
                    <button className="other-oval-button" type="submit">Add Comment</button>
                </div>
            </form>
        </div>
    )

}

export default CreateReviewForm;
