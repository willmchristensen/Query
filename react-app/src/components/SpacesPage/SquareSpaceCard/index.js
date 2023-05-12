import './SquareSpaceCard.css'
// import ImageCard from '../ImageCard'
import {NavLink} from 'react-router-dom';

const SquareSpaceCard = ({space}) => {
    // console.log("this is in space card", space)

    return (
        <div className="space white-background">
            <NavLink
                to={`/spaces/${space.id}`}
            >
                <div className="space-link">
                    <div className="content-container">
                        <img src={`${space.imageUrl}`} alt="test" className='space-card-img'/>
                        <div className="content-container text">
                            <h3 className='space-primary-text'>
                                {space.name}
                            </h3>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink
                to={`/spaces/${space.id}`}
                style={{ textDecoration: 'none' }}
            >
                <p className='square-space-support-text'>
                    {space.description}
                </p>
            </NavLink>
        </div>
    )

}

export default SquareSpaceCard
