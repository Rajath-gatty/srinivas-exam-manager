import { Link } from "react-router-dom";
import { useContextData } from "../../../hooks/useContextData";

const ApprovaList = (props) => {
 const {name,regno,joiningYear,courseName,type,facultyId,staffId,imageUrl,handleApprove,handleReject} = props;

 const {serverUrl} = useContextData();
  let id;
  if(type==='student') id=regno;
  else if(type==='faculty') id=facultyId;
  else if(type==='staff') id=staffId;

  return (
    <tr className="approve-table-row">
      {type==='student'&&<td className="approve-avatar-wrapper">
      <img src={serverUrl+imageUrl} className="approval-profile-img" alt="" />
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
        <button onClick={()=> handleReject(id,imageUrl)}  className="btn-outlined-red">Reject</button>
      </td>
    </tr>
  );
};

export default ApprovaList;
