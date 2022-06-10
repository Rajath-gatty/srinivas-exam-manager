import { TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import "./Payment.css";

const Payment = () => {

  return (
    <div className="student-payment">
      <h2>Payment Details</h2>
      <form className="student-payment-form">
        <TextField
          label="Bank Name"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Account No."
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Transaction ID"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Date of Payment"
          variant="outlined"
          size="small"
          fullWidth
        />
        <label htmlFor="timetable" className="btn-outlined timetable-upload-btn flex">
          <input type="file" accept="application/pdf" className="payment-input-file" id="timetable" name="timetable" />
          <FiUpload size={20} />
          <span >Upload Reciept</span>
        </label>
      </form>
    </div>
  )
}

export default Payment;