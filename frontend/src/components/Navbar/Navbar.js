import "./Navbar.css";
import {Link} from "react-router-dom";
import SrinivasLogo from "../../Assets/SrinivasLogo.svg";
const Navbar = () => {
return (
    <nav className="nav">
        <div className="container">
            <div className="nav-wrapper">
                <div className="nav-header">
                    <img src={SrinivasLogo} className="header-img" alt="Srinivas Logo" />
                    <h2 className="hdng">Srinivas Exam Manager</h2>
                </div>
                <div className="nav-links">
                    <Link to="/">Login</Link>
                </div>
            </div>
        </div>
    </nav>
)
}

export default Navbar;