import { useEffect, useState } from 'react';
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
    const { closeModal } = useModal

    const [commentVisible, setCommentVisible] = useState(false)
    const [activeAnswerId, setActiveAnswerId] = useState(null)

    useEffect(() => {
        console.log("IT IS RENDERING!");
        dispatch(getOneQuestion(questionId))
    }, [dispatch, answer, questionId, closeModal])


    if (!question) return null;


    return (
        <div className="s-q-background">
            <div className="content-single-question">
                <div className="s-q-content-container text">
                    <h1 className='border-check s-q-width100'>{question.details}</h1>
                    <div className='s-q-width100'>
                        <div>
                            <OpenModalButton
                                buttonText={<i class="fas fa-edit"> Answer</i>}
                                modalComponent={<CreateAnswerModal questionId={questionId} />}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="s-q-content-container text">
                    {
                        question.answers.map(answer => {
                            return (
                                <div className='answer-box' key={answer.id}>
                                    <hr />
                                    {answer.details}
                                    {/* See comments button */}
                                    <button className="s-q-comment-button" onClick={() => setCommentVisible(!commentVisible)}>
                                        <i class="fa fa-regular fa-comment"> {answer.replies.length >= 1 ? answer.replies.length : null}</i>
                                    </button>

                                    <OpenModalButton
                                        buttonText="Delete Answer"
                                        modalComponent={<DeleteAnswerModal questionId={questionId} answerId={answer.id} />}
                                    />

                                    <OpenModalButton
                                        buttonText="Edit Answer"
                                        modalComponent={<EditAnswerModal questionId={questionId} answerId={answer.id} />}
                                    />
                                    <CreateReviewForm answerId={answer.id} questionId={questionId} />
                                    <div className={commentVisible ? "" : "hidden"}>
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
        </div>
    )
}

export default SingleQuestion
