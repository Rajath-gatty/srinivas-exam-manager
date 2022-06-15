import "./PageNotFound.css";
import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
import NotFound from "../../Assets/notFound.gif";
import {Link} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi"
const PageNotFound = () => {
    return (
        <div className="notFound-container flex">
            <div className="notFound-logo flex">
                <img width="50px" src={SrinivasLogo} alt="Login SVG" />
                <h1>Srinivas Exam Manager</h1>
            </div>

            <div className="notFound-back">
                <Link to="/" className="flex">
                    <FiArrowLeft size={25}/>
                    <span>Home</span>
                </Link>
            </div>

            <div className="notFound-Img flex">
                <img src={NotFound} alt="Page NotFound" width="550px" />
                <h3>Page not Found</h3>
            </div>
            
        </div>    
    )
}

export default PageNotFound;