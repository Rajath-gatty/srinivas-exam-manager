import { useEffect } from "react";

export const AssignFacultyList = (props) => {
  const { setEvaluatorOrder, info, occupied } = props;

  const ActiveOrder = (e) => {
    var evalOrder = e.target.textContent;
    var evalData = {
      order: evalOrder,
      user: info,
    };

    var orderBtn = e.target;

    //check if clicked btn is already active
    if (orderBtn.style.backgroundColor === "var(--primary-color)") {
      orderBtn.style.backgroundColor = "var(--light-grey)";
    } else {
      //remove all active btn to reassign new active btn
      var allBtn = e.target.parentElement.childNodes;
      allBtn.forEach((element) => {
        element.removeAttribute("style");
      });

      setEvaluatorOrder(evalData);
      orderBtn.style.backgroundColor = "var(--primary-color)";
    }
  };

  useEffect(() => {
    var dataBtns = document.querySelector(".EvaluatorOrder").childNodes;
    console.log(dataBtns);
    dataBtns.forEach((btn) => {
      var btnId = btn.getAttribute("data-id");
      var btnValue = btn.getAttribute("value");
      var btnStyle = btn.style.backgroundColor;

      //Give Parent EvaluatorOrder the data-Id attribute

      occupied.some((order) => {
        if (btnId !== order.orderReg && btnValue === order.orderObj) {
          btn.style.backgroundColor = "var(--primary-color)";
          // return;
        }
        // else if (btnId === order) {
        //   console.log("Found Dup");
        //   console.log("Disabling");
        //   btn.setAttribute("disabled", "true");
        //   btn.style.backgroundColor = "var(--strong-red)";
        // }
      });
    });
  }, [occupied]);

  return (
    <tr className="assignFaculty-row">
      <td>
        <div className="assignFaculty-avatar">
          <img src={info.profile} alt="Avatar" width="40px" height="40px" />
        </div>
      </td>
      <td>{info.regno}</td>
      <td>{info.name}</td>
      <td>{info.course}</td>
      <td>{info.semester}</td>
      <td>{info.bundle}</td>
      <td>
        <div className="EvaluatorOrder">
          <button data-id={info.regno} value="1" onClick={ActiveOrder}>
            1
          </button>
          <button data-id={info.regno} value="2" onClick={ActiveOrder}>
            2
          </button>
          <button data-id={info.regno} value="3" onClick={ActiveOrder}>
            3
          </button>
        </div>
      </td>
    </tr>
  );
};
