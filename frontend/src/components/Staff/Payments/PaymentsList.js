import {HiDownload} from "react-icons/hi";
// import axios from "axios";

const  PaymentsList = (props) => {
    const {data,handleApproval,type,handleReciept} = props;
     return(
         <>
         <tr>
             <td>{data.first_name+' '+data.last_name}</td>
             <td>{data.regno}</td>
             <td>{data.course_name}</td>
             <td>{data.semester}</td>
             {type==='repeater'&&<td><p onClick={() => {props.handleSubjectDetails(data.payment_id)}} className="modal-link">view</p></td>}
             <td><p onClick={() => {props.handlePaymentDetails(data.payment_id)}} className="modal-link">view</p></td>
             {!data.status ? <td className="flex approve-table-btn-wrapper gap-1">
                <button onClick={() => {handleApproval(data.id,'approve')}} className="btn-outlined-green">Approve</button>
                <button onClick={() => {handleApproval(data.id,'reject',data.reciept_path)}}className="btn-outlined-red">Reject</button>
            </td>
                :<td><button onClick={()=>{handleReciept(data.reciept_path)}} className="btn-outlined download-btn flex">
                    <HiDownload size={18}/>
                    <span>Download</span>
                </button></td>}
         </tr>
        </>
     )
}

export default PaymentsList;