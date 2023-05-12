import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createQuestion } from "../../store/question";
import { createOneSpace } from "../../store/space";
import './CreateSpaceModal.css'

function CreateSpaceModal() {
    const dispatch = useDispatch()
	const [name, setName] = useState("");
    const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("https://plus.unsplash.com/premium_photo-1672914187190-3bb9eaed6a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80");
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(description.length >= 10){
			const item = {
				"name": name,
				"description": description,
				"owner_id": currentUser.id,
				"image_url": imageUrl
			}
			const data = await dispatch(createOneSpace(item));	
			if (data) {
				closeModal();
			}
		} else {
			setErrors([
				"Description must be at least 10 characters.",
			]);
		}
	}

	return (
		<div className="modal-space-container">
			<div className="modal-space-top">
				<h1
					className="modal-title"
				>
					Create a Space
				</h1>
				<p
					className="modal-description"
				>
					Share your interests, curate content, host discussions, and more.
				</p>
			</div>
			<form
				 onSubmit={(e) => handleSubmit(e)}
				 encType="multipart/form-data"
				 className="modal-space-form"
			>
				<div className="form-data">
				<div
					className="modal-error-container"
				>
					{errors.map((error, idx) => (
						<div
							className="modal-errors"
						 	key={idx}
						 >
							{error}
						</div>
					))}
				</div>
					<div className="form-row">
						<label>Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={`Name your space`}
						/>
					</div>
					<div className="form-row">
						<label>Brief Description</label>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder={`Provide a description for your space`}
						/>
					</div>
					<div className="form-row">
						<label>Space Image</label>
						<input
							type="text"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							placeholder={`Provide an image url for your space`}
						/>
					</div>
				</div>
				<button 
					type="submit"
					className="modal-button oval-button"
				>
					Create Space
				</button>
			</form>
		</div>
	)

}

export default CreateSpaceModal