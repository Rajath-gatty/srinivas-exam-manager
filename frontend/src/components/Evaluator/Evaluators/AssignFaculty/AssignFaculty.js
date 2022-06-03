import { useState, useEffect } from "react";
import "./AssignFaculty.css";
import { FiCheck } from "react-icons/fi";
import Back from "../../../UI/Back/Back";
import SelectInput from "../../../UI/SelectInput";
// import { AssignFacultyList } from "./AssignFacultyList";

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

  const [assignEvaluator, setAssignEvaluator] = useState([]);

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
      }

      //Toggle same order of different row
      if(item.id !== currId && item.order === currBtn.value){
        var similarBtn = document.querySelectorAll("[data-value=" + '"' + currBtn.value + `"` + "]");
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
      }

      //Toggle different order of different row
      if(item.id !== currId && item.order !== currBtn.value){
        var similarBtn = document.querySelectorAll("[data-value=" + '"' + currBtn.value + `"` + "]");
        similarBtn.forEach((btn) => {
          btn.removeAttribute("style");
        });
        console.log("different order of different row");

        setAssignEvaluator(prevState => [...prevState, {id: currId, order: currBtn.value}]);
        currBtn.style.backgroundColor = "var(--primary-color)";
      }

      //Toggle same btn
      if(item.id === currId && item.order === currBtn.value){
        if(currBtn.style.backgroundColor === "var(--primary-color)"){
          currBtn.removeAttribute("style");
        }
        else{
        console.log("Toggle same btn");
        setAssignEvaluator(assignEvaluator.filter(obj => obj.id !== currId));
          currBtn.style.backgroundColor = "var(--primary-color)";
        }
      }

    });

    //Assign evaluator to empty array
    if(Object.keys(assignEvaluator).length === 0){
      setAssignEvaluator(prevState => [...prevState, {id: currId, order: currBtn.value}]);
      currBtn.style.backgroundColor = "var(--primary-color)";
    }
  }
  console.table(assignEvaluator);


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
              <tr key={data.regno} className="assignFaculty-row">
                <td>
                  <div className="assignFaculty-avatar">
                    <img
                      src={data.profile}
                      alt="Avatar"
                      width="40px"
                      height="40px"
                    />
                  </div>
                </td>
                <td>{data.regno}</td>
                <td>{data.name}</td>
                <td>{data.course}</td>
                <td>{data.semester}</td>
                <td>{data.bundle}</td>
                <td>
                  <div className="EvaluatorOrder">
                    <button
                      value="1"
                      data-id={data.regno}
                      data-value="1"
                      onClick={ActiveOrder}
                    >
                      1
                    </button>
                    <button
                      value="2"
                      data-id={data.regno}
                      data-value="2"
                      onClick={ActiveOrder}
                    >
                      2
                    </button>
                    <button
                      value="3"
                      data-id={data.regno}
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
