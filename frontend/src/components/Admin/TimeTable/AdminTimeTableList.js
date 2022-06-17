import './AdminTimeTable.css'; 
const AdminTimeTableList = (props) => {
    const {status,course_name,total_subjects,semester,created_at}=props.item
    let result;
    if(status==='approved') {
        result = 'approved';
    } else if(status==='rejected') {
        result = 'rejected';
    }

    return (
        <tr className="admin-timetable-info-row">
            <td>{course_name}</td>
             <td>{semester}</td>
            <td>{total_subjects}</td>
             <td>{created_at}</td>
              <td><p className={result}>{status}</p></td>
        </tr>
    )
}

export default AdminTimeTableList;