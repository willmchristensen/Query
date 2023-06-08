import './Footer.css'


const Footer = () => {

    return (
        <>
            <div className="project-links-title-container">
                <div className="project-repo-link">
                    <a href="https://github.com/TheSicilian12/Query" rel="noopener noreferrer" target="_blank">App Repository</a>
                </div>
                <div className="project-github-links-title">
                    Creator Github Profiles and LinkedIn
                </div>
            </div>
            <div className="project-github-links-container">
                <nav className='project-github-links'>
                    <div className='whole'> William Christensen
                        <div className='links'>
                            <a href="https://github.com/willmchristensen" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/will-christensen-85531317a/" rel="noopener noreferrer" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div className='whole'> Michael Guidera
                        <div className='links'>
                            <a href="https://github.com/TheSicilian12" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/guidera-michael/" rel="noopener noreferrer" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div className='whole'> Alexander Lugibihl
                        <div className='links'>
                            <a href="https://github.com/Alugibihl" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/alexander-lugibihl/" rel="noopener noreferrer" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div className='whole'> Cory <br />Stever
                        <div className='links'>
                            <a href="https://github.com/cstever0" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/cory-stever-aa2730126/" rel="noopener noreferrer" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </nav >
            </div >
        </>
    )
}

export default Footer
