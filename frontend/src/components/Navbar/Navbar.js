import "./Navbar.css";
import {useNavigate} from "react-router-dom";
import {SrinivasLogo} from "../../Assets";
import {FiArrowLeft} from "react-icons/fi"

const Navbar = ({to}) => {
    const navigate = useNavigate();

    const HandleBack = () =>{
        if(!to){
            navigate(-1);
        }else{
            navigate(to);
        }
    }

    return (
        <nav className="nav">
            <div className="nav-logo flex">
                <img width="50px" src={SrinivasLogo} alt="Login SVG" />
                <h1>Srinivas Exam Manager</h1>
            </div>

            <div className="nav-back">
                <div onClick={HandleBack} className="nav-btn flex">
                    <FiArrowLeft size={20}/>
                    <span>Back</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;