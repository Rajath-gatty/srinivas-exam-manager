import "./Departments.css";
import { GoSettings } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const depts = [
  {
    dptId: "SU19BCA01",
    dptName: "CCIS",
    dptAdmin: "Jhon",
    dptReg: "19-09-2022",
  },
  {
    dptId: "SU19BCA02",
    dptName: "CCIS",
    dptAdmin: "Jhon",
    dptReg: "19-09-2022",
  },
  {
    dptId: "SU19BCA03",
    dptName: "CCIS",
    dptAdmin: "Jhon",
    dptReg: "19-09-2022",
  }
]

const Departments = () => {
  return (
    <div className="departments-container">
      <div className="departments-header">
        <form className="departments-form flex">
          <FaSearch color="var(--light-grey)" size={20} />
          <input type="text" placeholder="Search" />
        </form>

       <Link to="/departments/create">
        <button className="create-department flex">
            <HiPlus size={20} color="var(--primary-color) :hover{color:var(--white)}" />
            <span>Create Department</span>
        </button>
       </Link>
      </div>

      <table className="departments-list">
        <thead>
          <tr>
            <th>Department</th>
            <th>Department ID</th>
            <th>Admin</th>
            <th>Registration Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {depts.map(item =>{
            return(
              <tr key={item.dptId}>
                <td>{item.dptName}</td>
                <td>{item.dptId}</td>
                <td>{item.dptAdmin}</td>
                <td>{item.dptReg}</td>
                <td>
                  <div className="manage-dpt flex">
                    <GoSettings color="var(--primary-color)" size={20} />
                    <span>Manage</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Departments;