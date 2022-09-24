import { useState, useEffect } from "react";
import "./AssignFaculty.css";
import { FiCheck } from "react-icons/fi";
import Back from "../../../UI/Back/Back";
import axios from "axios";
import Filter from "../../../UI/Filter/Filter";
import { useFetchCourses } from "../../../../hooks/useFetchCourses";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useContextData } from "../../../../hooks/useContextData";
// import { AssignFacultyList } from "./AssignFacultyList";

const AssignFaculty = () => {
  const [assignEvaluator, setAssignEvaluator] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [classroomFilter, setClassroomFilter] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [subjectFilter,setSubjectFilter] = useState([]);
  const [selectedSubject,setSelectedSubject] = useState('');
  // const [bundleFilter,setbundleFilter] = useState([]);
  // const [selectedBundle,setSelectedBundle] = useState('');

  const {user:{deptId}} = useContextData();
  const filterCourses = useFetchCourses(deptId);

  useEffect(() =>{
    const fetchFaculty = async () =>{
      try{
        const result = await axios.post("/users/faculty",{subject:selectedSubject});
        console.log(result.data);
        setFaculty(result.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchFaculty();
  },[selectedSubject]);
  
  const ActiveOrder = (e) => {
    e.preventDefault();
    var currBtn = e.target;
    var currBtnParent = currBtn.parentElement;
    var allBtns = currBtnParent.childNodes;
    var currId = currBtn.getAttribute("data-id");
    // console.log(allBtns[0]);

    //Assign Evaluator while array is not empty
    assignEvaluator.forEach((item) => {
      //Toggle orders of same row
      if (item.id === currId && item.order !== currBtn.value){
        Array.from(allBtns).map((btn) => {
          btn.removeAttribute("style");
        });
        console.log("orders of same row");

        setAssignEvaluator(assignEvaluator.map(obj => 
          obj.id === currId ? {...obj, order: currBtn.value} : obj 
        ));
        currBtn.style.backgroundColor = "var(--primary-color)";
      }else

      //Toggle same order of different row
      if(item.id !== currId && item.order === currBtn.value){
        var similarBtn = document.querySelectorAll(`[data-value="${currBtn.value}"]`);
        similarBtn.forEach((btn) => {
          btn.removeAttribute("style");
        });

        console.log("same order of different row");
        //remove previous order of different row
        setAssignEvaluator(assignEvaluator.map(obj => 
          obj.order === currBtn.value ? {...obj, id: currId} : obj
        ));

        // setAssignEvaluator(prevState => [...prevState, {id: currId, order: currBtn.value}]);
        currBtn.style.backgroundColor = "var(--primary-color)";
      }else

      //Toggle different order of different row
      if(item.id !== currId && item.order !== currBtn.value){
        // var similarBtn = document.querySelectorAll(`[data-value="${currBtn.value}"]`);
        similarBtn.forEach((btn) => {
          btn.removeAttribute("style");
        });
        console.log("different order of different row");

        setAssignEvaluator(prevState => [...prevState, {id: currId, order: currBtn.value}]);
        currBtn.style.backgroundColor = "var(--primary-color)";
      }else
      
      //Toggle same btn
      if(item.id === currId && item.order === currBtn.value){
        if(currBtn.style.backgroundColor === "var(--primary-color)"){
          console.log("Toggle same btn");
          currBtn.removeAttribute("style");
          setAssignEvaluator(assignEvaluator.filter(obj => obj.id !== currId));
        }
      }

    });

    //Assign evaluator to empty array
    if(Object.keys(assignEvaluator).length === 0){
      setAssignEvaluator(prevState => [...prevState, {id: currId, order: currBtn.value}]);
      currBtn.style.backgroundColor = "var(--primary-color)";
    }
  }

  const handleCourseChange = async(e) => {
    const courseValue = e.target.value;
    fetchClassrooms(courseValue);
    setCourseName(courseValue);
  }

  const fetchClassrooms = async(courseName) =>{
    try {
      const resp = await axios.post('/classroom',{courseName});
      const data = await resp?.data;
      setClassroomFilter(data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleClassroomChange = async(e) => {
    const classroomName = e.target.value;
    setSelectedClassroom(classroomName);
    try {
      const resp = await axios.post('/subjects',{courseName,classroomName});
      const data = await resp?.data;
      console.log(data);
      setSubjectFilter(data);
    } catch (error) {
        console.log(error);
    }
  }
  
  const handleSubjectChange = async(e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    console.log(subject);
    try {
      const resp = await axios.post('/bundlenumber',{classroomName:selectedClassroom,subject:selectedSubject});
      const data = await resp?.data;
      console.log(data);
      // setbundleFilter(data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="assignEvaluator-container">
      <Back top="1em" left="0" />

      <div className="assign-Filters">
        <div className="filter-list flex gap-2">
          <Filter
            data={filterCourses} 
            label="Filter By Course" 
            filter="course" 
            handleCourseChange={handleCourseChange}
          />

          <FormControl style={{width:"12em", top:"-0.1em"}} className="filterSearch-SelectInput">
              <InputLabel>Filter by Classroom</InputLabel>
              <Select
                label="Classroom"
                placeholder="Filter by Classroom" 
                defaultValue=""
                size="small"
                type="text"
                required
                fullWidth
                onChange={handleClassroomChange}
              >
                {classroomFilter.map((opt) => (
                  <MenuItem key={opt.name} value={opt.name}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          <Filter
            data={subjectFilter} 
            label="Filter By Subject" 
            filter="subject" 
            handleSubjectChange={handleSubjectChange}
          />
        </div>

        <button className="btn flex gap-sm">
          <FiCheck color="#fff" size={20} /> <span>Confirm</span>
        </button>
      </div>

      <table className="assignFaculty-table" border="0">
        <thead>
          <tr>
            <th></th>
            <th>Reg No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Evaluator Order</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((data) => {
            return (
              <tr key={data.faculty_id} className="assignFaculty-row">
                <td>
                </td>
                <td>{data.faculty_id}</td>
                <td>{data.first_name +" "+ data.last_name}</td>
                <td>{data.email}</td>
                <td>
                  <div className="EvaluatorOrder">
                    <button
                      value="1"
                      data-id={data.faculty_id}
                      data-value="1"
                      onClick={ActiveOrder}
                    >
                      1
                    </button>
                    <button
                      value="2"
                      data-id={data.faculty_id}
                      data-value="2"
                      onClick={ActiveOrder}
                    >
                      2
                    </button>
                    <button
                      value="3"
                      data-id={data.faculty_id}
                      data-value="3"
                      onClick={ActiveOrder}
                    >
                      3
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssignFaculty;
