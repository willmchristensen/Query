import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnswer } from "../../store/answer";
import './DeleteAnswerModal.css'


function DeleteAnswerModal({answerId}) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const deleter = async () => {
		await dispatch(deleteAnswer(answerId))
		closeModal()
	}

	return (
		<div className="create-answer-container">
			<h1>Delete</h1>
				<button onClick={closeModal}>Cancel</button>
				<button onClick={deleter}>Delete Answer</button>
		</div>
	)

}

export default DeleteAnswerModal;
