import './SquareSpaceCard.css'
// import ImageCard from '../ImageCard'

const SquareSpaceCard = ({space}) => {
    // console.log("this is in space card", space)

    return(
        <div className="space">
            <div className="content-container">
              <img src={`${space.imageUrl}`} alt="test" className='space-card-img'/>
                <div className="content-container text">
                    <h3 className='space-primary-text'>
                        {space.name}
                    </h3>
                    <p className='support-text'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, voluptates.
                    </p>
                </div>
            </div>
        </div>
    )

}

export default SquareSpaceCard
