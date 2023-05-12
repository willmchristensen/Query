import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReply } from "../../store/reply";
import './DeleteReplyModal.css'

function DeleteReplyModal({ replyId, questionId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const ids = { replyId, questionId }
	const deleter = async () => {
		await dispatch(deleteReply(ids))
		closeModal()
	}

	return (
		<div className="delete-reply-container">
			<h1>Delete</h1>
			<p>Are you sure you want to delete this comment?</p>
			<div className="button-order">
				<button className="oval-button" onClick={closeModal}>Cancel</button>
				<button className="negative-oval-button" onClick={deleter}>OK</button>
			</div>
		</div>
	)

}

export default DeleteReplyModal;
