import './SpacesPage.css'
import SquareSpaceCard from './SquareSpaceCard'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpaces } from '../../store/space';

const SpacesPage = () => {
    const 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch()
    },[])

    return(
        <div className="spaces-container">
            <div className="spaces-banner">
                <div className="spaces-banner-left">
                    <div className="spaces-text">
                        <h3>Welcome to Spaces!</h3>
                        <p>Follow Spaces to explore your interests on Quora.</p>
                    </div>
                    <div className="spaces-buttons">
                        <button className="oval-button">
                            yep
                        </button>
                        <button className="oval-button">
                            yep
                        </button>
                    </div>
                </div>
                <div className="spaces-banner-right">
                    <div className="spaces-image">
                        <img className="spce-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/080.png" alt='kk' />
                    </div>
                </div>
            </div>   
        <div className="space-card-container">
            <SquareSpaceCard />
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