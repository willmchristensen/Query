import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnswer } from "../../store/answer";
import './DeleteAnswerModal.css'


function DeleteAnswerModal({ answerId, questionId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const ids = { answerId, questionId }
	const deleter = async () => {
		await dispatch(deleteAnswer(ids))
		closeModal()
	}

	return (
		<div className="delete-answer-container">
			<h1>Delete</h1>
			<h4>This answer cannot be restored.</h4>
			<div className="button-order">
				<button className="oval-button" onClick={closeModal}>Cancel</button>
				<button className="negative-oval-button" onClick={deleter}>Confirm</button>
			</div>
		</div>
	)

}

export default DeleteAnswerModal;
