import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editOneQuestion } from "../../store/question";
import "./EditQuestionModal.css"

function EditQuestionModal({question}) {
	const dispatch = useDispatch()
	const [details, setDetails] = useState(question.details);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (details.length >= 10) {
			// const item = {
			// 	"details": details,
            //     "user_id": question.user_id
			// }
			const item = {
				// question,
				'details': details,
				'user_id': question.userId,
			}
			const res = { item, question }
			const data = await dispatch(editOneQuestion(res));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Question must be at least 10 characters.",
			]);
		}
	};

	return (
		<div className="create-question-container">
			<h1>Add Question</h1>
			<form
				 onSubmit={(e) => handleSubmit(e)}
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
					placeholder={`Start your question with "What", "How","Why", etc.`}
				/>
				<button onClick={closeModal}>Cancel</button>
				<button type="submit">Save</button>
			</form>
		</div>
	)

}

export default EditQuestionModal;
