import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editAnswer } from "../../store/answer";
import './EditAnswerModal.css'

function EditAnswerModal({ answerId, questionId }) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user)
	const question = useSelector((state) => state.question.singleQuestion.question)
	const answerArr = question.answers
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	let answer = answerArr.find(answer => answerId === answer.id)
	const [details, setDetails] = useState(answer.details ? answer.details : "");

	// console.log('----------', question, answer);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (details.length >= 2) {
			const item = {
				'details': details,
				'owner_id': currentUser.id,
				'question_id': Number(questionId)
			}
			const res = { item, answerId, questionId }
			// console.log("item in handle submit for edit answer modal", item);
			const data = await dispatch(editAnswer(res));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Answer must be at least 2 characters.",
			]);
		}
	};

	return (
		<div className="edit-answer-container">

			<h1 className="answer-formatter">Edit Answer</h1>
			<h4 className="answer-formatter">{question.details}</h4>
			<form
				//  onSubmit={() => handleSubmit()}
				onSubmit={handleSubmit}
			//  encType="multipart/form-data"
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

export default EditAnswerModal;
