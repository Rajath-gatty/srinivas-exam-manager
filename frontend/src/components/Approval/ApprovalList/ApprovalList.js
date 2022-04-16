import {Link} from "react-router-dom";
import {Avatar,Tick,Plus} from "../../../Assets";

const ApprovaList = () => {
return(
        <tr className="approve-table-row">
          <td><img className="approve-list-avatar" src={Avatar} alt="Avatar"/></td>
          <td> John</td>
          <td>BCA</td>
          <td>2019</td>
          <td><Link to="/approve/student/54674567">view</Link></td>
          <td className="flex">
          <button className="approve-btn flex green">
            <img src={Tick} alt="Tick" width={20} />
            Approve
          </button>
          <button className="approve-btn flex red">
          <img src={Plus} alt="Tick" width={30} />
            Reject
          </button>
          </td>
        </tr>
)
}

export default ApprovaList;