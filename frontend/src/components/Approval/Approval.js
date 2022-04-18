import ApprovaList from './ApprovalList/ApprovalList';
import "./Approval.css";

const Approval = () => {
  return (
    <div className="approval-main content">
      <h1 className="approve-list-header">Student Approval</h1>
      <table className="approve-list-wrapper">
        <thead className="thead">
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Course</th>
          <th>Batch</th>
          <th>Details</th>
          <th>Approval</th>
        </tr>
        </thead>
        <tbody>
        <ApprovaList/>
        <ApprovaList/>
        <ApprovaList/>
        <ApprovaList/>
        <ApprovaList/>
        <ApprovaList/>
        </tbody>
      </table>
    </div>
  )
}

export default Approval;
