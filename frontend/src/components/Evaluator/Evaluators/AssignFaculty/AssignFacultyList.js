export const AssignFacultyList = (props) => {
  const { setEvaluatorOrder } = props;

  const ActiveOrder = (e) => {
    var orderBtn = e.target;
    var evalOrder = e.target.textContent;
    setEvaluatorOrder(evalOrder);
    orderBtn.style.backgroundColor = "var(--primary-color)";
  };

  return (
    <tr className="assignFaculty-row">
      <td>
        <div className="assignFaculty-avatar">
          <img
            src="https://images.unsplash.com/photo-1649937479025-fc25252bb7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAwNTB8MHwxfHNlYXJjaHwxN3x8YW5pbWV8ZW58MHwyfHx8MTY1MzU5MzI1MA&ixlib=rb-1.2.1&q=80&w=400&fm=webp"
            alt="Avatar"
            width="40px"
            height="40px"
          />
        </div>
      </td>
      <td>3SU19SA011</td>
      <td>John Doe</td>
      <td>BCA</td>
      <td>V Sem</td>
      <td>19BCA1001</td>
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
