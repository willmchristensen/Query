import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createQuestion } from "../../store/question";
import { useHistory } from "react-router-dom"
import './CreateQuestionModal.css'

function CreateQuestionModal({ spaceId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (details.length >= 10) {
			const item = {
				'details': details,
				'user_id': currentUser.id,
				'space_id': spaceId ? Number(spaceId) : 1
			}
			const data = await dispatch(createQuestion(item));
			// console.log('------------------------------data', data);
			if (data) {
				closeModal();
				history.push(`/questions/${data.question.id}`)
			}
		} else {
			setErrors([
				"Question must be at least 10 characters.",
			]);
		}
	};

	return (


		// form-row
		// form-row > label
		// form-row > input
		//


		<div className="modal-space-container">
			<div className="modal-space-top">
				<h1
					className="modal-title"
				>Add Question</h1>
			</div>
			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				className="modal-space-form"
			>
				<div
					className="modal-error-container"
				>
					{errors.map((error, idx) => (
						<div
							key={idx}
							className="modal-errors"
						>{error}</div>
					))}
				</div>
				<div className="form-data">
					<textarea
						value={details}
						onChange={(e) => setDetails(e.target.value)}
						placeholder={`Start your question with "What", "How","Why", etc.`}
					/>
				</div>
				<div className="spaces-display-flex">
					<button className="oval-button" onClick={closeModal}>Cancel</button>
					<button type="submit" className="modal-button oval-button"
					>Add Question</button>
				</div>
			</form>
		</div>
	)

}

export default CreateQuestionModal;
