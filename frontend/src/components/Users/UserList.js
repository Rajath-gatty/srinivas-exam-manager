import { Avatar } from '../../Assets'; 
const UserList = ({eligible}) => {

  const eligibility = eligible? 'eligible': 'not-eligible';
    return (
        <tr className="users-table-row">
          <td className="users-avatar-wrapper">
            <img className="users-list-avatar" src={Avatar} width="20px" alt="Avatar"/>
          </td>
          <td> 3SU19SA001</td>
          <td> John</td>
          <td>BCA</td>
          <td>2019</td>
          <td>V</td>
          <td className={eligibility}>
              {eligible? 'Eligible': 'Not Eligible'}
          </td>
        </tr>
    )
}

export default UserList;