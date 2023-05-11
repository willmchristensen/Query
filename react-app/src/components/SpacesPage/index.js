import './SpacesPage.css'
import SquareSpaceCard from './SquareSpaceCard'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpaces } from '../../store/space';
import CreateSpaceModal from '../CreateSpaceModal';
import SpaceCard from '../SpaceCardArea/SpaceCard';
import OpenModalButton from '../OpenModalButton';

const SpacesPage = () => {
    const dispatch = useDispatch();
    const spaces = useSelector((state) => state.space.spaces);
    const sessionUser = useSelector((state) => state.session.user)
    const spacesArray = Object.values(spaces)
    const userSpaces = spacesArray.filter((s) => s.ownerId == sessionUser.id)
   
    useEffect(() => {
        dispatch(getAllSpaces())
    }, [dispatch]) 

    const handleClick = () => {
        window.alert('Feature coming soon')
    }

    return (
        <div className="spaces-container">
            <div className="spaces-banner">
                <div className="spaces-banner-buttons">
                    <div className="spaces-text">
                        <h3>Welcome to Spaces!</h3>
                        <p>Follow Spaces to explore your interests on Quora.</p>
                    </div>
                    <div className="spaces-buttons">
                        <OpenModalButton 
                            modalComponent={<CreateSpaceModal/>}
                            buttonText="Create a Space"
                        />
                        <button 
                            className="oval-button"
                            onClick={handleClick}
                        >
                            Discover Spaces
                        </button>
                    </div>
                </div>
                <div className="user-spaces">
                    {
                        userSpaces.map(space => {
                            return (
                                <SpaceCard
                                    id={space.id}
                                    name={space.name}
                                    image={space.imageUrl}
                                ></SpaceCard>
                            )
                        })
                    }
                </div>
            </div>
            <div className="square-space-card-container">
                {
                    spacesArray.map(space => {
                        return (
                            <SquareSpaceCard space={space} />
                        )
                    })
                }
            </div>
            <button
                className='view-more'
            >
                view more
                <i class="fas fa-caret-down"></i>
            </button>
        </div>
    )
}

export default SpacesPage
