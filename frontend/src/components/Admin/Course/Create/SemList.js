import { AiOutlineMinusCircle } from "react-icons/ai";
import { HiMinus,HiPlus } from "react-icons/hi";
import { TextField } from "@mui/material";
import { useState, useRef } from "react";
import {toast} from "react-toastify";

const SemList = (props) => {
  const [subjects, setSubjects] = useState({
    index: props.index,
    subjects: [],
  });

  const subjectNameRef = useRef();
  const subjectCodeRef = useRef();
  const IaRef = useRef();
  const creditsRef = useRef();

  const addSubjects = (e) => {
    e.preventDefault();
    const Ia = IaRef.current.value;
    const credits = creditsRef.current.value;
    const subjectName = subjectNameRef.current.value;
    const subjectCode = subjectCodeRef.current.value;

    if (subjectName !== "" && subjectCode !== "" && Ia !== "" && credits !== "") {
      setSubjects((prevState) => {
        const newArr = { ...prevState };
        newArr.subjects.push({ name: subjectName, code: subjectCode, ia:Ia, credits:credits });
        return newArr;
      });
      props.addSubjectsToReducer(subjects);
    } else {
      toast.warn('Please Fill all the Fields',{
        toastId:"sem-id"
      });
    }
  };
  return (
    <div className="semester">
      <div className="semester-header">
        <h3 className="sem-text">SEM {props.details.semName}</h3>
        <AiOutlineMinusCircle
          onClick={() => props.removeSem(props.index)}
          className="remove-svg"
          size={20}
          color="var(--strong-red)"
        />
      </div>
      <div className="subject-details-wrapper">
        <TextField
          label="Subject Name"
          variant="standard"
          size="small"
          className="subject-input"
          fullWidth
          inputRef={subjectNameRef}
        />
        <TextField
          label="Subject code"
          variant="standard"
          size="small"
          className="subject-input"
          fullWidth
          inputRef={subjectCodeRef}
        />
        <TextField
          label="I/A"
          variant="standard"
          size="small"
          type="number"
          className="subject-input"
          fullWidth
          inputRef={IaRef}
        />
        <TextField
          label="Credits"
          variant="standard"
          size="small"
          className="subject-input"
          type="number"
          fullWidth
          inputRef={creditsRef}
        />
        <button
          className=" btn-outlined-green flex"
          onClick={(e) => addSubjects(e)}
        >
          <HiPlus size={20} />
          <span>Add</span>
        </button>
      </div>
      <div className="subject-info-main">
        {props.details.subjects.length>0&&<table className="course-list-table course-subject-list">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>I/A</th>
                <th>Total credits</th>
              </tr>
            </thead>
            <tbody>

        {props.details.subjects.map((sub, subIndex) => {
          return (
            <tr key={subIndex} className="course-subject-list-row">
            <td>{sub.name}</td>
            <td>{sub.code}</td>
            <td>{sub.ia}</td>
            <td>{sub.credits}</td>
            <td className="course-subject-list-row-border"><HiMinus
                className="close-svg"
                color="var(--strong-red)"
                size={20}
                onClick={() => props.removeSubject(subIndex, props.index)}
              /></td>
          </tr>
          );
        })}
            </tbody>
        </table>}
      </div>
    </div>
  );
};

export default SemList;
