import './AdminTimeTable.css'; 
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from "react-icons/io";
import {IoTrashOutline} from "react-icons/io5";

const AdminTimeTableList = (props) => {
    const {status,course_name,total_subjects,semester,created_at,t_id,class_name}=props.item;
    let result;
    if(status==='approved') {
        result = 'Approved';
    } else if(status==='rejected') {
        result = 'Rejected';
    } else {
        result = 'Pending'
    }

    return (
        <tr className="admin-timetable-info-row">
            <td>{course_name}</td>
             <td>{semester}</td>
             <td>{class_name}</td>
            <td>{total_subjects}</td>
             <td>{created_at}</td>
              <td><p className={`${result} flex gap-sm`}>{status==='approved'?<><BiCheck size={20} /> {result}</>:<>{status==='rejected'?<IoMdClose size={20} />:null}{result}</>}</p></td>
              <td>{<IoTrashOutline 
              style={{cursor:'pointer'}} 
              size={20} 
              onClick={()=>props.deleteTimetable(t_id)}
              color="var(--strong-red)"/>}</td>
        </tr>
    )
}

export default AdminTimeTableList;