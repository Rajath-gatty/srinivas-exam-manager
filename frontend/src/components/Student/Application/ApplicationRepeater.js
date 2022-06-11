import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import "./Application.css";
import { Link } from "react-router-dom";

const ApplicationRepeater = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState([]);

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

  return (
    <div className="application-repeater flex">
      <h2>Choose Repeater Semester</h2>
      <div className="application-selector flex">
        <FormControl className="select-sem">
          <InputLabel>Select Semester</InputLabel>
          <Select
            label="Department"
            defaultValue=""
            size="small"
            onChange={(e) => {
              setSelectedSemester(e.target.value);
            }}
          >
            <MenuItem value="SEM I">I Semester</MenuItem>
            <MenuItem value="SEM II">II Semester</MenuItem>
            <MenuItem value="SEM III">III Semester</MenuItem>
            <MenuItem value="SEM IV">IV Semester</MenuItem>
            <MenuItem value="SEM V">V Semester</MenuItem>
            <MenuItem value="SEM VI">VI Semester</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="application-semester">
        {selectedSemester ? selectedSemester : "Select Semester"}
      </div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="HTML" onChange={AddSubject} /> <span>HTML</span>
          </div>
          <span>19BCASD55</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="CSS" onChange={AddSubject} /> <span>CSS</span>
          </div>
          <span>19BCASD56</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="React" onChange={AddSubject} /> <span>React</span>
          </div>
          <span>19BCASD57</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="Node.js" onChange={AddSubject} />
            <span>Node.js</span>
          </div>
          <span>19BCASD58</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="OS" onChange={AddSubject} /> <span>OS</span>
          </div>
          <span>19BCASD59</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="AI" onChange={AddSubject} /> <span>AI</span>
          </div>
          <span>19BCASD60</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="SE" onChange={AddSubject} /> <span>SE</span>
          </div>
          <span>19BCASD61</span>
        </div>
        <div className="application-row">
          <div className="subject-checkbox">
            <Checkbox value="Java" onChange={AddSubject} /> <span>Java</span>
          </div>
          <span>19BCASD62</span>
        </div>
      </div>

      {selectedSubject.length !== 0 ? (
        <div className="selected-subjects flex">
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
