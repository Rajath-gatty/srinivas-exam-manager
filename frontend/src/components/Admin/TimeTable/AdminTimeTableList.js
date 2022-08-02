import './AdminTimeTable.css'; 
import { BiCheck } from 'react-icons/bi';
import {IoTrashOutline} from "react-icons/io5";

const AdminTimeTableList = (props) => {
    const {status,course_name,total_subjects,semester,created_at,t_id}=props.item;
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
              <td><p className={`${result} flex gap-sm`}>{status==='approved'?<><BiCheck size={20} /> {status}</>:status}</p></td>
              <td>{<IoTrashOutline 
              style={{cursor:'pointer'}} 
              size={20} 
              onClick={()=>props.deleteTimetable(t_id)}
              color="var(--strong-red)"/>}</td>
        </tr>
    )
}

export default AdminTimeTableList;