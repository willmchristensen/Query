import './SquareSpaceCard.css'
// import ImageCard from '../ImageCard'
import {NavLink} from 'react-router-dom';

const SquareSpaceCard = ({space}) => {
    // console.log("this is in space card", space)

    return(
        <NavLink
            to={`/spaces/${space.id}`}
        >
            <div className="space">
                <div className="content-container">
                <img src={`${space.imageUrl}`} alt="test" className='space-card-img'/>
                    <div className="content-container text">
                        <h3 className='space-primary-text'>
                            {space.name}
                        </h3>
                        <p className='support-text'>
                            {space.description}
                        </p>
                    </div>
                </div>
            </div>
        </NavLink>
    )

}

export default SquareSpaceCard
