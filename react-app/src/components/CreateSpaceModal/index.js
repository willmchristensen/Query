import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createQuestion } from "../../store/question";
import './CreateSpaceModal.css'

function CreateSpaceModal() {
    const dispatch = useDispatch()
	const [name, setName] = useState("");
    const []
	const currentUser = useSelector((state) => state.session.user)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();



}