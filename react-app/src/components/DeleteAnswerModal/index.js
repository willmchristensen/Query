import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { createAnswer } from "../../store/answer";
import './DeleteAnswerModal.css'


function DeleteAnswerModal({questionId}) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
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
			const data = await dispatch(deleteAnswer(item));
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
			<h1>Add Answer</h1>
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
					placeholder={`Start your answer.`}
				/>
				<button onClick={closeModal}>Cancel</button>
				<button type="submit">Add Answer</button>
			</form>
		</div>
	)

}

export default CreateAnswerModal;
