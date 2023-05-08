import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editAnswer } from "../../store/answer";
import './EditAnswerModal.css'


function EditAnswerModal({answerId, questionId}) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (details.length >= 2) {
			const item = {
				'details': details,
				'owner_id': currentUser.id,
				'question_id': questionId
			}
		const res = {item, answerId}
			console.log("item in handle submit for edit answer modal", item);
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
		<div className="create-answer-container">
			<h1>Edit Answer</h1>
			<form
				//  onSubmit={() => handleSubmit()}
				onSubmit={handleSubmit}
				//  encType="multipart/form-data"
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
					placeholder={`Start your answer.`}
				/>
				<button onClick={closeModal}>Cancel</button>
				<button type="submit">Edit Answer</button>
			</form>
		</div>
	)

}

export default EditAnswerModal;
