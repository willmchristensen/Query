import './SpaceCard.css'
import {NavLink} from 'react-router-dom';

const SpaceCard = ({name,image,id}) => {

    return(
        <NavLink
            to={`/spaces/${id}`}
        >
            <div className="space-card-container">
                <div className="space-card white-background">
                    <div className="space-image">
                        {/* <img className="spce-img" src={image} alt={name} /> */}
                        <img className="spce-img" src={image}  />
                    </div>
                    <div className="space-text">
                        <h3>{name}</h3>
                    </div>
                </div>
            </div>
        </NavLink>
    )

}

export default SpaceCard
