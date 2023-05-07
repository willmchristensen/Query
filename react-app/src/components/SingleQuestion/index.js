import { useEffect } from 'react';
import './SingleQuestion.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneQuestion } from '../../store/question';

const SingleQuestion = () => {

    const { questionId } = useParams();
    const dispatch = useDispatch();
    const {question} = useSelector(state => state.question.singleQuestion)

    useEffect(() => {
        dispatch(getOneQuestion(questionId))
    }, [dispatch])


    return(
        <div className="content">
            <h1>youve reached question number {question.id}</h1>
         <div className="content-container text">
            {question.details}
         </div>
         <hr />
         <div className="content-container text">
            {
                question.answers.map(answer => {
                    return(
                        <>
                            <hr />
                            {answer.details}
                        </>
                    )
                })
            }
         </div>  
     </div>      
    )

}

export default SingleQuestion