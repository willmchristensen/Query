import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReply } from "../../store/reply";
import './DeleteReplyModal.css'

function DeleteReplyModal({replyId}) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState("");
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const deleter = async () => {
		await dispatch(deleteReply(replyId))
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
