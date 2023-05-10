import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReply } from "../../store/reply";
import './DeleteReplyModal.css'

function DeleteReplyModal({replyId, questionId}) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const ids = {replyId, questionId}
	const deleter = async () => {
		await dispatch(deleteReply(ids))
		closeModal()
	}

	return (
		<div className="create-answer-container">
			<h1>Delete</h1>
				<p>Are you sure you want to delete this comment?</p>
				<button onClick={closeModal}>Cancel</button>
				<button onClick={deleter}>OK</button>
		</div>
	)

}

export default DeleteReplyModal;
