import "./ExamCoordinator.css";
import { GoSettings } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const userData = [
    {
      coordName: "Jhon",
      coordId: "3SU19SA011",
      dptId: "SU19BCA01",
      dptName: "CCIS",
    },
    {
      coordName: "Jhon",
      coordId: "3SU19SA012",
      dptId: "SU19BCA01",
      dptName: "CCIS",
    },
    {
      coordName: "Jhon",
      coordId: "3SU19SA013",
      dptId: "SU19BCA01",
      dptName: "CCIS",
    },
    {
      coordName: "Jhon",
      coordId: "3SU19SA014",
      dptId: "SU19BCA01",
      dptName: "CCIS",
    },
  ]

const Examcoordinator = () => {
  return (
    <div className="departments-container">
      <div className="departments-header">
        <form className="departments-form flex">
          <FaSearch color="var(--light-grey)" size={20} />
          <input type="text" placeholder="Search" />
        </form>

       <Link to="/examcoordinator/create">
        <button className="create-department flex">
            <HiPlus size={20} color="var(--primary-color) :hover{color:var(--white)}" />
            <span>Add Coordinator</span>
        </button>
       </Link>
      </div>

      <table className="departments-list">
        <thead>
          <tr>
            <th>Coordinator Name</th>
            <th>Coordinator ID</th>
            <th>Department</th>
            <th>Department ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userData.map(item =>{
            return(
              <tr key={item.coordId}>
                <td>{item.coordName}</td>
                <td>{item.coordId}</td>
                <td>{item.dptName}</td>
                <td>{item.dptId}</td>
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

export default Examcoordinator