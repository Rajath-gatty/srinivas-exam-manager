import { BiX, BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = ({ data, type }) => {
  const eligible = data.eligibility;
  // const eligibility = eligible ? "eligible flex" : "not-eligible flex";
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

  const HandleEligible = async () =>{
    const regId = data.regno;
    try {
      const result = await axios.post('/staff/eligibility',{regno:regId, eligibility:1});
      console.log(result.data);
    } catch(err) {
      console.log(err);
    }
  }
  
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
        <td>
          {!eligible ? 
              <div className="users-eligibleBtn flex" onClick={HandleEligible}>
                <BiCheck size={20} />
                <span>Set Eligible</span>
              </div>
          :
            <div className="users-eligibleTxt flex">
              <BiCheck size={20} />
              <span>Eligible</span>
            </div>}

            {/* <div className="users-eligibilityBtn flex">
              
              <div className="notEligibleBtn flex">
                <BiX size={20} />
                <span>Not Eligible</span>
              </div>
            </div> */}

            {/* <div className={eligibility}>
              {!eligible? <BiX size={20} /> : <BiCheck size={20} />}
              <span>{!eligible? "Not Eligible" : "Eligible"}</span>
            </div>} */}
        </td>}
    </tr>
  );
};

export default UserList;
