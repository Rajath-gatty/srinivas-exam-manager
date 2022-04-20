import { useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import {AiOutlinePlus,AiOutlineClose,AiOutlineMinusCircle} from "react-icons/ai";
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
                    <div className="semester">
                        <div className="semester-header">
                            <h3 className="sem-text">SEM 1</h3>
                            <AiOutlineMinusCircle size={20} color="var(--strong-red)"/>
                        </div>
                        <div className="subject-details-wrapper">
                        <TextField
                            label="Subject Name"
                            variant="standard"
                            size="small"
                            className="subject-input"
                            fullWidth
                        />
                        <TextField
                            label="Subject code"
                            variant="standard"
                            size="small"
                            className="subject-input"
                            fullWidth
                        />
                        <button className="add-subject-btn btn-outlined flex">
                            <AiOutlinePlus size={15}/>
                            <span>Add</span>
                        </button>
                        </div>
                        <div className="subject-info-main">
                            <div className="subject-info-wrapper flex">
                                <div className="subject-info">
                                    <h3>Data Stuctures using c++</h3>
                                    <p>19BCASD45</p>
                                </div>
                                <AiOutlineClose color="var(--strong-red)"/>
                            </div>
                            <div className="subject-info-wrapper flex">
                                <div className="subject-info">
                                    <h3>Advanced Java Programming</h3>
                                    <p>19BCASD45</p>
                                </div>
                                <AiOutlineClose color="var(--strong-red)"/>
                            </div>
                            <div className="subject-info-wrapper flex">
                                <div className="subject-info">
                                    <h3>C++</h3>
                                    <p>19BCASD45</p>
                                </div>
                                <AiOutlineClose color="var(--strong-red)"/>
                            </div>
                            <div className="subject-info-wrapper flex">
                                <div className="subject-info">
                                    <h3>Data Stuctures Algorithms using java</h3>
                                    <p>19BCASD45</p>
                                </div>
                                <AiOutlineClose color="var(--strong-red)"/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn course-submit-btn" type="submit">Submit</button>
            </form>
        </div>
       </div>
    )
}

export default Create;