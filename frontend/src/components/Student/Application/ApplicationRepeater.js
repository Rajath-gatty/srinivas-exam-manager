import { useState,useEffect,useRef } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  TextField,
  FormHelperText
} from "@mui/material";
import "./Application.css";
// import { Link } from "react-router-dom";
import { useContextData } from "../../../hooks/useContextData";
import axios from "axios";
import Modal from "../../UI/Modal/Modal";
import Dob from "../../UI/Dob";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import dateFormat from "dateformat";
import {toast} from "react-toastify";

const ApplicationRepeater = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [loading,setLoading] = useState(true);
  const [subjects,setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [photo,setPhoto] = useState('');
  const [fileErr,setFileErr] = useState('');
  const [fileUrl,setFileUrl] = useState('');
  const [errors,setErrors] = useState([]);
  const [showModal,setShowModal] = useState(false);

  const {user} = useContextData();
  const semesterArr = new Array(user.semester).fill('');
  const feePerSubject = 100;

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

  const AddSubject = (e,data) => {
    const CheckFlag = e.target.checked;
    if (CheckFlag) {
      if(selectedSubject.find(el=>el.sem_id===data.sem_id)) {
        return;
      }
      setSelectedSubject([...selectedSubject, data]);
    } else {
      setSelectedSubject(selectedSubject.filter((e) => e.sem_id !== data.sem_id));
    }
  };

  let TotalFee = feePerSubject * selectedSubject.length;

  useEffect(() => {
    const fetchSubjects = async() => {
      try {
        const data = {
          courseId:user.courseId,
          semester:selectedSemester
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
  },[selectedSemester, user])


  const handleSemesterChange = async(e) => {
    setSelectedSemester(e.target.value);
    const data = {
      courseId:user.courseId,
      semester:e.target.value
    }
    try {
      const result = await axios.post('/student/application/subjects',data);
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  }

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
  
  const handleRepeaterSubmit = async(e) => {
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
      repeaterSubjects:JSON.stringify(selectedSubject),
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
      const result = await axios.post('/student/application/repeater',formData);
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
    <div className="application-repeater flex">
      <div className="application-repeater-header">
      <h2>Choose Repeater Semester</h2>
      <div className="application-selector flex">
        <FormControl className="select-sem">
          <InputLabel>Select Semester</InputLabel>
          <Select
            label="Department"
            defaultValue=""
            size="small"
            onChange={handleSemesterChange}
          >
            {semesterArr.map((_,i) => {
              return <MenuItem key={i} value={i+1}>{i+1}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      </div>
      <div className="application-semester">
        {selectedSemester ? 'SEM '+selectedSemester : "Select Semester"}
      </div>

      <div className="application-form flex">
        <div className="application-row header">
          <span>Subject Name</span>
          <span>Subject Code</span>
        </div>
        {subjects.map((sub => {
          return <div key={sub.subj_code} className="application-row">
          <div className="subject-checkbox">
            <Checkbox value={sub.sem_id} onChange={(e) =>{AddSubject(e,sub)}} /> <span>{sub.subj_name}</span>
          </div>
          <span>{sub.subj_code}</span>
        </div>
        }))}
      </div>

      {selectedSubject.length !== 0 ? (
        <div className="selected-subjects">
          <div className="selected-subject-header flex">
            <span>Repeater Subjects</span>
            <span>Fees</span>
          </div>
          {selectedSubject.map((subject) => {
            return (
              <div key={subject.sem_id} className="selected-subject-list">
                <span>{subject.subj_name}</span>
                <span>Rs.{feePerSubject}</span>
              </div>
            );
          })}

          <div className="application-total">
            <span>Total Amount</span> <span>Rs.{TotalFee}</span>
          </div>
           <button onClick={() =>{setShowModal(true)}} className="application-submit">Apply</button>
        </div>
      ) : null}
      {showModal&&<Modal onClose={handleCloseModal}>
    <IoMdClose size={25} className="timetable-close-icon" onClick={handleCloseModal} />
    <div className="student-payment">
      <h2>Payment Details</h2>
      <form onSubmit={handleRepeaterSubmit}>
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
    </div>
  );
};

export default ApplicationRepeater;
