import { Link } from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";

const ApprovaList = () => {
  return (
    <tr className="approve-table-row">
      <td className="approve-avatar-wrapper">
      <FaUserCircle color="var(--light-grey)" size={30}/>
      </td>
      <td>John</td>
      <td>BCA</td>
      <td>2019</td>
      <td>
        <Link to="/approve/student/54674567">View</Link>
      </td>
      <td className="flex approve-table-btn-wrapper">
        <button className="btn-outlined-green">Approve</button>
        <button className="btn-outlined-red">Reject</button>
      </td>
    </tr>
  );
};

export default ApprovaList;
