import { useRef, useState } from "react";
import axios from "axios";
import {TextField} from "@mui/material";
import {FiUpload} from "react-icons/fi";
import "./Payment.css";

const  NewPayment = () => {
  const [errors,setErrors] = useState([]);

  const bankNameRef = useRef();
  const accountNoRef = useRef();
  const transactionIdRef = useRef();
  const paymentDateRef = useRef();

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const paymentData = {
      bankName : bankNameRef.current.value,
      accountNo : accountNoRef.current.value,
      transactionId : transactionIdRef.current.value,
      paymentDate : paymentDateRef.current.value,
    }

      try {
        const result = await axios.post('/registration/staff',paymentData)
        console.log(result);
        setErrors([]);
      } catch(err) {
        setErrors(err.response.data.err);
        console.log(err.response.data.err);
      }
  }

     return(
         <div className="student-payment">
             <h2>Payment Details</h2>
             <form onSubmit={handleFormSubmit} className="student-payment-form">
             <TextField
                label="Bank Name"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={bankNameRef}
                error={errors.some(err=>err.param==='firstName')}
                helperText={errors.find(err=>err.param==='firstName')?.msg}
              />
              <TextField
                label="Account No."
                variant="outlined"
                size="small"
                fullWidth
                inputRef={accountNoRef}
                error={errors.some(err=>err.param==='firstName')}
                helperText={errors.find(err=>err.param==='firstName')?.msg}
              />
              <TextField
                label="Transaction ID"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={transactionIdRef}
                error={errors.some(err=>err.param==='firstName')}
                helperText={errors.find(err=>err.param==='firstName')?.msg}
              />
              <TextField
                label="Date of Payment"
                variant="outlined"
                size="small"
                fullWidth
                inputRef={paymentDateRef}
                error={errors.some(err=>err.param==='firstName')}
                helperText={errors.find(err=>err.param==='firstName')?.msg}
              />

              <label htmlFor="timetable" className="btn-outlined timetable-upload-btn flex">
                      <input type="file" accept="application/pdf" className="payment-input-file" id="timetable" name="timetable"/>
                      <FiUpload size={20}/>
                      <span >Upload Reciept</span>
              </label>

              <input className="payment-submit" type="submit" value="Create"/>
            </form>
         </div>
     )
}

export default NewPayment;