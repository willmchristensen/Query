import LoginFormPage from "../LoginFormPage"
import SignupFormPage from "../SignupFormPage"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./SplashPage.css"

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/home" />;

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    }

    return (
        <div className="splash-page-container">
            <div className="login-splash-page">
                <LoginFormPage />
            </div>
            <div className="signup-splash-page">
                <SignupFormPage />
            </div>
            <div className="splash-page-demo-button">
                <button onClick={handleClick}>Demo User</button>
            </div>
        </div>
    )
}


export default SplashPage;
