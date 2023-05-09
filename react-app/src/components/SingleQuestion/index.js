import { useEffect } from 'react';
import './SingleQuestion.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneQuestion } from '../../store/question';
import OpenModalButton from '../OpenModalButton';
import CreateAnswerModal from '../CreateAnswerModal';
import DeleteAnswerModal from '../DeleteAnswerModal';
import EditAnswerModal from '../EditAnswerModal';
import DeleteReplyModal from '../DeleteReplyModal';
import CreateReviewForm from '../CreateReplyForm';
import { useModal } from '../../context/Modal';


const SingleQuestion = () => {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const { question } = useSelector((state) => state.question.singleQuestion)
    console.log("question", question)
    const answer = useSelector((state) => state.answers)
    const {closeModal} = useModal

    useEffect(() => {
        console.log("IT IS RENDERING!");
        dispatch(getOneQuestion(questionId))
    }, [dispatch, answer, questionId, closeModal])


    if (!question) return null;


    return (
        <>
            <div className="content">
                <h1>youve reached question number {question.id}</h1>
                <div className="content-container text">
                    {question.details}
                </div>
                <hr />
                <div className="content-container text">
                    {
                        question.answers.map(answer => {
                            return (
                                <div key={answer.id}>
                                    <hr />
                                    {answer.details}
                                    <OpenModalButton
                                        buttonText="Delete Answer"
                                        modalComponent={<DeleteAnswerModal questionId={questionId} answerId={answer.id} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Edit Answer"
                                        modalComponent={<EditAnswerModal questionId={questionId} answerId={answer.id} />}
                                    />
                                    <CreateReviewForm answerId={answer.id} />
                                    <div>
                                        {answer.replies.map(reply => {
                                            return (
                                                <div>
                                                    <div>{reply.details}</div>
                                                    <OpenModalButton
                                                        buttonText="Delete Comment"
                                                        modalComponent={<DeleteReplyModal replyId={reply.id} questionId={questionId} />}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <OpenModalButton
                    buttonText="Add Answer"
                    modalComponent={<CreateAnswerModal questionId={questionId} />}
                />
            </div>
        </>
    )
}

export default SingleQuestion
