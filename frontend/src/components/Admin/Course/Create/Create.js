import { useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import {AiOutlinePlus} from "react-icons/ai";
import {TextField,FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import "./Create.css";

const Create = () => {
    const navigate = useNavigate();
    return(
       <div className="create-course-main">
        <div className="back-btn flex" onClick={() => navigate(-1)}>
            <FiArrowLeft color="var(--light-grey)" size={25} /> 
            <span>Back</span>
        </div>
        <h1 className="main-hdng">New Course</h1>
        <div className="course-details-wrapper">
            <form>
                <div className="course-meta">
                    <TextField
                    label="Course"
                    variant="outlined"
                    size="small"
                    fullWidth
                    />
                    <FormControl className="course-duration-select">
                        <InputLabel>Duration</InputLabel>
                        <Select
                        label="Department"
                        defaultValue=""
                        size="small"
                        >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="semester-wrapper">
                    <div className="semester-header">
                        <h2>Semesters</h2>
                        <button className="btn-outlined new-sem-btn flex">
                            <AiOutlinePlus size={20} color="var(--primary-color) :hover{color:var(--white)}"/>
                            <span>New Sem</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
       </div>
    )
}

export default Create;