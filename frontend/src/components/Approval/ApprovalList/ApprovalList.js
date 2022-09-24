import { Link } from "react-router-dom";
// import { useContextData } from "../../../hooks/useContextData";

const ApprovaList = (props) => {
 const {name,regno,joiningYear,courseName,type,facultyId,staffId,imageUrl,handleApprove,handleReject} = props;

//  const {serverUrl} = useContextData();

  let UserID = "";
  if(type === "student")
    UserID = {uid:regno, idName:"regno"};
  else if(type === "faculty")
    UserID = {uid:facultyId, idName:"faculty_id"};
  else if(type === "staff")
    UserID = {uid:staffId, idName:"staff_id"};

  return (
    <tr className="approve-table-row">
      {type==='student'&&<td className="approve-avatar-wrapper">
      <img src={imageUrl} className="approval-profile-img" alt="profile" width="40px" height="40px"/>
      </td>}
      <td>{name}</td>
      {type==='student'&&<td>{UserID.uid}</td>}
      {type==='student'&&<td>{courseName}</td>}
      <td>{joiningYear}</td> 
      <td>
        <Link to={`/approve/${type}/${UserID.uid}`} state={{type:type, userId:UserID }}>View</Link>
      </td>
      <td className="flex approve-table-btn-wrapper">
        <button onClick={()=> handleApprove(UserID.uid)} className="btn-outlined-green">Approve</button>
        <button onClick={()=> handleReject(UserID.uid,imageUrl)}  className="btn-outlined-red">Reject</button>
      </td>
    </tr>
  );
};

export default ApprovaList;
