import "./Departments.css";
import { GoSettings } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

const depts = [
  {
    dptId: "SU19BCA",
    dptName: "CCIS",
    dptAdmin: "Jhon",
    dptReg: "19-09-2022",
  },
  {
    dptId: "SU19BCA",
    dptName: "CCIS",
    dptAdmin: "Jhon",
    dptReg: "19-09-2022",
  },
  {
    dptId: "SU19BCA",
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

        <button className="create-department flex">
          <HiPlus size={20} color="var(--primary-color) :hover{color:var(--white)}" />
          <span>Create Department</span>
        </button>
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
              <tr>
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