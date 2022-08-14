import "./Create.css";
import {useState,useEffect,useRef} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
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
import { TbTrashX } from "react-icons/tb";
import { HiMinus, HiPlus } from "react-icons/hi";
import {TbArrowBigUpLines,TbArrowBigDownLines} from "react-icons/tb";

const Create = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [semFilter,setSemFilter] = useState([]);
  const [sem,setSem] = useState("");
  const [course, setCourse] = useState("");
  const [selectedStudents,setSelectedStudents] = useState([]);
  const [checkBoxValues,setCheckBoxValues] = useState([]);
  const [curStudents,setCurStudents] = useState([]);
  const [curUsers,setCurUsers] = useState([]);

  const classNameRef = useRef();
  const batchRef = useRef();
  const courseRef = useRef();
  const semRef = useRef();
  const deleteClassRef = useRef();
  const scrollToRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  
  const classInfo = location.state?.classInfo;
  const students = location.state?.students;

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
    if(location.state?.edit) {
      setCurStudents(students);
      setCourse(classInfo.course_name);
      setSem(classInfo.semester);
      users.forEach((std,i) => {
        if(students.includes(std.regno)) {
          setCheckBoxValues(prevState => {
            const newState = [...prevState];
            newState[i]=true;
            return newState;
          })
        }
      })
    }
  },[users,classInfo,location.state,students])
  
  useEffect(() => {
    setLoading(true);
    setUsers([]);
    const fetchUsers = async() => {
      const data = {
        courseValue:classInfo?classInfo.course_name:course,
        semester:classInfo?classInfo.semester:sem,
        edit:classInfo?true:false
      }
      try {
        const result = await axios.post(`/users/student/`,data);
        setCurUsers(location.state?.edit && result.data.filter(std => std.class_id === classInfo.class_id));
        setUsers(location.state?.edit ? result.data.filter(std => std.class_id === null):result.data);
        setCheckBoxValues(new Array(result.data.length).fill(false));
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  },[course,sem,classInfo]);

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
      if(!location.state?.edit){
        let result = await axios.post(`/classroom/create`,ClassData);
        toast.success('Classroom created successfully!',{autoClose:3000});
        if(result?.data.success) {
          await axios.post(`/classroom/add-student`,{ClassData,selectedStudents});
        }
      } else {
        await axios.post(`/classroom/add-student`,{ClassData,selectedStudents});
        toast.success('Classroom updated successfully');
      }

      setBtnLoading(false);
      navigate('/classrooms');
    } catch(err) {
      setBtnLoading(false);
      console.log(err);
      // toast.error(err.response.data.error,{autoClose:3000});
    }
  }

  const HandleSelectedUser = (checked,std,index) => {
    if(checked) {
      setSelectedStudents(prevState => {
        let newArr = [...prevState];
        if(Array.isArray(std)) {
          const newArr = std.filter(s=>!curStudents.includes(s.regno))
          return newArr;
        }
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

  const handleRemoveStudent = async(regno,i) => {
    try {
      const data = {
        regno,
        classId:location.state.classInfo.class_id
      }
      console.log(data);
       await axios.post('/classroom/remove-student',data);
      setCurStudents(prevState => {
        const newState =  [...prevState];
        return newState.filter(std=> std!==regno);
      })
      setCheckBoxValues(prevState => {
        const newArr = [...prevState];
        users.forEach((std,index)=>{
          if(std.regno===regno)
          newArr[index]=false;
        })
        return newArr;
      })
      toast.success('Student removed successfully');
    } catch(err) {
      toast.error('Error removing student');
      console.log(err);
    }
  }

  const handleDeleteClass = async() => {
    const value = deleteClassRef.current?.value;
    if(value !== "Delete "+classInfo.name) {
      toast.error('Text does not match!',{position:'bottom-right'});
      return;
    }
    else{
      try {
        setBtnLoading(true);
        await axios.post('/classroom/delete',{classId:classInfo.class_id});
        toast.success('Classroom Deleted Successfully!');
        navigate('/classrooms');
      } catch(err) {
        setBtnLoading(false);
        toast.error('Error deleting classroom!');
        console.log(err);
      }
    }
  }

  const handlePromote = async() => {
    try {
     await axios.post(`/classroom/promote`,{classId:classInfo.class_id,courseId:classInfo.course_id});
      toast.success('Classroom Promoted to new semester!');
      navigate('/classrooms');
    } catch(err) {
      console.log(err);
      toast.error('Error semester limit reached!');
      setLoading(false);
    }
  }

  const handleDemote = async() => {
    try {
      await axios.post(`/classroom/demote`,{classId:classInfo.class_id});
      toast.success(`Classroom Demoted to semester${classInfo.semester-1}`);
      navigate('/classrooms');
    } catch(err) {
      console.log(err);
      toast.error('Semester limit reached!');
      setLoading(false);
    }
  }

  return (
    <div className="CreateClass-container">
      <Back top="-1em" left="0"/>
      <div className="CreateClass-Main">
        <div className="CreateClass-Header">
          <h1>{location.state?.edit ? "Update "+classInfo.name : "Create Classroom"}</h1>
        </div>
        <div className="CreateClass-form-container">
        <form className="CreateClass-form" onSubmit={HandleCreateClass}>
          <div className="CreateClass-formRow">
            <TextField
              className="TextInput"
              label="Classroom Name"
              variant="outlined"
              size="small"
              value={classInfo?.name}
              fullWidth
              required
              inputRef={classNameRef}
              disabled={location.state?.edit}
            />
            
            <FormControl className="SelectMenu Mr">
              <InputLabel>Class Batch</InputLabel>
              <Select
                label="Class Batch"
                placeholder="Class Batch" 
                defaultValue=""
                value={classInfo?.batch}
                size="small"
                type="number"
                required
                disabled={location.state?.edit}
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
            value={classInfo?.course_name}
            ref={courseRef}
            handleCourseChange={handleCourseChange}
            disabled={location.state?.edit}
            required
            />

            <Filter 
            data={semFilter} 
            label="Semester" 
            filter="semester" 
            width="100%"
            value={classInfo?.semester}
            ref={semRef}
            handleSemesterChange={handleSemesterChange}
            disabled={location.state?.edit}
            required
            />
          </div>

          {selectedStudents.length>0 &&
            <h3 className="mt-1" style={{color:'var(--text-color)'}}>Selected Students : {selectedStudents.length}</h3>}
          
          <div className="classroom-btn-wrapper flex gap-2">
            <div className="flex gap-2">
              <div className="classroom-submitBtn mt-1">
                <button type="submit" className="btn-green flex">
                  {!btnLoading?(location.state?.edit ? "Update":"Create"):<CircularProgress size={16} color={"inherit"} />}
                </button> 
              </div>
      
              {location.state?.edit && <div className="classroom-submitBtn mt-1" onClick={()=>{
                  window.scrollTo({
                    top:scrollToRef.current.offsetTop,
                    behavior:'smooth',
                  })
                }}>
                <div className="btn-outlined-green flex gap-sm">
                  <HiPlus size={20}/>
                  <span>Add Students</span>
                </div>
              </div>}
            </div>
            
            {location.state?.edit && <div className="classroom-promote mt-1 flex gap-1" >
              <div className="btn flex gap-sm" onClick={handlePromote}>
                <TbArrowBigUpLines size={20} fill="#fff"/>
                <span>Promote Class</span>
              </div>
              <div className="btn-outlined-red demote" title="Demote Classroom semester" onClick={handleDemote}>
                <TbArrowBigDownLines size={20} fill="var(--strong-red)"/>
              </div>
            </div>}
          </div>

        </form>
        </div>
        {location.state?.edit&&<div className="current-students-container">
          <h2>Current Students</h2>
        <table className="users-table-wrapper">
        <thead className="thead">
          <tr className="classroom-student-select-header">
            <th>RegNo</th>
            <th>Name</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Semester</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {curUsers.map((std,i) => {
             return <tr className="users-table-row" key={std.regno}>
                <td>{std.regno}</td>
                <td>{std.first_name}</td>
                <td>{std.course_name}</td>
                <td>{std.joining_year}</td>
                <td>{std.semester}</td>
                <td><div className="current-students-delete">
                  <HiMinus 
                  onClick={()=>handleRemoveStudent(std.regno,i)}
                  style={{cursor:'pointer'}} 
                  color="var(--strong-red)" 
                  size={20}
                  />
                </div></td>
              </tr>
            })}
        </tbody>
      </table>
        </div>}
        </div>

        <div ref={scrollToRef} className="CreateClass-SelectUsers" id="add-students">
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
          disableCurStudent={curStudents}
          course={course}
          semester={sem}
          />
        </div>

        {location.state?.edit && 
          <div className="Delete-class">
            <h2>Delete Class</h2>
            <p><span>Enter the following text to Confirm : </span>Delete {classInfo.name}</p>
            <div className="Delete-form">
              <input type="text" placeholder={"Delete "+classInfo.name} ref={deleteClassRef}/>
              {!btnLoading ? <div className="btn-outlined-red flex gap-sm" onClick={handleDeleteClass}>
                <TbTrashX color="inherit" size={20}/> <span>Delete</span>
              </div>
              : <CircularProgress size={16} color={"inherit"} />}
            </div>
          </div>
        }
    </div>
  )
}

export default Create;