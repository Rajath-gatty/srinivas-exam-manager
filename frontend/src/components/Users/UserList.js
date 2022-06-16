import { BiX, BiCheck } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserList = ({ data }) => {
  console.log(data)
  const eligible = data.eligibility;
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
      <td>{data.regno}</td>
      <td>{data.first_name +" "+ data.last_name}</td>
      <td>{data.course_id}</td>
      <td>{data.joining_year}</td>
      <td>{data.semester}</td>
      <td className={eligibility}>
        {!eligible ? <BiX size={20} /> : <BiCheck size={20} />}
        <span>{eligible ? "Eligible" : "Not Eligible"}</span>
      </td>
    </tr>
  );
};

export default UserList;
