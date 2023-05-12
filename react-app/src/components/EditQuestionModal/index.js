import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editOneQuestion } from "../../store/question";
import "./EditQuestionModal.css"

function EditQuestionModal({ question }) {
	const dispatch = useDispatch()
	const [details, setDetails] = useState(question.details);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const questionId = question.id;
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (details.length >= 10) {
			const item = {
				'details': details,
				'user_id': question.userId,
			}
			const res = { item, questionId }
			const data = await dispatch(editOneQuestion(res));
			if (data) {
				closeModal();
				// 	setErrors(data);
				// } else {
				// 	closeModal();
			}
		} else {
			setErrors([
				"Question must be at least 10 characters.",
			]);
		}
	};

	return (
		<div className="edit-question-container">
			<h1>Edit Question</h1>
			<form
				className="edit-question-form"
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<ul className="modal-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<textarea
					className="textarea-border"
					value={details}
					onChange={(e) => setDetails(e.target.value)}
					placeholder={`Start your question with "What", "How","Why", etc.`}
				/>
				<div className="edit-question-display-flex">
					<button className="oval-button" onClick={closeModal}>Cancel</button>
					<button className="oval-button" type="submit">Save</button>
				</div>
			</form>
		</div>
	)

}

export default EditQuestionModal;
