import { useState, useRef } from "react";
import { BiX, BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const UserList = ({ data, type, updateEligibility, index, showEligible, showCheckbox, selectAll, HandleSelectedUser }) => {
  const [checked,setChecked] = useState(false);
  const [prevChecked,setPrevChecked] = useState(false);
  const checkBoxRef = useRef();

  let initial=false;
  const HandleCheck = (e) => {
    HandleSelectedUser(e,data);
    setChecked(prevState=> {
      initial=true;
      setPrevChecked(prevState);
     return !prevState
    });
  }

  const ischecked = selectAll;
  
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
  
  // console.log(selectAll);

  return (
    <tr className="users-table-row">
      {showCheckbox && <td className="CreateClass-UserCheckbox">
        {/* <Checkbox  defaultChecked={selectAll?selectAll:checked} onChange={HandleCheck}/> */}
        {/* <Checkbox value={data.regno} checked={selectAll?checked===false&&prevChecked?false:true:false} onChange={HandleCheck}/> */}
        {/* <Checkbox value={data.regno} checked={result} onChange={HandleCheck}/> */}
        {/* <Checkbox defaultChecked={selectAll} onChange={(e)=>HandleSelectedUser(e,data)}/> */}
      </td>}
      <td>{UserID.uid}</td>
      <td>{data.first_name +" "+ data.last_name}</td>
      {type!=="student" && <td>{data.email}</td>}
      {type==="student" && <td>{data.course_name}</td>}
      {type==="student" && <td>{data.joining_year}</td>}
      {type==="student" && <td>{data.semester}</td>}
      {showDOJ && <td>{data.joining_year}</td>}

      {type==="faculty" && <td >
        <Link className="users-facultySub" to={`./subjects/${UserID.uid}?name=${data.first_name}-${data.last_name}`} state={{name:data.first_name+' '+data.last_name, userId:UserID }} >
          View Subjects
        </Link>
      </td>}

      {showEligible && <td className="users-details">
        <Link to={`./${UserID.uid}`} state={{type:type, userId:UserID }} >
          View
        </Link>
      </td>}

      {type==="student" && showEligible && 
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

              <BiX className="users-notEligible" title="Set Not-Eligible" size={20} onClick={()=>{updateEligibility(index, false, data.regno);}}/>
            </div>
            }
        </td>}
    </tr>
  );
};

export default UserList;
