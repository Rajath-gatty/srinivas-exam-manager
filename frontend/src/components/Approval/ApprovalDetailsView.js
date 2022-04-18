import { useEffect } from "react";
import {FiArrowLeft,FiCheck,FiX} from "react-icons/fi";
import {FaUserCircle,FaCamera} from "react-icons/fa";

import { useContextData } from "../../hooks/useContextData";
import { useNavigate } from "react-router-dom";
import "./ApprovalDetailsView.css";

const StudentApprovalView = () => {
  const navigate = useNavigate();

  const {
    approve,
    setApprove,
    approveText,
    setApproveText,
    rejectText,
    setRejectText,
  } = useContextData();

  const ApproveBtn = document.querySelector(".green");
  const RejectBtn = document.querySelector(".red");

  useEffect(() => {
    if (approve !== "") {
      if (approve === "Approve") {
        RejectBtn.style.display = "none";
        ApproveBtn.classList.add("green-active");
        setApproveText("Approved");
      }
      if (approve === "Reject") {
        ApproveBtn.style.display = "none";
        RejectBtn.classList.add("red-active");
        setRejectText("Rejected");
      }
    }
  }, []);

  return (
    <div className="ApprovalDetailsView content">
      <div className="approve-user-info flex">
        <div className="back-btn flex" onClick={() => navigate(-1)}>
        <FiArrowLeft color="var(--light-grey)" size={30}/> <span>Back</span>
        </div>
        <div className="approve-user-avatar flex">
          <FaUserCircle color="var(--light-grey)" size={70}/>
            <div
              className="approve-camera"
              onClick={() => {
                document.querySelector("#imagePicker").click();
              }}
            >
              <FaCamera size={20} color="var(--light-grey)"/>
              <input
                type="file"
                id="imagePicker"
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
              />
            </div>
        </div>

        <div className="approve-user-title flex">
          <span className="approve-user-name">John Doe</span>
          <span className="approve-user-data">BCA 3rd Year</span>
        </div>
      </div>

      <div className="approve-buttons flex">
        <button
          className="approve-btn green flex"
          onClick={() => {
            setApprove("Approve");
          }}
        >
          <FiCheck size={20}/> {approveText}
        </button>
        <button
          className="approve-btn red flex"
          onClick={() => {
            setApprove("Reject");
          }}
        >
          <FiX size={20}/> {rejectText}
        </button>
      </div>

      <div className="approve-form flex">
        <div className="approve-details">
          <div className="approveRow">
            <span>First Name</span> John
          </div>
          <div className="approveRow">
            <span>Last Name</span> Doe
          </div>
          <div className="approveRow">
            <span>Phone</span> 9584625345
          </div>
          <div className="approveRow">
            <span>Email</span> johndoe@gmail.com
          </div>
          <div className="approveRow">
            <span>Date of Birth</span> 15/04/2022
          </div>
          <div className="approveRow">
            <span>Gender</span> Male
          </div>
          <div className="approveRow">
            <span>Blood Group</span> B positive
          </div>
          <div className="approveRow">
            <span>Aadhar No.</span> 1234 5678 9123 4567
          </div>
          <div className="approveRow">
            <span>Religion</span> Hindu
          </div>
          <div className="approveRow">
            <span>Caste</span> GanjaGang
          </div>
          <div className="approveRow">
            <span>Place of Birth</span> Mangalore
          </div>
          <div className="approveRow">
            <span>District of Birth</span> Dakshina Kannada
          </div>
          <div className="approveRow">
            <span>Country of Birth</span> India
          </div>
          <div className="approveRow">
            <span>Identity Mark</span> tatoo
          </div>
          <div className="approveRow">
            <span>Registratoin No.</span> 3SU19SA011
          </div>
          <div className="approveRow">
            <span>Pincode</span> 575028
          </div>
          <div className="approveRow">
            <span>Address</span> Mangalore, Karnataka, India sasda ada da sdad
            asdasdasdd
          </div>
        </div>

        <h3>Father's Details</h3>
        <div className="approve-details">
          <div className="approveRow">
            <span>First Name</span> John Doe
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
        </div>

        <h3>Mother's Details</h3>
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
        </div>

        <h3>Guardian's Details</h3>
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
        </div>

        <h3>Admission Details</h3>
        <div className="approve-details">
          <div className="approveRow">
            <span>Department</span> CCIS
          </div>
          <div className="approveRow">
            <span>Course</span> BCA
          </div>
          <div className="approveRow">
            <span>Joining Academic Year</span> 2005
          </div>
          <div className="approveRow">
            <span>Degree Year</span> 2010
          </div>
          <div className="approveRow">
            <span>Degree Batch</span> A
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApprovalView;
