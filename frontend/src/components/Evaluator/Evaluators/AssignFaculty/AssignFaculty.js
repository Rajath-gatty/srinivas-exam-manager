import { useState } from "react";
import "./AssignFaculty.css";
import { FiCheck } from "react-icons/fi";
import Back from "../../../UI/Back/Back";
import SelectInput from "../../../UI/SelectInput";
import { AssignFacultyList } from "./AssignFacultyList";

const AssignFaculty = () => {
  var CourseValues = ["BCA", "MCA", "BBA", "MBA", "BCom", "MCom"];
  var SemValues = ["I Sem", "II Sem", "III Sem", "IV Sem", "V Sem"];
  var BundleValues = ["19BCA1001", "19BCA1002", "19BCA1003", "19BCA1004"];

  const [evaluatorOrder, setEvaluatorOrder] = useState("");
  const [assignEvaluator, setAssignEvaluator] = useState([]);

  console.log("YO" + evaluatorOrder);

  return (
    <div className="assignEvaluator-container">
      <Back />

      <div className="assign-Filters">
        <SelectInput label="Select Course" options={CourseValues} />
        <SelectInput label="Select Semester" options={SemValues} />
        <SelectInput label="Select Bundle" options={BundleValues} />

        <button className="assign-confirm">
          <FiCheck color="#fff" size={20} /> <span>Confirm</span>
        </button>
      </div>

      <table className="assignFaculty-table" border="0">
        <thead>
          <tr>
            <th></th>
            <th>Reg No.</th>
            <th>Name</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Bundle</th>
            <th>Evaluator Order</th>
          </tr>
        </thead>
        <tbody>
          <AssignFacultyList setEvaluatorOrder={setEvaluatorOrder} />
          <AssignFacultyList setEvaluatorOrder={setEvaluatorOrder} />
          <AssignFacultyList setEvaluatorOrder={setEvaluatorOrder} />
          <AssignFacultyList setEvaluatorOrder={setEvaluatorOrder} />
        </tbody>
      </table>
    </div>
  );
};

export default AssignFaculty;
