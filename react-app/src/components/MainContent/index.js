import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css'
import ContentCard from './CardComponents/ContentCard'
import SpaceCardArea from '../SpaceCardArea/'
import { retreiveAllQuestions } from '../../store/question';
  
// import {getUsers} from '../../store/users'
// import { useParams } from 'react-router-dom';
const MainContent = () => {
    const questions = useSelector(state => state.question.questions);
    const questionsArray = Object.values(questions);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(retreiveAllQuestions())
    },[])
    
    if(!questionsArray.length) return null

    return(
        <div className="main-content-section">
            <div className="main-content-area">
                {/* <SpaceCardArea spaces={spaces}></SpaceCardArea> */}
            </div>
            <div className="content-cards">
                {
                    questionsArray.map(question => {
                        return (
                            <ContentCard question={question}>
                            </ContentCard>
                        )
                    })
                }
            </div>
            <div className="main-content-area">
                <h2>adds</h2>
                <h2>adds</h2>
                <h2>adds</h2>
            </div>
        </div>
    )
}

export default MainContent
