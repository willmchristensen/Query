import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './createReplyForm.css'
import { createReply } from "../../store/reply";



function CreateReviewForm({answerId, questionId}) {
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
			console.log("item in handle submit for create reply", item);
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
    <div className="create-answer-container">
        <form
             onSubmit={handleSubmit}
             encType="multipart/form-data"
        >
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={`Add a comment...`}
            />
            <button type="submit">Add Comment</button>
        </form>
    </div>
)

}

export default CreateReviewForm;
