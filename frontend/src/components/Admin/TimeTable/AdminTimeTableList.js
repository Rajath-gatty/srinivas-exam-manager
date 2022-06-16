import './AdminTimeTable.css'; 
const AdminTimeTableList = ({status='pending'}) => {
    let result;
    if(status==='approved') {
        result = 'approved';
    } else if(status==='rejected') {
        result = 'rejected';
    }
    return (
        <tr className="admin-timetable-info-row">
            <td>BCA</td>
             <td>2022</td>
             <td>IV</td>
             <td><p className={result}>{status}</p></td>
        </tr>
    )
}

export default AdminTimeTableList;