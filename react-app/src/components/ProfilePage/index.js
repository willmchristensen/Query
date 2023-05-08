import './ProfilePage.css'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState} from 'react';
import { getAllQuestions } from '../../store/question';
import QuestionCard from '../QuestionCard';
import { getAllAnswers } from '../../store/answer';

function ProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);
    const questions = useSelector((state) => state.question.questions);
    const questionsArray = Object.values(questions);
    const userQuestions = questionsArray.filter(q => q.userId === sessionUser.id);
    const answers = useSelector((state) => state.answers)
    console.log(answers);
    // console.log(userQuestions)
    const dispatch = useDispatch();
    // const answers = useSelector()
    useEffect(()=> {
        dispatch(getAllQuestions())
        dispatch(getAllAnswers(sessionUser.id))
    }, [dispatch, sessionUser])

    if(!questions) return null
    return (
        <div className="profile-page-container">
            <h1>{sessionUser.username}</h1>
            {
                userQuestions.map(question => {
                    return (
                        <QuestionCard key={question.id} question={question} />
                    )
                })
            }
        </div>
    )

}

export default ProfilePage
