import "./Create.css";
import {useState,useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Back from '../../../UI/Back/Back';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import StudentList from "./StudentList";
import axios from "axios";
import Filter from "../../../UI/Filter/Filter";
import { useContextData } from "../../../../hooks/useContextData";
import {useFetchCourses} from "../../../../hooks/useFetchCourses";
import {CircularProgress} from "@mui/material";

const Create = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [semFilter,setSemFilter] = useState([]);
  const [sem,setSem] = useState("");
  const [course, setCourse] = useState("");
  const [selectedStudents,setSelectedStudents] = useState([]);
  const [checkBoxValues,setCheckBoxValues] = useState([]);

  const classNameRef = useRef();
  const batchRef = useRef();
  const courseRef = useRef();
  const semRef = useRef();

  const navigate = useNavigate();
  const DegreeYear = [2018, 2019, 2020, 2021,2022,2023,2024,2025,2026,2027];
  const colors = [
    "#34C349",
    "#2DB9CB",
    "#E1CC00",
    "#3564FB",
    "#C13C14",
    "#30A7E7",
    "#FB1061",
    "#9110F3",
    "#E43F0E"
  ];

  const {user} = useContextData();
  const filterCourses = useFetchCourses(user.deptId);

  useEffect(() => {
    setLoading(true);
    setUsers([]);
    const fetchUsers = async() => {
      try {
        const result = await axios.post(`/users/student/`,{courseValue:course,semester:sem});
        setUsers(result.data);
        setCheckBoxValues(new Array(result.data.length).fill(false));
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  },[course,sem]);

  const HandleCreateClass = async (e) =>{
    e.preventDefault();
    setBtnLoading(true);

    const ClassData = {
      className: classNameRef.current?.value,
      batch: batchRef.current?.value,
      course: courseRef.current?.value,
      semester: semRef.current?.value,
      color: colors[Math.floor(Math.random()*colors.length)]
    }

    try {
      const result = await axios.post(`/classroom/create`,ClassData);
      console.log(result.data.success);
      if(result.data.success)
        var result2 = await axios.post(`/classroom/add-student`,{ClassData,selectedStudents});

      setBtnLoading(false);
      toast.success('Classroom created successfully',{autoClose:3000});
      navigate('/classrooms');
    } catch(err) {
      setBtnLoading(false);
      toast.error(err.response.data.error,{autoClose:3000});
      console.log(err);
    }
  }

  const HandleSelectedUser = (checked,std,index) => {
    if(checked) {
      setSelectedStudents(prevState => {
        let newArr = [...prevState];
        if(Array.isArray(std)) 
        return newArr=std;
        newArr.push(std);
        return newArr;
      });
      setCheckBoxValues(prevState => {
        const newArr = [...prevState];
        newArr[index]=true;
        return newArr;
      })
    } else {
      setCheckBoxValues(prevState => {
        const newArr = [...prevState];
        newArr[index]=false;
        return newArr;
      })
      setSelectedStudents(prevState => {
        const newArr = [...prevState];
        if(Array.isArray(std)) 
        return [];
        const upArr = newArr.filter(item => item.regno!==std.regno)
        console.log(upArr);
        return upArr;
      });
    }
  }

  const handleCourseChange = async(e) => {
    const courseValue = e.target.value;
    fetchSemesters(courseValue);
    setCourse(courseValue);
    try {
      setLoading(true);
      const result = await axios.post(`/users/student/`,{courseValue,semester:sem});
      setUsers(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  const fetchSemesters = async (courseName) => {
    try {
      const resp = await axios.post('/semesters',{courseName});
      const data = await resp?.data;
      const semData = new Array(data.course_sem).fill('');
      setSemFilter(semData);
    } catch (error) {
        console.log(error);
    }
  };

  const handleSemesterChange = async(e) =>{
    const semester = e.target.value;
    setSem(semester);
    try {
      setLoading(true);
      const result = await axios.post(`/users/student/semfilter`,{semester,courseName:course});
      setUsers(result.data);
      setLoading(false);
    } catch(err) {
      console.log('approve error',err);
      setLoading(false);
    }
  }

  return (
    <div className="CreateClass-container">
      <Back top="-1em" left="0"/>
      <div className="CreateClass-Main">
        <div className="CreateClass-Header">
          <h1>Create Classroom</h1>
        </div>
        <div className="CreateClass-form-container">
        <form className="CreateClass-form" onSubmit={HandleCreateClass}>
          <div className="CreateClass-formRow">
            <TextField
              className="TextInput"
              label="Classroom Name"
              variant="outlined"
              size="small"
              fullWidth
              required
              inputRef={classNameRef}
            />
            
            <FormControl className="SelectMenu Mr">
              <InputLabel>Class Batch</InputLabel>
              <Select
                label="Class Batch"
                placeholder="Class Batch" 
                defaultValue=""
                size="small"
                type="number"
                required
                inputRef={batchRef}
              >
                {DegreeYear.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="CreateClass-formRow mt-2">
            <Filter  
            data={filterCourses} 
            label="Course" 
            filter="course" 
            width="100%"
            ref={courseRef}
            handleCourseChange={handleCourseChange}
            required
            />

            <Filter 
            data={semFilter} 
            label="Semester" 
            filter="semester" 
            width="100%"
            ref={semRef}
            handleSemesterChange={handleSemesterChange}
            required
            />
          </div>

          {selectedStudents.length>0 &&
            <h3 className="mt-1" style={{color:'var(--text-color)'}}>Selected Students : {selectedStudents.length}</h3>}
          
          <div className="classroom-submitBtn mt-1">
            <button type="submit" className="btn-green flex">
              {!btnLoading?"Create":<CircularProgress size={16} color={"inherit"} />}
            </button>
              
          </div>
        </form>
        </div>
        </div>

        <div className="CreateClass-SelectUsers">
          <h2>Add Students</h2>
          <StudentList 
          showCheckbox 
          hideEligible 
          users={users}
          setUsers={setUsers}
          loading={loading}
          setLoading={setLoading}
          HandleSelectedUser={HandleSelectedUser}
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
          />
        </div>
    </div>
  )
}

export default Create;