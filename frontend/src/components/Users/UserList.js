import { BiX, BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserList = ({ data, type, updateEligibility, index }) => {

  let eligible = data.eligibility;
  let UserID = "";
  if(type === "student")
    UserID = {uid:data.regno, idName:"regno"};
  else if(type === "faculty")
    UserID = {uid:data.faculty_id, idName:"faculty_id"};
  else if(type === "staff")
    UserID = {uid:data.staff_id, idName:"staff_id"};
  else 
    UserID = {uid:data.coord_id, idName:"coord_id"};

  let showDOJ = true;
  if(type!=="student" || type !=="exam_coord") showDOJ = false;
  
  return (
    <tr className="users-table-row">
      <td>{UserID.uid}</td>
      <td>{data.first_name +" "+ data.last_name}</td>
      {type!=="student" && <td>{data.email}</td>}
      {type==="student" && <td>{data.course_name}</td>}
      {type==="student" && <td>{data.joining_year}</td>}
      {type==="student" && <td>{data.semester}</td>}
      {showDOJ && <td>{data.joining_year}</td>}

      <td className="users-details">
        <Link to={`./${UserID.uid}`} state={{type:type, userId:UserID }} >
          View
        </Link>
      </td>

      {type==="student" && 
        <td className="flex"> 
          {!eligible ? 
              <div className="users-eligibleBtn flex" onClick={()=>{updateEligibility(index, true, data.regno);}}>
                <BiCheck size={20} />
                <span>Set Eligible</span>
              </div>
          :
            <div className="users-eligibleContainer flex">
              <div className="users-eligibleTxt flex">
                <BiCheck size={20} />
                <span>Eligible</span>
              </div>

              <BiX className="users-notEligible" size={20} onClick={()=>{updateEligibility(index, false, data.regno);}}/>
            </div>
            }
        </td>}
    </tr>
  );
};

export default UserList;
