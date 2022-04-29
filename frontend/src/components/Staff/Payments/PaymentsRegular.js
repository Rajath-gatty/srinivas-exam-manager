import "./Payments.css";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import PaymentsList from "./PaymentsList";
import Modal from "../../UI/Modal";
import { useState } from "react";
import {HiDownload} from "react-icons/hi";
import {IoMdClose} from "react-icons/io";

const  PaymentsRegular = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const  handleOpenModal = () => {
        setShowModal(true);
    }

     return(
         <div className="payments-regular-main">
             <FilterSearch/>
            <table className="payments-wrapper">
                <thead>
                    <th></th>
                    <th>Name</th>
                    <th>Registration</th>
                    <th>Date of Payment</th>
                    <th>Reciept</th>
                </thead>
                <tbody>
                    <PaymentsList handleOpenModal={handleOpenModal}/>
                    <PaymentsList handleOpenModal={handleOpenModal}/>
                    <PaymentsList handleOpenModal={handleOpenModal}/>
                    <PaymentsList handleOpenModal={handleOpenModal}/>
                </tbody>
            </table>
            {showModal && <Modal width="40%" onClose={handleCloseModal}>
            <IoMdClose className="payment-details-close-icon" onClick={handleCloseModal}/>
                <h3 className="payment-details-hdng">Payment Details</h3>
                <table className="payment-modal-content">
                    <tbody>
                        <tr className="payment-content ">
                            <td className="strong">Student</td>
                            <td>John Doe</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Register No.</td>
                            <td>3SU19SA001</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Bank Name</td>
                            <td>State Bank of India</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Account No.</td>
                            <td>456458743586</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Transaction ID</td>
                            <td>FDG6FKJHK97YT7</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Date of Payment</td>
                            <td>20-02-2022</td>
                        </tr>
                        <tr className="payment-content ">
                            <td className="strong">Reciept</td>
                            <td><button className="btn-outlined download-btn flex">
                                <HiDownload size={18}/>
                                <span>Download</span>
                            </button></td>
                        </tr>
                    </tbody>
                </table>
            </Modal>}
         </div>
     )
}

export default PaymentsRegular;