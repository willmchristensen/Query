import { useEffect } from 'react';
import './SingleQuestion.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneQuestion } from '../../store/question';
import OpenModalButton from '../OpenModalButton';
import CreateAnswerModal from '../CreateAnswerModal';
import DeleteAnswerModal from '../DeleteAnswerModal';
import EditAnswerModal from '../EditAnswerModal';

const SingleQuestion = () => {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const { question } = useSelector((state) => state.question.singleQuestion)
    const answer = useSelector((state) => state.answers)

    useEffect(() => {
        dispatch(getOneQuestion(questionId))
    }, [dispatch, answer, questionId])


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
                                <div>
                                    <hr />
                                    {answer.details}
                                    <OpenModalButton
                                        buttonText="Delete Answer"
                                        modalComponent={<DeleteAnswerModal answerId={answer.id} />}
                                    />
                                     <OpenModalButton
                                        buttonText="Edit Answer"
                                        modalComponent={<EditAnswerModal questionId={questionId} answerId={answer.id} />}
                                    />
                                    <div>
                                        {answer.replies.map(reply => {
                                            return (
                                                <div>{reply.details}</div>
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
