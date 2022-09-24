import { useEffect,useState } from "react";
import {FiArrowLeft} from "react-icons/fi";
import {FaUserCircle} from "react-icons/fa";
import axios from "axios";
import { useParams,useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ApprovalDetailsView.css";
import { CircularProgress } from "@mui/material";
// import { useContextData } from "../../hooks/useContextData";

const StudentApprovalView = () => {
  const [details,setDetails] = useState({});
  const [loading,setLoading] = useState(true);
  // const [approve,setApprove] = useState('');
  // const [approveText,setApproveText] = useState('');
  // const [rejectText,setRejectText] = useState('');

  const navigate = useNavigate();
  const params = useParams(); 
  const location = useLocation();
  // const {serverUrl} = useContextData();

  // const ApproveBtn = document.querySelector(".green");
  // const RejectBtn = document.querySelector(".red");
  const type = location.search.split('=')[1];

  useEffect(() => {
    const user = type==='staff'?'admin':'staff';

    const fetchDetails = async() => {
      try {
        const result = await axios.get(`${user}/approve/${type}/view/${params.id}`);
        console.log(result.data);
        const data = result.data.reduce((acc,cur) => {
          return cur;
        },{});
        setDetails(data);
        setLoading(false);
      } catch(err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchDetails();
  },[location.search,params.id,type])

  return !loading?(
    <div className="ApprovalDetailsView content">
      <div className="approve-user-info flex">
        <div className="back-btn flex" onClick={() => navigate(-1)}>
        <FiArrowLeft color="var(--light-grey)" size={30}/> <span>Back</span>
        </div>
        <div className="approve-user-avatar flex">
          {type==='student'?
          <img src={details.image_path} className="details-profile-img" alt="" />
          :<FaUserCircle color="var(--light-grey)" size={70}/>}
        </div>

        <div className="approve-user-title flex">
          <span className="approve-user-name">{details.first_name+' '+details.last_name}</span>
          <span className="approve-user-data">{details.course_name}</span>
        </div>
      </div>

      <div className="approve-form flex">
        <div className="approve-details">
          <div className="approveRow">
            <span>Name</span>{details.first_name+' '+details.last_name}
          </div>
          <div className="approveRow">
            <span>Phone</span>{details.phone}
          </div>
          <div className="approveRow">
            <span>Email</span> {details.email}
          </div>
          {details.faculty_id&&<div className="approveRow">
            <span>Faculty ID</span> {details.faculty_id}
          </div>}
          {details.regno&&<div className="approveRow">
            <span>Registration No.</span> {details.regno}
          </div>}
          <div className="approveRow">
            <span>Date of Birth</span> {details.dob}
          </div>
          <div className="approveRow">
            <span>Gender</span> {details.gender}
          </div>
          <div className="approveRow">
            <span>Blood Group</span> {details.blood_group}
          </div>
          <div className="approveRow">
            <span>Aadhar No.</span> {details.aadhar_no}
          </div>
          <div className="approveRow">
            <span>Religion</span> {details.religion}
          </div>
          <div className="approveRow">
            <span>Caste</span> {details.caste}
          </div>
          <div className="approveRow">
            <span>Place of Birth</span> {details.birth_place}
          </div>
          <div className="approveRow">
            <span>District of Birth</span> {details.birth_district}
          </div>
          <div className="approveRow">
            <span>Country of Birth</span> {details.country}
          </div>
          {details.identity_mark&&<div className="approveRow">
            <span>Identity Mark</span> {details.identity_mark}
          </div>}
          <div className="approveRow">
            <span>Pincode</span> {details.pincode}
          </div>
          <div className="approveRow">
            <span>Address</span> {details.address}
          </div>
        </div>

        <h3>Father's Details</h3>
        <div className="approve-details">
          <div className="approveRow">
            <span>Name</span> {details.f_name}
          </div>
          <div className="approveRow">
            <span>Occupation</span> {details.f_occupation}
          </div>
          <div className="approveRow">
            <span>Mobile No.</span> {details.f_phone}
          </div>
          {details.f_email&&<div className="approveRow">
            <span>Email</span> {details.f_email}
          </div>}
        </div>
  
        {details.role==='student'&&<div><h3>Mother's Details</h3>
        <div className="approve-details">
          <div className="approveRow">
            <span> Name</span> {details.m_name}
          </div>
          <div className="approveRow">
            <span>Occupation</span> {details.m_occupation}
          </div>
          <div className="approveRow">
            <span>Mobile No.</span> {details.m_phone}
          </div>
          <div className="approveRow">
            <span>Email</span> {details.m_email}
          </div>
        </div></div>}
        

        {details.g_name&&<><h3>Guardian's Details</h3>
        <div className="approve-details">
          <div className="approveRow">
            <span>First Name</span> Jane Doe
          </div>
          <div className="approveRow">
            <span>Occupation</span> Developer
          </div>
          <div className="approveRow">
            <span>Mobile No.</span> 9584625345
          </div>
          <div className="approveRow">
            <span>Email</span> johndoe@gmail.com
          </div>
        </div></>}

        {details.role==='student'&&<h3>Admission Details</h3>}
        <div className="approve-details">
          <div className="approveRow">
            <span>Department</span> {details.dept_name}
          </div>
          {details.role==='student'&&<div className="approveRow">
            <span>Course</span> {details.course_name}
          </div>}
          {details.role==='student'&&<div className="approveRow">
            <span>Joining Academic Year</span> {details.joining_year}
          </div>}
          {details.role!=='student'&&<div className="approveRow">
            <span>Joining Year</span> {details.joining_year}
          </div>}
        </div>
      </div>
    </div>
  ):<div style={{width:'100%'}} className="flex"><CircularProgress size={50} thickness={4}/></div>;
};

export default StudentApprovalView;
