import './Footer.css'


const Footer = () => {

    return(
        <>
        <div className="project-links-title-container">
            <div className="project-repo-link">
                <a href="https://github.com/TheSicilian12/Query" target="_blank">App Repository</a>
            </div>
            <div className="project-github-links-title">
                Creator Github Profiles
            </div>
        </div>
        <div className="project-github-links-container">
            <nav className='project-github-links'>
                <a href="https://github.com/cstever0" target="_blank">Cory Stever</a>
                <a href="https://github.com/TheSicilian12" target="_blank">Michael Guidera</a>
                <a href="https://github.com/willmchristensen" target="_blank">William Christensen</a>
                <a href="https://github.com/Alugibihl" target="_blank">Alex Lugibihl</a>
            </nav>
        </div>
        </>
    )
}

export default Footer
