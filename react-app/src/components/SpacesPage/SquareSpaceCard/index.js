import './SquareSpaceCard.css'
// import ImageCard from '../ImageCard'

const SquareSpaceCard = ({space}) => {
    // console.log("this is in space card", space)

    return(
        <div className="space">
            <div className="content-container">
              <img src={`${space.imageUrl}`} alt="test" className='space-card-img'/>
            </div>
            <div className="content-container text">
                <h3 className='primary-text'>
                    {space.name}
                </h3>
                <p className='support-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, voluptates.
                </p>
            </div>
        </div>
    )

}

export default SquareSpaceCard
