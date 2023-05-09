import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createQuestion } from "../../store/question";
import './CreateQuestionModal.css'

function CreateQuestionModal({question}) {
	const dispatch = useDispatch()
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

		if (details.length >= 10) {
			const item = {
				'details': details,
				'user_id': currentUser.id
			}
			const data = await dispatch(createQuestion(item));

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
				<button type="submit">Add Question</button>
			</form>
		</div>
	)

}

export default CreateQuestionModal;
