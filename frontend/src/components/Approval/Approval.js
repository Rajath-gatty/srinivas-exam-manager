import React from 'react';
import ApprovaList from './ApprovalList/ApprovalList';
import "./Approval.css";

const Approval = () => {
  return (
    <div className="approval-main content">
    {/* <div className="back-btn">
        <img src={Back} alt="Back" />
        <span className="back-btn-text">Back</span>
    </div> */}
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
      <ApprovaList/>
      <ApprovaList/>
      <ApprovaList/>
      <ApprovaList/>
      <ApprovaList/>
      <ApprovaList/>
    </table>
</div>
  )
}

export default Approval;
