import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {SrinivasLogo} from "../../Assets";
import {FiArrowLeft} from "react-icons/fi"

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <div className="nav-logo flex">
                <img width="50px" src={SrinivasLogo} alt="Login SVG" />
                <h1>Srinivas Exam Manager</h1>
            </div>

            <div className="nav-back">
                <div onClick={() => navigate(-1)} className="nav-btn flex">
                    <FiArrowLeft size={20}/>
                    <span>Back</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;