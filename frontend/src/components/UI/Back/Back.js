import {FiArrowLeft} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Back.css"
const  Back = ({top,left}) => {
    const navigate = useNavigate();
    return(
      <div className="back-btn flex" style={{top:top?top:'2em',left:left?left:'2em'}} onClick={() => navigate(-1)}>
        <FiArrowLeft color="var(--light-grey)" size={20} /> 
        <span>Back</span>
      </div>
     )
}

export default Back;