import { AiOutlineMinusCircle } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { TextField } from "@mui/material";
import { useState, useRef } from "react";

const SemList = (props) => {
  const [subjects, setSubjects] = useState({
    index: props.index,
    subjects: [],
  });

  const subjectNameRef = useRef();
  const subjectCodeRef = useRef();

  const addSubjects = (e) => {
    e.preventDefault();
    const subjectName = subjectNameRef.current.children[1].children[0].value;
    const subjectCode = subjectCodeRef.current.children[1].children[0].value;

    if (subjectName !== "" && subjectCode !== "") {
      setSubjects((prevState) => {
        const newArr = { ...prevState };
        newArr.subjects.push({ name: subjectName, code: subjectCode });
        return newArr;
      });
    }

    props.addSubjectsToReducer(subjects);
  };
  // console.log(subjects);

  return (
    <div className="semester">
      <div className="semester-header">
        <h3 className="sem-text">{props.details.semName}</h3>
        <AiOutlineMinusCircle
          onClick={() => props.removeSem(props.index)}
          className="remove-svg"
          size={20}
          color="var(--strong-red)"
        />
      </div>
      <div className="subject-details-wrapper flex">
        <TextField
          label="Subject Name"
          variant="standard"
          size="small"
          className="subject-input"
          fullWidth
          ref={subjectNameRef}
        />
        <TextField
          label="Subject code"
          variant="standard"
          size="small"
          className="subject-input"
          fullWidth
          ref={subjectCodeRef}
        />
        <button
          className="add-subject-btn btn-outlined flex"
          onClick={(e) => addSubjects(e)}
        >
          <HiPlus size={20} />
          <span>Add</span>
        </button>
      </div>
      <div className="subject-info-main">
        {props.details.subjects.map((sub, subIndex) => {
          return (
            <div key={subIndex} className="subject-info-wrapper flex">
              <div className="subject-info flex">
                <h3>{sub.name}</h3>
                <p>{sub.code}</p>
              </div>
              <HiPlus
                className="close-svg"
                color="var(--strong-red)"
                size={20}
                onClick={() => props.removeSubject(subIndex, props.index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemList;
