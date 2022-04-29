import {HiDownload} from "react-icons/hi";
import {FaUserCircle} from "react-icons/fa";

const  PaymentsList = (props) => {
     return(
         <>
         <tr onClick={props.handleOpenModal}>
             <td>
                <FaUserCircle color="var(--light-grey)" size={25} />
             </td>
             <td>John Doe</td>
             <td>3SU19SA001</td>
             <td>22-02-2022</td>
             <td>
                 <button className="btn-outlined download-btn flex">
                    <HiDownload size={18}/>
                    <span>Download</span>
                 </button>
             </td>
         </tr>
        </>
     )
}

export default PaymentsList;