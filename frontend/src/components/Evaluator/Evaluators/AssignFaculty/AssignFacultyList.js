export const AssignFacultyList = (props) => {
  const { setEvaluatorOrder, info } = props;

  const ActiveOrder = (e) => {
    var evalOrder = e.target.textContent;
    var evalData = {
      order: evalOrder,
      user: info,
    };
    setEvaluatorOrder(evalData);

    //remove all active btn
    var allBtn = e.target.parentElement.childNodes;
    allBtn.forEach((element) => {
      element.removeAttribute("style");
    });

    //set current btn active
    var orderBtn = e.target;
    orderBtn.style.backgroundColor = "var(--primary-color)";
  };

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
          <button onClick={ActiveOrder}>1</button>
          <button onClick={ActiveOrder}>2</button>
          <button onClick={ActiveOrder}>3</button>
        </div>
      </td>
    </tr>
  );
};
