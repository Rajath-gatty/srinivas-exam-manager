import {HiDownload} from "react-icons/hi";
import {FaUserCircle} from "react-icons/fa";

const  PaymentsList = (props) => {
     return(
         <>
         <tr>
             <td>
                <FaUserCircle color="var(--light-grey)" size={25} />
             </td>
             <td>John Doe</td>
             <td>3SU19SA001</td>
             <td>BCA</td>
             <td><p onClick={props.openSubjectModal} className="modal-link">view</p></td>
             <td><p onClick={props.handleOpenModal} className="modal-link">view</p></td>
             {!props.approved ? <td className="flex approve-table-btn-wrapper gap-1">
                <button className="btn-outlined-green">Approve</button>
                <button className="btn-outlined-red">Reject</button>
            </td>
                :<td><button className="btn-outlined download-btn flex">
                    <HiDownload size={18}/>
                    <span>Download</span>
                </button></td>}
         </tr>
        </>
     )
}

export default PaymentsList;