import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

import "./Create.css";
import SemList from "./SemList";
import { useReducer,useState} from "react";

const initialState = {
  name: '',
  duration: '',
  semesters: [],
};

let semCount = 0;
const courseDetailsReducer = (state, action) => {
  if (action.type === "ADD_SEM") {
    semCount++;
    const sem = {
      semName: "SEM " + semCount,
      subjects: [],
    };
    state.semesters.push(sem);
    return { ...state };
  }

  if (action.type === "REMOVE_SEM") {
    const oldState = [...state.semesters];
    const newState = oldState.filter((_, i) => i !== action.payload);
    state.semesters = newState;
    if (semCount > 0) semCount--;
    return { ...state };
  }

  if (action.type === "ADD_SUBJECT") {
    state.semesters.forEach((sem, i) => {
      if (action.payload.index === i) {
        const updatedSubjects = [...sem.subjects];
        action.payload.subjects.forEach((sub) => updatedSubjects.push(sub));
        state.semesters[i].subjects = updatedSubjects;
      } else {
        return;
      }
    });
    return { ...state };
  }

  if (action.type === "REMOVE_SUBJECT") {
    state.semesters
      .find((_, i) => i === action.payload.semIndex)
      .subjects.splice(action.payload.subIndex, 1);
    return { ...state };
  }

  if (action.type === "COURSENAME") {
    const newState = {...state};
    newState.name = action.payload;
    return newState;
  }

  if (action.type === "DURATION") {
    const newState = {...state};
    newState.duration= action.payload;
    return newState;
  }
};

const Create = () => {
  const [state, dispatch] = useReducer(courseDetailsReducer, initialState);
  const [errors,setErrors] = useState([]);

  const navigate = useNavigate();

  const addSem = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_SEM" });
  };

  const removeSem = (index) => {
    dispatch({ type: "REMOVE_SEM", payload: index });
  };

  const addSubjectsToReducer = (subjects) => {
    dispatch({ type: "ADD_SUBJECT", payload: subjects });
  };

  const removeSubject = (subIndex, semIndex) => {
    dispatch({ type: "REMOVE_SUBJECT", payload: { subIndex, semIndex } });
  };
  const newCourseSubmit = async(e) => {
    e.preventDefault();
    try {
      state.semesters.forEach((sem,i) => {
        if(!sem.subjects.length>0) {
          throw new Error('Add Subjects');
        }
      })
      const result = await axios.post('/admin/new-course',state);
      console.log(result);
    } catch(err) {
      if(err.response?.status===400) {
       return setErrors(err.response.data);
      }
      console.log(err);
      setErrors([]);
    }
  };
  return (
    <div className="create-course-main">
      <div className="back-btn flex" onClick={() => navigate(-1)}>
        <FiArrowLeft
          color="var(--light-grey)"
          className="create-svg"
          size={20}
        />
        <span>Back</span>
      </div>
      <h1 className="main-hdng">New Course</h1>
      <div className="course-details-wrapper">
        <form onSubmit={newCourseSubmit}>
          <div className="course-meta">
            <TextField
              label="Course"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.some((err) => err.param === "name")}
              helperText={errors.find((err) => err.param === "name")?.msg}
              onChange={(e) => dispatch({type:'COURSENAME',payload:e.target.value})}
            />
            <FormControl className="course-duration-select">
              <InputLabel>Duration</InputLabel>
              <Select
                label="Department"
                defaultValue=""
                size="small"
                type="number"
                error={errors.some((err) => err.param === "duration")}
                onChange={(e) => dispatch({type:'DURATION',payload:e.target.value})}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
              <FormHelperText error>{errors.find((err) => err.param === "duration")?.msg}</FormHelperText>
            </FormControl>
          </div>
          <div className="semester-wrapper">
            <div className="semester-header">
              <h2>Semesters</h2>
              <button
                className="btn-outlined new-sem-btn flex"
                onClick={(e) => addSem(e)}
              >
                <HiPlus
                  size={20}
                  color="var(--primary-color) :hover{color:var(--white)}"
                />
                <span>New Sem</span>
              </button>
            </div>
            {state.semesters.map((semester, index) => {
              return (
                <SemList
                  key={Math.random()}
                  details={semester}
                  removeSem={removeSem}
                  index={index}
                  addSubjectsToReducer={addSubjectsToReducer}
                  removeSubject={removeSubject}
                />
              );
            })}

            {semCount > 0 && (
              <button className="btn course-submit-btn" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
