import './NavBar.css'
import NavItem from './NavItem'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import CreateQuestionModal from '../CreateQuestionModal';

const NavBar = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let index = 0;

    const handleDeadLinks = () => {
        window.alert('sup')
    }

    return(
        <div className="nav-container">
            <nav className="nav">
                <div className="nav-section">
                    <div className="logo quora-font query-logo">
                        <NavLink
                            className="no-underline"
                            to='/'
                        >
                            Query
                        </NavLink>
                    </div>
                    <NavItem
                        icon={<i class="fas fa-home"></i>}
                        item={"Home"}
                        url={"/"}
                        text={"Home"}
                    >
                    </NavItem>
                     <NavItem
                        icon={<i class="fab fa-wpforms"></i>}
                        item={"Following"}
                        url={"/following"}
                        text={"Following"}
                        onClick={handleDeadLinks}
                    >
                    </NavItem>
                    <NavItem
                        icon={<i class="fas fa-check-square"></i>}
                        item={"Answer"}
                        url={"/answer"}
                        text={"Answer"}
                    >
                    </NavItem>
                    {
                        sessionUser ?
                        <NavItem
                            icon={<i class="fas fa-users"></i>}
                            item={"Spaces"}
                            url={"/spaces"}
                            text={"Spaces"}
                        >
                        </NavItem>
                        :
                        <></>
                    }
                    <NavItem
                        icon={<i class="fas fa-bell"></i>}
                        item={"Notifications"}
                        url={"/notifications"}
                        text={"Notifications"}
                    >
                    </NavItem>
                </div>
                <div className="nav-section-two">
                    <div className="search-container">
                        <i class="fas fa-search"></i>
                        <input type="text" />
                    </div>
                    {isLoaded && (
                        <ProfileButton user={sessionUser} />
                    )}
                    {
                        sessionUser ?
                        <OpenModalButton
                            buttonText="Add question"
                            modalComponent={<CreateQuestionModal />}
                        /> :
                        <></>
                    }
                </div>
            </nav>
        </div>
    )

}

export default NavBar
