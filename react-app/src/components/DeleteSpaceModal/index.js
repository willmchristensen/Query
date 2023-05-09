import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneSpace } from "../../store/space";
import "./DeleteSpaceModal.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeleteSpaceModal({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(deleteOneSpace(id))
		closeModal()
        history.push("/spaces")
	};

    return (
		<div className="delete-space-container">
			<h1>Delete Space</h1>
            <button>
                Cancel
            </button>
            <button
                onClick={handleSubmit}
            >
                Confirm
            </button>
		</div>
	);
};

export default DeleteSpaceModal;
