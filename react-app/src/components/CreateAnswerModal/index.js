import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAnswer } from "../../store/answer";
import './CreateAnswerModal.css'


function CreateAnswerModal({ questionId }) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
	const question = useSelector((state) => state.question.singleQuestion.question)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();

		// ---------- FORM DATA	-----------------
		// const formData = new FormData();
		// formData.append('details', details)
		// formData.append('user_id', currentUser.id)
		// console.log('formData::::::::::',formData)
		// console.log([...formData.entries()])
		// ------------------------------------------

		if (details.length >= 2) {
			const item = {
				'details': details,
				'owner_id': currentUser.id,
				'question_id': questionId
			}
			console.log("item in handle submit for create answer modal", item);
			const data = await dispatch(createAnswer(item, questionId));
			// if (data) {
			// 	setErrors(data);
			// } else {
			// 	closeModal();
			// }
			if (data) {
				closeModal()
			}
		} else {
			setErrors([
				"Answer must be at least 2 characters.",
			]);
		}
	};

	return (
		<div className="create-answer-container">
			<h1 className="answer-formatter">{question.details}</h1>
			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<ul className="modal-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="text-area-modal">
					<textarea
						value={details}
						onChange={(e) => setDetails(e.target.value)}
						placeholder={`Start your answer.`}
					/>
				</div>
				<div className="button-order">
					<button className="oval-button" onClick={closeModal}>Cancel</button>
					<button className="oval-button" type="submit">Post</button>
				</div>
			</form>
		</div>
	)

}

export default CreateAnswerModal;
