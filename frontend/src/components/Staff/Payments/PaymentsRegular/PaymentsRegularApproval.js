import {useOutletContext} from "react-router-dom";
import {HiDownload} from "react-icons/hi";
import PaymentsList from "../PaymentsList";
import Modal from "../../../UI/Modal/Modal";
import {IoMdClose} from "react-icons/io";
import { useState,useEffect } from "react";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import NoData from "../../../UI/NoData/NoData";
import fileDownload from "js-file-download";

const  PaymentsRegularApproval = ({type}) => {
    const [payments,setPayments] = useState([]);
    const [loading,setLoading] = useState(true);

    const [subjectDetails,setSubjectDetails] = useState([]);
    const [subjectLoading,setSubjectLoading] = useState(true);
    const [paymentDetails,setPaymentDetails] = useState({});
    const [paymentLoading,setPaymentLoading] = useState(true);

    const [handleCloseModal,handleOpenModal,showModal,closeSubjectModal,openSubjectModal,showSubjectModal] = useOutletContext();

    useEffect(() => {
        const fetchPayments = async() => {
            try {
                const result = await axios.get(`/staff/payments/pending/${type}`);
                setPayments(result.data);
                console.log(result.data);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchPayments();
    },[type])

    const handleApproval = async(id,status,reciept) => {
        try {
            setLoading(true);
            await axios.post(`/staff/payments/approval/${status}`,{pId:id,reciept});
            setPayments(state => {
                const newState = [...state];
                const updatedState = newState.filter(item => item.id!==id);
                return updatedState;
            });
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        } 
    }

    const handlePaymentDetails = async(id) => {
        handleOpenModal();
        if(id) {
            try {
                setPaymentLoading(true);
                const result = await axios.get(`staff/paymentdetails/${id}`);
                setPaymentDetails(result.data[0]);
                setPaymentLoading(false);
            } catch(err) {
                console.log(err);
                setPaymentLoading(true);
            }
        }
    }

    const handleSubjectDetails = async(id) => {
        openSubjectModal();
        if(id) {
            try {
                setSubjectLoading(true);
                const result = await axios.get(`staff/subjectdetails/${id}`);
                setSubjectDetails(result.data);
                setSubjectLoading(false);
            } catch(err) {
                console.log(err);
                setSubjectLoading(false);
            }
        }
    }

    const handleReciept = async(reciept) => {
        const result = await axios.post('/staff/payments/reciept',{recieptPath:reciept},{responseType:'blob'});
        const uid = (Math.random() + 1).toString(36).substring(2);
        fileDownload(result.data,`${uid}.${result.data.type.split('/')[1]}`);
     }

     return (
         <>
            <table className="payments-wrapper">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Registration</th>
                        <th>Course</th>
                        <th>Semester</th>
                        {type==='repeater'&&<th>Subject Details</th>}
                        <th>Payment Details</th>
                        <th>Approve</th>
                    </tr>
                </thead>    
                <tbody>
                    {!loading&&payments.map(item => {
                        return <PaymentsList 
                        key={item.payment_id}
                        data={item}
                        type={type}
                        handlePaymentDetails={handlePaymentDetails}
                        handleSubjectDetails={handleSubjectDetails}
                        handleApproval={handleApproval}
                        />
                    })}
                </tbody>
            </table>
            {loading&&<div style={{marginTop:50}} className="flex"><CircularProgress thickness={4}/></div>}
            {showModal && <Modal width="40%" onClose={handleCloseModal}>
            <IoMdClose className="payment-details-close-icon" onClick={handleCloseModal}/>
                <h3 className="payment-details-hdng">Payment Details</h3>
                {!paymentLoading?<table className="payment-modal-content">
                    <tbody>
                        <tr className="payment-content ">
                            <td className="strong">Register No.</td>
                            <td>{paymentDetails.regno}</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Bank Name</td>
                            <td>{paymentDetails.bank_name}</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Account No.</td>
                            <td>{paymentDetails.acc_no}</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Transaction ID</td>
                            <td>{paymentDetails.transaction_id}</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Date of Payment</td>
                            <td>{paymentDetails.dop}</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Reciept</td>
                            <td><button onClick={()=>handleReciept(paymentDetails.reciept_path)} className="btn-outlined download-btn flex">
                                <HiDownload size={18}/>
                                <span>Download</span>
                            </button></td>
                        </tr>
                    </tbody>
                </table>:<div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress thickness={4}/></div>}
            </Modal>}
            {type==='repeater'&&showSubjectModal && <Modal width="40%" onClose={closeSubjectModal}>
            <IoMdClose className="payment-details-close-icon" onClick={closeSubjectModal}/>
                <h3 className="payment-details-hdng">Subject Details</h3>
                {!subjectLoading?<table className="subject-modal-content">
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectDetails.map(sub => {
                            return <tr key={sub.id} className="payment-content ">
                            <td className="strong">{sub.subj_name}</td>
                            <td>{sub.subj_code}</td>
                        </tr>
                        })}
                    </tbody>
                </table>:<div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress thickness={4}/></div>}
            </Modal>}
            {!loading&&payments.length<=0 && <NoData text="No Approval Request"/>}
         </>
     );
}

export default PaymentsRegularApproval;