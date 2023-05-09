import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteQuestionModal.css"
import { deleteQuestion } from "../../store/question";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeleteQuestionModal({questionId}) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user)
	const history = useHistory();
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(deleteQuestion(questionId))
		closeModal()
		history.push(`/users/${sessionUser.id}`)
	};

	return (
		<div className="delete-question-container">
			<h1>Delete Question</h1>
            <button>
                Cancel
            </button>
            <button
                onClick={handleSubmit}
            >
                Confirm
            </button>
		</div>
	)

}

export default DeleteQuestionModal;
