import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSpace } from '../../store/space';
import OpenModalButton from '../OpenModalButton';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteSpaceModal from '../DeleteSpaceModal';


const SingleSpace = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true)
    const { spaceId } = useParams();
    const { space } = useSelector((state) => state.space.singleSpace)
    console.log("this is space", space)

    useEffect(() => {
        dispatch(getOneSpace(spaceId));
    }, [dispatch, spaceId])

    const handleClick = () => {
        setIsHidden(!isHidden)
    }

    let editQuestionTool = isHidden ? 'hidden' : 'edit-question-tooltip';

    if (!space) return null;

    return (
        <div className='single-space-container'>
            <h1>{space.name}</h1>
            <div className="edit-space-button">
                <button
                    className="circle-button"
                    onClick={handleClick}
                >
                    <i className="fas fa-ellipsis-h"></i>
                </button>
                <div className="edit-question-tooltip-container">
                    <div className={editQuestionTool}>
                        <button className='edit-space-placeholder'>
                            Edit space
                        </button>
                        <OpenModalButton
                            buttonText="Delete space"
                            modalComponent={
                                <DeleteSpaceModal
                                    id={space.id}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="single-space-description">
                   <p>{space.description}</p> 
            </div>
            <div className='single-space-image-container'>
                <img src={space.imageUrl}></img>
            </div>
            <div className='single-space-questions-container'>
                {
                    space.questions.map(question => {
                        return (
                            <NavLink to={`/questions/${question.id}`}>
                                {question.details}
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SingleSpace;
