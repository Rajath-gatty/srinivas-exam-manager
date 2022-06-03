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

  const [evaluatorOrder, setEvaluatorOrder] = useState({});
  const [assignEvaluator, setAssignEvaluator] = useState([]);

  useEffect(() => {
    if (Object.keys(evaluatorOrder).length !== 0) {
      var duplicateFlag = 0;

      //Checking & Updating existing faculty order
      assignEvaluator.some((obj) => {
        if (obj.evalReg === evaluatorOrder.evalReg) {
          duplicateFlag = 1;
          obj.evalOrder = evaluatorOrder.evalOrder;
          return;
        }
      });

      if (duplicateFlag === 0) {
        setAssignEvaluator((prevState) => [...prevState, evaluatorOrder]);
      }
    }

    // console.log(updatedEvaluator.length);
    // if (updatedEvaluator.length > 0) {
    //   setAssignEvaluator(updatedEvaluator);
    //   console.log(updatedEvaluator.length);
    //   // updatedEvaluator = [];
    // }

    console.table(assignEvaluator);
    FilterOccupiedBtn();
  }, [evaluatorOrder, assignEvaluator]);

  // Occupied btn no. sent to AssignFacultyList
  var occupied = [];
  var orderObj;
  var orderReg;
  const FilterOccupiedBtn = () => {
    assignEvaluator.forEach((obj) => {
      orderObj = obj.evalOrder;
      orderReg = obj.evalReg;
      occupied.push({ orderObj, orderReg });
    });
  };

  const ActiveOrder = (e) => {
    var currBtn = e.target;
    var parentBtn = e.target.parentElement;

    var evalOrder = currBtn.value;
    var evalReg = currBtn.getAttribute("data-id");
    // var evalReg = parentBtn.getAttribute("data-id");

    // if (currBtn.style.backgroundColor === "var(--primary-color)") {
    //   currBtn.style.backgroundColor = "var(--light-grey)";

    //   //Delete toggled off Objects
    //   // assignEvaluator.forEach((obj) => {
    //   //   if (obj.evalReg === evalReg) {
    //   //     var UpdatedArr = assignEvaluator.filter(
    //   //       (rm) => rm.evalReg !== evalReg
    //   //     );
    //   //     console.table("---", UpdatedArr);
    //   //     setUpdatedEvaluator(UpdatedArr);
    //   //     // setAssignEvaluator(UpdatedArr);
    //   //   }
    //   // });
    // } else {
    // var btnGroup = parentBtn.childNodes;
    // btnGroup.forEach((element) => {
    //   element.removeAttribute("style");
    // });

    setEvaluatorOrder({ evalOrder, evalReg });
    currBtn.style.backgroundColor = "var(--primary-color)";
    // }

    //Column duplicate check
    var btnOne = document.querySelectorAll("[value='1']");
    var btnTwo = document.querySelectorAll("[value='2']");
    var btnThree = document.querySelectorAll("[value='3']");

    btnOne.forEach((btn) => {
      console.log(btn);
      var checkStyle = btn.style.backgroundColor;
      var checkReg = btn.getAttribute("[data-id]");

      occupied.forEach((obj) => {
        if (
          checkReg === obj.orderReg &&
          checkStyle === "var(--primary-color)"
        ) {
          //Toggle off selected btn
          btn.removeAttribute("style");
          //data is still not deleted from array
        } else if (
          checkReg !== obj.orderReg &&
          evalOrder === "1" &&
          checkStyle === ""
        ) {
          btnOne.forEach((element) => {
            console.log("eleValue");
            element.removeAttribute("style");
          });
        }
        console.log(checkStyle.length);
      });
    });

    btnTwo.forEach((btn) => {
      console.log(btn);
      var checkStyle = btn.style.backgroundColor;
      var checkReg = btn.getAttribute("[data-id]");

      occupied.forEach((obj) => {
        if (
          checkReg === obj.orderReg &&
          checkStyle === "var(--primary-color)"
        ) {
          //Toggle off selected btn
          btn.removeAttribute("style");
          //data is still not deleted from array
        } else if (
          checkReg !== obj.orderReg &&
          evalOrder === "1" &&
          checkStyle === ""
        ) {
          btnTwo.forEach((element) => {
            console.log("eleValue");
            element.removeAttribute("style");
          });
        }
        console.log(checkStyle.length);
      });
    });

    btnThree.forEach((btn) => {
      console.log(btn);
      var checkStyle = btn.style.backgroundColor;
      var checkReg = btn.getAttribute("[data-id]");

      occupied.forEach((obj) => {
        if (
          checkReg === obj.orderReg &&
          checkStyle === "var(--primary-color)"
        ) {
          //Toggle off selected btn
          btn.removeAttribute("style");
          //data is still not deleted from array
        } else if (
          checkReg !== obj.orderReg &&
          evalOrder === "1" &&
          checkStyle === ""
        ) {
          btnThree.forEach((element) => {
            console.log("eleValue");
            element.removeAttribute("style");
          });
        }
        console.log(checkStyle.length);
      });
    });

    setEvaluatorOrder({ evalOrder, evalReg });
    currBtn.style.backgroundColor = "var(--primary-color)";

    // //Column duplicate check
    // console.log("Goin Here");
    // if (orderObj === evalOrder && orderReg !== evalReg) {
    //   console.log("Got Duplicate");
    // }
  };

  // console.log(occupied);
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
                      onClick={ActiveOrder}
                    >
                      1
                    </button>
                    <button
                      value="2"
                      data-id={data.regno}
                      onClick={ActiveOrder}
                    >
                      2
                    </button>
                    <button
                      value="3"
                      data-id={data.regno}
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
