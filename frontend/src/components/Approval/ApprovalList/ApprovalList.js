import { Link } from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";

const ApprovaList = (props) => {
 const {name,regno,joiningYear,courseName,type,facultyId,staffId,handleApprove,handleReject} = props;
  let id;
  if(type==='student') id=regno;
  else if(type==='faculty') id=facultyId;
  else id=staffId;

  return (
    <tr className="approve-table-row">
      {type==='student'&&<td className="approve-avatar-wrapper">
      <FaUserCircle color="var(--light-grey)" size={30}/>
      </td>}
      <td>{name}</td>
      {type==='student'&&<td>{regno}</td>}
      {type==='student'&&<td>{courseName}</td>}
      <td>{joiningYear}</td>
      <td>
        <Link to={`/approve/${type}/${id}?type=${type}`}>View</Link>
      </td>
      <td className="flex approve-table-btn-wrapper">
        <button onClick={()=> handleApprove(id)} className="btn-outlined-green">Approve</button>
        <button onClick={()=> handleReject(id)}  className="btn-outlined-red">Reject</button>
      </td>
    </tr>
  );
};

export default ApprovaList;
