import { useState, useEffect } from "react";
import "./AssignFaculty.css";
import { FiCheck } from "react-icons/fi";
import Back from "../../../UI/Back/Back";
import SelectInput from "../../../UI/SelectInput";
import { AssignFacultyList } from "./AssignFacultyList";

const AssignFaculty = () => {
  var CourseValues = ["BCA", "MCA", "BBA", "MBA", "BCom", "MCom"];
  var SemValues = ["I Sem", "II Sem", "III Sem", "IV Sem", "V Sem"];
  var BundleValues = ["19BCA1001", "19BCA1002", "19BCA1003", "19BCA1004"];

  var userData = [
    {
      profile:
        "https://images.unsplash.com/photo-1649937479025-fc25252bb7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAwNTB8MHwxfHNlYXJjaHwxN3x8YW5pbWV8ZW58MHwyfHx8MTY1MzU5MzI1MA&ixlib=rb-1.2.1&q=80&w=400&fm=webp",
      regno: "3SU19SA011",
      name: "John Doe",
      course: "BCA",
      semester: "V Sem",
      bundle: "19BCA1001",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1649937479025-fc25252bb7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAwNTB8MHwxfHNlYXJjaHwxN3x8YW5pbWV8ZW58MHwyfHx8MTY1MzU5MzI1MA&ixlib=rb-1.2.1&q=80&w=400&fm=webp",
      regno: "3SU19SA012",
      name: "John Doe",
      course: "BCA",
      semester: "V Sem",
      bundle: "19BCA1001",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1649937479025-fc25252bb7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAwNTB8MHwxfHNlYXJjaHwxN3x8YW5pbWV8ZW58MHwyfHx8MTY1MzU5MzI1MA&ixlib=rb-1.2.1&q=80&w=400&fm=webp",
      regno: "3SU19SA013",
      name: "John Doe",
      course: "BCA",
      semester: "V Sem",
      bundle: "19BCA1001",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1649937479025-fc25252bb7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAwNTB8MHwxfHNlYXJjaHwxN3x8YW5pbWV8ZW58MHwyfHx8MTY1MzU5MzI1MA&ixlib=rb-1.2.1&q=80&w=400&fm=webp",
      regno: "3SU19SA014",
      name: "John Doe",
      course: "BCA",
      semester: "V Sem",
      bundle: "19BCA1001",
    },
  ];

  // var EvaluatorList = [
  //   {
  //     BCA: [],
  //     MCA: [],
  //     BBA: [],
  //     MBA: [],
  //     BCom: [],
  //     MCom: [],
  //   },
  // ];

  const [evaluatorOrder, setEvaluatorOrder] = useState({});
  const [assignEvaluator, setAssignEvaluator] = useState([]);

  useEffect(() => {
    if (Object.keys(evaluatorOrder).length !== 0) {
      var duplicateFlag = 0;

      //Checking & Updating existing faculty order
      assignEvaluator.some((obj) => {
        if (obj.user.regno === evaluatorOrder.user.regno) {
          duplicateFlag = 1;
          obj.order = evaluatorOrder.order;
          return;
        }
      });

      //Checking if Max 3 orders are occupied
      assignEvaluator.some((obj) => {
        //Checking & Updating existing faculty order
        if (obj.user.regno === evaluatorOrder.user.regno) {
          duplicateFlag = 1;
          obj.order = evaluatorOrder.order;
          return;
        }
      });

      if (duplicateFlag === 0) {
        setAssignEvaluator((prevState) => [...prevState, evaluatorOrder]);
      }
    }

    console.table(assignEvaluator);
    FilterOccupiedBtn();
  }, [evaluatorOrder, assignEvaluator]);

  // Occupied btn no. sent to AssignFacultyList
  var occupied = [];
  const FilterOccupiedBtn = () => {
    assignEvaluator.forEach((obj) => {
      var orderObj = obj.order;
      var orderReg = obj.user.regno;
      occupied.push({ orderObj, orderReg });
    });
  };

  console.log(occupied);
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
          {userData.map((data) => {
            return (
              <AssignFacultyList
                setEvaluatorOrder={setEvaluatorOrder}
                info={data}
                key={data.regno}
                occupied={occupied}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssignFaculty;
