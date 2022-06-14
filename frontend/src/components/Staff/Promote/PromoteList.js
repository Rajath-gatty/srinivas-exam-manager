import { FaUserCircle } from "react-icons/fa";
const PromoteList = () => {
    return (
        <tr className="promote-table-row">
            <td className="promote-avatar-wrapper">
                <FaUserCircle color="var(--light-grey)" size={25} />
            </td>
            <td>3SU1A010</td>
            <td>John Doe</td>
            <td>BCA</td>
            <td>V</td>
        </tr>

    )
}

export default PromoteList;