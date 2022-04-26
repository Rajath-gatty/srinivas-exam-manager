import {FiArrowLeft} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Back.css"
const  Back = () => {
    const navigate = useNavigate();
    return(
      <div className="back-btn flex" onClick={() => navigate(-1)}>
        <FiArrowLeft color="var(--light-grey)" size={20} /> 
        <span>Back</span>
      </div>
     )
}

export default Back;