import { Link } from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";

const ApprovaList = ({name,regno,joiningYear,courseName,type,facultyId,staffId}) => {
  let linkAddress;
  if(type==='student') linkAddress=regno;
  else if(type==='faculty') linkAddress=facultyId;
  else linkAddress=staffId;
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
        <Link to={`/approve/${type}/${linkAddress}`}>View</Link>
      </td>
      <td className="flex approve-table-btn-wrapper">
        <button className="btn-outlined-green">Approve</button>
        <button className="btn-outlined-red">Reject</button>
      </td>
    </tr>
  );
};

export default ApprovaList;
