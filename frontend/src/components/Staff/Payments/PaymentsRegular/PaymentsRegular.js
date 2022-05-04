import "../Payments.css";
import {NavLink, Outlet} from "react-router-dom";
import { useState } from "react";

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
             <h2 className="payments-hdng">Payments (Regular)</h2>
             <div className="payment-tab">
                 <div className="payment-links-wrapper flex">
                 <NavLink 
                 className={(NavData) => NavData.isActive? 'payment-links payment-active':'payment-links' } 
                 to="approved"
                 >Approved</NavLink>

                <NavLink 
                 className={(NavData) => NavData.isActive? 'payment-links payment-active': 'payment-links' } 
                 to="pending"
                 >Pending Approval</NavLink>

                 <div className="slider"></div>
                 </div>
             </div>
             <Outlet 
             handleCloseModal={handleCloseModal}
             handleOpenModal={handleOpenModal}
             showModal={showModal}
             />
         </div>
     )
}

export default PaymentsRegular;