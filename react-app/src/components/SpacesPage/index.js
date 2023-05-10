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
    const sessionUser = useSelector((state) => state.session.user)
    const spaces = useSelector((state) => state.space.spaces)
    const spacesArray = Object.values(spaces)
    const userSpaces = spacesArray.filter((s) => s.ownerId == sessionUser.id)


    useEffect(() => {
        dispatch(getAllSpaces())
    }, [dispatch])

    return (
        <div className="spaces-container">
            <div className="spaces-banner">
                <div className="spaces-banner-left">
                    <div className="spaces-text">
                        <h3>Welcome to Spaces!</h3>
                        <p>Follow Spaces to explore your interests on Quora.</p>
                    </div>
                    <div className="spaces-buttons">
                        <OpenModalButton 
                            modalComponent={<CreateSpaceModal/>}
                            buttonText="Create a Space"
                        />
                        <button className="oval-button">
                            Discover Spaces
                        </button>
                    </div>
                    {
                        userSpaces.map(space => {
                            return (
                                <SpaceCard
                                    name={space.name}
                                    image={space.imageUrl}
                                ></SpaceCard>
                            )
                        })
                    }
                </div>
                <div className="spaces-banner-right">
                    <div className="spaces-image">
                        <img className="spce-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/080.png" alt='kk' />
                    </div>
                </div>
            </div>
            <div className="space-card-container">
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
