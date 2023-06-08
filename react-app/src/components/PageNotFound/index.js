import { useHistory } from "react-router-dom";
import "./notFound.css"

function NotFound() {
    const history = useHistory()

    return (

        <div className="unavailable">
            <h2>404, Nothing to see here...</h2>
            <button className="oval-button" onClick={() => history.push('/')}>Return to main page</button>
        </div >
    )
}


export default NotFound;
