import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteQuestionModal.css"
import { deleteQuestion } from "../../store/question";

function DeleteQuestionModal({questionId}) {
	const dispatch = useDispatch()
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(deleteQuestion(questionId))
		closeModal()
	};

	return (
		<div className="create-question-container">
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
