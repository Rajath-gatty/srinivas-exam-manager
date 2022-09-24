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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Create.css";
import SemList from "./SemList";
import { useEffect, useReducer,useState} from "react";
import { toast } from "react-toastify";

const initialState = {
  name: '',
  duration: '',
  semesters: [],
};

const courseDetailsReducer = (state, action) => {
  if (action.type === "ADD_SEM") {
    const sem = {
      semName:state.semesters.length+1,
      subjects: [],
    };
    state.semesters.push(sem);
    return { ...state };
  }

  if (action.type === "REMOVE_SEM") {
    const oldState = [...state.semesters];
    const newState = oldState.filter((_, i) => i !== action.payload);
    state.semesters = newState;
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

  if (action.type === "EDIT") {
    const newState = {
      name: action.payload.courseName,
      duration:action.payload.duration,
      semesters:action.payload.semesters
    }
    return newState;
  }
};

const Create = () => {
  const [state, dispatch] = useReducer(courseDetailsReducer, initialState);
  const [errors,setErrors] = useState([]);
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
    const fetchCourseDetails = async() => {
      try {
        setLoading(true);
        const result = await axios.post('/admin/course-details',{courseId:location.state.courseId});
        const newArr = result.data.reduce((acc,cur) =>{
          if(acc.some((item) => item.semName===cur.sem_name)) {
              acc.forEach((item,i) =>{
                  if(item.semName===cur.sem_name) {
                      acc[i].subjects.push({name:cur.subj_name,code:cur.subj_code,ia:cur.i_a,credits:cur.credits})
                  }
              })
          } else {
              acc.push({
                  semName:cur.sem_name,
                  subjects:[{name:cur.subj_name,code:cur.subj_code,ia:cur.i_a,credits:cur.credits}]
              })
          }
            return acc;
        },[]);

        const data = {
          courseName:location.state.courseName,
          duration:location.state.duration,
          semesters:newArr
        }
        editCourse(data);
        setLoading(false);
        
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }
    if(location.state?.edit) {
      fetchCourseDetails();
    }
  },[location.state])

  const addSem = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_SEM" });
  };

  const removeSem = async(index) => {
    const sem = state.semesters[index];
    const totalSem = state.semesters.length;
    if(sem.subjects.length>0) {
      if(window.confirm(`Remove semester ${sem.semName}?`)) {
        let subjectCodes = [];
        sem.subjects.forEach(sub => subjectCodes.push(sub.code));
        const data = {
          subjects:subjectCodes,
          totalSem,
          courseId:location.state.courseId
        }
        await toast.promise(axios.post(`/admin/courses/subjects/remove`,data),{
          pending: 'Loading...',
          success: 'Subjects Deleted!',
          error: 'Something went wrong'
        })
        dispatch({ type: "REMOVE_SEM", payload: index });
      }
    } else {
      dispatch({ type: "REMOVE_SEM", payload: index });
    }
  };

  const addSubjectsToReducer = (subjects) => {
    dispatch({ type: "ADD_SUBJECT", payload: subjects });
  };

  const removeSubject = async(subIndex, semIndex) => {
    const subject = state.semesters[semIndex].subjects[subIndex];
    console.log(subject);
    if(window.confirm(`Remove subject ${subject.name} ?`)) {
     await toast.promise(axios.post(`/admin/courses/subjects/remove`,{subjects:[subject.code]}),{
        pending: 'Loading...',
        success:  `Subject ${subject.name} deleted!`,
        error: 'Something went wrong'
      })
      dispatch({ type: "REMOVE_SUBJECT", payload:{ subIndex, semIndex }});
    } 
  };

  const editCourse = (data) => {
    dispatch({ type: "EDIT", payload:data });
  };

  const newCourseSubmit = async(e) => {
    e.preventDefault();
    console.log(state);
    try {
      state.semesters.forEach((sem,i) => {
        if(!sem.subjects.length>0) {
          throw new TypeError('Add Subjects');
        }
      })
      const data = {
        ...state,
        edit:location.state?.edit
      }
      const result = await axios.post('/admin/new-course',data);
      console.log(result);
      toast.success(result.data);
      navigate('/courses');
    } catch(err) {
      if(err.response?.status===400) {
       return setErrors(err.response.data);
      } else if(err instanceof TypeError) {
       return setErrors([{param:'subjects'}])
      } 
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
      <h1 className="main-hdng">{location.state?.edit?'Edit':'New'} Course</h1>
      <div className="course-details-wrapper">
        <form onSubmit={newCourseSubmit}>
          <div className="course-meta">
            <TextField
              label="Course"
              variant="outlined"
              size="small"
              fullWidth
              value={state.name}
              disabled={location.state?.edit}
              error={errors.some((err) => err.param === "name")}
              helperText={errors.find((err) => err.param === "name")?.msg}
              onChange={(e) => dispatch({type:'COURSENAME',payload:e.target.value})}
            />
            <FormControl className="course-duration-select">
              <InputLabel>Duration</InputLabel>
              <Select
                label="Duration"
                defaultValue=""
                size="small"
                type="number"
                value={state.duration}
                disabled={location.state?.edit}
                error={errors.some((err) => err.param === "duration")}
                onChange={(e) => dispatch({type:'DURATION',payload:e.target.value})}
              >
                <MenuItem value="1">1 Year</MenuItem>
                <MenuItem value="2">2 Years</MenuItem>
                <MenuItem value="3">3 Years</MenuItem>
                <MenuItem value="4">4 Years</MenuItem>
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
            {!loading?state.semesters.map((semester, index) => {
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
            }):<div style={{marginTop:120}} className="flex"><CircularProgress thickness={4}/></div>}
            {errors.some((err) => err.param === "subjects")&&<p style={{color:'red',marginTop:'1em'}}>Add all semester Subjects</p>}
            {state.semesters.length > 0 && (
              <button className="btn-green mt-2" type="submit">
                {location.state?.edit?'Update':'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
