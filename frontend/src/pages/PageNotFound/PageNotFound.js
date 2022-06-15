import "./PageNotFound.css";
import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
import NotFound from "../../Assets/NotFound/NotFound.svg";
import NotFoundA from "../../Assets/NotFound/NotFound1.svg";
import NotFoundB from "../../Assets/NotFound/NotFound2.svg";

const PageNotFound = () => {
    return (
        <div className="notFound-container flex">
            <div className="notFound-logo flex">
            <img width="50px" src={SrinivasLogo} alt="Login SVG" />
            <h1>Srinivas Exam Manager</h1>
            </div>

            <div className="notFound-Img flex">
            <img src={NotFoundA} alt="Page NotFound" width="100%" />
            {/* <h3>Are your Lost ?</h3> */}
            </div>
            
        </div>    
    )
}

export default PageNotFound;