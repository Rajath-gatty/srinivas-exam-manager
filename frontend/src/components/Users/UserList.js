import { BiX, BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserList = ({ data, type }) => {
  const eligible = data.eligibility;
  const eligibility = eligible ? "eligible flex" : "not-eligible flex";
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

      {!eligible ? 
        <td className={eligibility}>
          <BiX size={20} />
          <span>Not Eligible</span>
        </td>
        :
        <td className={eligibility}>
          <BiCheck size={20} />
          <span>Eligible</span>
        </td>}
    </tr>
  );
};

export default UserList;
