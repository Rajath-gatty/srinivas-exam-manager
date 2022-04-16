import {Link} from "react-router-dom";
import {Avatar} from "../../../Assets";

const ApprovaList = () => {
return(
        <tr className="approve-table-row">
          <td className="approve-avatar-wrapper">
            <img className="approve-list-avatar" src={Avatar} width="20px" alt="Avatar"/>
          </td>
          <td> John</td>
          <td>BCA</td>
          <td>2019</td>
          <td><Link to="/approve/student/54674567">view</Link></td>
          <td className="flex approve-table-btn-wrapper">
          <button className="btn-outlined-green">
            {/* <img src={Tick} alt="Tick" width={20} /> */}
            Approve
          </button>
          <button className="btn-outlined-red">
          {/* <img src={Plus} alt="Tick" width={30} /> */}
            Reject
          </button>
          </td>
        </tr>
)
}

export default ApprovaList;