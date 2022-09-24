import { Checkbox, CircularProgress,FormHelperText,TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import dateFormat from "dateformat";
import "./Application.css";
import axios from "axios";
import {useContextData} from "../../../hooks/useContextData";
import { useEffect,useState,useRef } from "react";
import Modal from "../../UI/Modal/Modal";
import Dob from "../../UI/Dob";
import {toast} from "react-toastify";

const ApplicationRegular = () => {
  const [loading,setLoading] = useState(true);
  const [subjects,setSubjects] = useState([]);
  const [photo,setPhoto] = useState('');
  const [fileErr,setFileErr] = useState('');
  const [fileUrl,setFileUrl] = useState('');
  const [errors,setErrors] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const feeAmount = 1000;

  const {user} = useContextData();
  const bankRef = useRef();
  const accountRef = useRef();
  const transactionRef = useRef();
  const dateRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const paymentDateRef = useRef({ dateRef, monthRef, yearRef });

  const handleCloseModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    const fetchSubjects = async() => {
      try {
        const data = {
          courseId:user.courseId,
          semester:user.semester
        }
        const result = await axios.post('/student/application/subjects',data);
        setSubjects(result.data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchSubjects();
  },[user])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileErr('');
    if(file) {
      if(!(file.type==='image/jpg' || file.type==='image/jpeg' || file.type==='image/png')) {
        setFileUrl('');
        return setFileErr('Invalid Image type');
      }
      if(file.size/1024>4000) {
        setFileUrl('');
       return setFileErr('Image size must be less than 4mb');
      }

      setFileErr('');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileUrl(reader.result);
      }
      setPhoto(file);
    }
  }

  const handleRegularSubmit = async(e) => {
      e.preventDefault();
      const bank = bankRef.current.value;
      const accno = accountRef.current.value;
      const transaction = transactionRef.current.value;
      const paymentDate = `${dateRef.current.value}-${monthRef.current.value}-${yearRef.current.value}`;
      const dateErr = paymentDate.length >= 10;
      const paymentData = {
        bank,
        accno,
        transaction,
        date:dateErr&&dateFormat(paymentDate,'yyyy-mm-dd'),
        semester:user.semester,
        courseId:user.courseId,
        studentId:user.id,
        paymentId:(Math.random() + 1).toString(36).substring(2),
        reciept:photo
      }
      if(!photo) {
        return setFileErr('Please attach payment reciept');
      }
      const formData = new FormData();
      for(let key in paymentData) {
        formData.append(key,paymentData[key]);
      }
      try {
        const result = await axios.post('/student/application/regular',formData);
        console.log(result);
        setErrors([]);

        toast.success("Application Registered!", {
          isLoading: false, 
          autoClose: 3000, 
          closeOnClick: true,
          draggable: true
        });
      } catch(err) {
        if(err.response.status===400) {
          setErrors(err.response.data.err);
        }
      }
  }

  return (
    <>
    <div className="application-regular flex">
      <h2>Current Semester</h2>
      <div className="application-semester">SEM {user.semester}</div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        {!loading?subjects.map(sub => {
        return <div className="application-row" key={sub.sem_id}>
        <div className="subject-checkbox">
          <Checkbox value={sub.subj_name} disabled checked /> <p>{sub.subj_name}</p>
        </div>
        <p>{sub.subj_code}</p>
      </div>
      }):<div style={{marginTop:40,marginBottom:40}} className="flex"><CircularProgress size={45}/></div>}
      </div>

      <div className="application-total">
        <span>Total Amount</span> <span>Rs.{feeAmount}</span>
      </div>
        <button onClick={() => setShowModal(true)} className="application-submit">Apply</button>
    </div>
    {showModal&&<Modal onClose={handleCloseModal}>
    <IoMdClose size={25} className="timetable-close-icon" onClick={handleCloseModal} />
    <div className="student-payment">
      <h2>Payment Details</h2>
      <form onSubmit={handleRegularSubmit}>
        <div className="student-payment-form">
        <TextField
          label="Bank Name"
          variant="outlined"
          size="small"
          fullWidth
          inputRef={bankRef}
          error={errors.some(item=>item.param==='bank')}
          helperText={errors.find(item=>item.param==='bank')?.msg}
        />
        <TextField
          label="Account No."
          variant="outlined"
          size="small"
          fullWidth
          inputRef={accountRef}
          error={errors.some(item=>item.param==='accno')}
          helperText={errors.find(item=>item.param==='accno')?.msg}
        />
        <TextField
          label="Transaction ID"
          variant="outlined"
          size="small"
          fullWidth
          inputRef={transactionRef}
          error={errors.some(item=>item.param==='transaction')}
          helperText={errors.find(item=>item.param==='transaction')?.msg}
        />
        <Dob 
        ref={paymentDateRef} 
        label="Date of Payment"
        error={errors.some(item=>item.param==='date')}
        helperText={errors.find(item=>item.param==='date')?.msg}
        />
        <div>
        <label htmlFor="timetable" className="btn-outlined timetable-upload-btn flex">
          <input type="file" accept="images/*" className="payment-input-file" id="timetable" name="timetable" onChange={handleFileUpload} />
          <FiUpload size={20} />
          <span >Upload Reciept</span>
        </label>
        <FormHelperText error={fileErr}>{fileErr?fileErr:'Max size 4MB Supported Image types JPG,JPEG,PNG'}</FormHelperText>
        </div>
        <img width="100px" src={fileUrl} alt="" />
        </div>
        <input type="submit" className="btn mt-2" value="Submit" />
      </form>
    </div>
    </Modal>}
    </>
  );
};

export default ApplicationRegular;
