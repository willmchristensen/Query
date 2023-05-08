import { useEffect } from 'react';
import './SingleQuestion.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneQuestion } from '../../store/question';
import OpenModalButton from '../OpenModalButton';
import CreateAnswerModal from '../CreateAnswerModal';
import DeleteAnswerModal from '../DeleteAnswerModal';

const SingleQuestion = () => {

    const { questionId } = useParams();
    const dispatch = useDispatch();
    const { question } = useSelector((state) => state.question.singleQuestion)
    const answer = useSelector((state) => state.answers)

    useEffect(() => {
        dispatch(getOneQuestion(questionId))
    }, [dispatch, answer])


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
                                <>
                                    <hr />
                                    {answer.details}
                                    <OpenModalButton
                                        buttonText="Delete Answer"
                                        modalComponent={<DeleteAnswerModal answerId={answer.id} />}
                                    />
                                </>
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
