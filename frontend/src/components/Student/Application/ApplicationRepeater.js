import { useState,useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import "./Application.css";
import { Link } from "react-router-dom";
import { useContextData } from "../../../hooks/useContextData";
import axios from "axios";

const ApplicationRepeater = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [loading,setLoading] = useState(true);
  const [subjects,setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const {user} = useContextData();
  const semesterArr = new Array(user.semester).fill('');

  const AddSubject = (e) => {
    const CheckFlag = e.target.checked;
    const SubjectName = e.target.value;

    if (CheckFlag) {
      setSelectedSubject([...selectedSubject, SubjectName]);
    } else {
      setSelectedSubject(selectedSubject.filter((e) => e !== SubjectName));
    }
  };
  const TotalFee = 200 * selectedSubject.length;

  useEffect(() => {
    const fetchSubjects = async() => {
      try {
        const data = {
          courseId:user.courseId,
          semester:selectedSemester
        }
        const result = await axios.post('/student/application/subjects',data);
        setSubjects(result.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchSubjects();
  },[selectedSemester])


  const handleSemesterChange = async(e) => {
    setSelectedSemester(e.target.value);
    const data = {
      courseId:user.courseId,
      semester:e.target.value
    }
    try {
      const result = await axios.post('/student/application/repeater/subjects',data);
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="application-repeater flex">
      <div className="application-repeater-header">
      <h2>Choose Repeater Semester</h2>
      <div className="application-selector flex">
        <FormControl className="select-sem">
          <InputLabel>Select Semester</InputLabel>
          <Select
            label="Department"
            defaultValue=""
            size="small"
            onChange={handleSemesterChange}
          >
            {semesterArr.map((_,i) => {
              return <MenuItem key={i} value={i+1}>{i+1}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      </div>
      <div className="application-semester">
        {selectedSemester ? 'SEM '+selectedSemester : "Select Semester"}
      </div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        {subjects.map((sub => {
          return <div key={sub.subj_code} className="application-row">
          <div className="subject-checkbox">
            <Checkbox value={sub.subj_name} onChange={AddSubject} /> <span>{sub.subj_name}</span>
          </div>
          <span>{sub.subj_code}</span>
        </div>
        }))}
      </div>

      {selectedSubject.length !== 0 ? (
        <div className="selected-subjects">
          <div className="selected-subject-header flex">
            <span>Repeater Subjects</span>
            <span>Fees</span>
          </div>

          {selectedSubject.map((subject) => {
            return (
              <div key={subject} className="selected-subject-list">
                <span>{subject}</span>
                <span>Rs.200</span>
              </div>
            );
          })}

          <div className="application-total">
            <span>Total Amount</span> <span>Rs.{TotalFee}</span>
          </div>
          <Link to="/application/repeater/payment">
            <button className="application-submit">Apply</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ApplicationRepeater;
