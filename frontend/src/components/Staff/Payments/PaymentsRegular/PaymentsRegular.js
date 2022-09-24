import "../Payments.css";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

const  PaymentsRegular = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSubjectModal,setShowSubjectModal] = useState(false);

    const location = useLocation();
    const loc = location.pathname.split('/');
    loc.shift();
    loc.pop();
    const hdngName = loc.join('/')==='payments/regular'? 'Payments   (Regular)': 'Payments  (Repeater)';
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const  handleOpenModal = () => {
        setShowModal(true);
    }

    const openSubjectModal = () => {
        setShowSubjectModal(true);
    }

    const closeSubjectModal = () => {
        setShowSubjectModal(false);
    }

     return(
         <div className="payments-regular-main">
             <h2 className="payments-hdng">{hdngName}</h2>
             <div className="payment-tab">
                 <ul className="payment-links-wrapper flex">
                 <NavLink 
                 className={(NavData) => NavData.isActive? 'payment-links payment-active':'payment-links' } 
                 to="approved"
                 >Approved</NavLink>

                <NavLink 
                 className={(NavData) => NavData.isActive? 'payment-links payment-active': 'payment-links' } 
                 to="pending"
                 >Pending Approval</NavLink>

                 <div className="slider"></div>
                 </ul>
             </div>
             <Outlet 
             context={[handleCloseModal,
                handleOpenModal,
                showModal,
                closeSubjectModal,
                openSubjectModal,
                showSubjectModal]}
             />
         </div>
     )
}

export default PaymentsRegular;