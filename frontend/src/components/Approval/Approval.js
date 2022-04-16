import React from 'react';
import {Link} from "react-router-dom";
import {Back,Avatar,Tick,Plus} from "../../Assets";
import "./Approval.css";

const Approval = () => {
  return (
    <div className="approval-main content">
    <div className="back-btn">
        <img src={Back} alt="Back" />
        <span className="back-btn-text">Back</span>
    </div>
    <h1 className="approve-list-header">Student Approval</h1>
    <table className="approve-list-wrapper">
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>Course</th>
        <th>Batch</th>
        <th>Details</th>
        <th>Approval</th>
      </tr>
        <tr className="approve-table-row">
          <td><img className="approve-list-avatar" src={Avatar} alt="Avatar"/></td>
          <td> Rajath</td>
          <td>BCA</td>
          <td>2019</td>
          <td><Link to="/approve/student/54674567">view</Link></td>
          <td>
          <button>
            <img src={Tick} alt="Tick" width={20} />
            Approve
          </button>
          <button>
          <img src={Plus} alt="Tick" width={30} />
            Reject
          </button>
          </td>
        </tr>
    </table>
</div>
  )
}

export default Approval;
