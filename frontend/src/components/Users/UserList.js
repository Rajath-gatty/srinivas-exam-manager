import { BiX, BiCheck } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserList = ({ eligible }) => {
  const eligibility = eligible ? "eligible flex" : "not-eligible flex";
  const UserID = "3SU19SA011";

  return (
    <tr className="users-table-row">
      <td className="users-avatar-wrapper">
        <Link
          to={`./${UserID}`}
          state={{
            eligibility: eligible,
          }}
        >
          <FaUserCircle color="var(--light-grey)" size={25} />
        </Link>
      </td>
      <td>{UserID}</td>
      <td>John</td>
      <td>BCA</td>
      <td>2019</td>
      <td>V</td>
      <td className={eligibility}>
        {!eligible ? <BiX size={20} /> : <BiCheck size={20} />}
        <span>{eligible ? "Eligible" : "Not Eligible"}</span>
      </td>
    </tr>
  );
};

export default UserList;
