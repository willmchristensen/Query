import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnswer } from "../../store/answer";
import './DeleteAnswerModal.css'


function DeleteAnswerModal({answerId, questionId}) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const ids = {answerId, questionId}
	const deleter = async () => {
		await dispatch(deleteAnswer(ids))
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
