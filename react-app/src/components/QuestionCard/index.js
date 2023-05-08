import './QuestionCard.css'
import { getAllAnswers } from '../../store/answer';
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState} from 'react';

const QuestionCard = ({question, user}) => {
    const answers = useSelector((state) => state.answer.answers);
    const answersArray = Object.values(answers);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAllAnswers(user.id))
    }, [dispatch])

    return(
        <div className="question-card-container">
            <div className="question-card">
                <div className="question-text">
                    <h3>{question.details}</h3>
                </div>
            </div>
            <div className="question-answers">
            </div>
        </div>
    )

}

export default QuestionCard