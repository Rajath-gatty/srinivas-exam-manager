import "./PageNotFound.css";
// import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
import NotFound from "../../Assets/notFound.gif";
// import {Link} from "react-router-dom";
// import {FiArrowLeft} from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";

const PageNotFound = () => {
    return (
        <div className="notFound-container flex">
            <Navbar />

            <div className="notFound-Img flex">
                <img src={NotFound} alt="Page NotFound" width="500px" />
                <h3>Page not Found</h3>
            </div>
        </div>    
    )
}

export default PageNotFound;