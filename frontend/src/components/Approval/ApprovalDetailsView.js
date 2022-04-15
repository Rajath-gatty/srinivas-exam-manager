import { useState, useEffect } from "react";
import { Avatar, Camera, Tick, Plus } from "../../Assets";
import "./ApprovalDetailsView.css";

const StudentApprovalView = () => {
  const [approve, setApprove] = useState("");
  const [approveText, setApproveText] = useState("Approve");
  const [rejectText, setRejectText] = useState("Reject");
  const ApproveBtn = document.querySelector(".green");
  const ApproveSVG = document.querySelector(".green img");
  const RejectBtn = document.querySelector(".red");
  const RejectSVG = document.querySelector(".red img");

  useEffect(() => {
    if (approve !== "") {
      if (approve === "Approve") {
        RejectBtn.style.display = "none";
        ApproveBtn.style.marginRight = "0px";
        ApproveBtn.style.backgroundColor = "transparent";
        ApproveBtn.style.color = "var(--strong-green)";
        ApproveSVG.style.filter = "var(--svg-green)";
        setApproveText("Approved");
      }
      if (approve === "Reject") {
        ApproveBtn.style.display = "none";
        RejectBtn.style.marginRight = "0px";
        RejectBtn.style.backgroundColor = "transparent";
        RejectBtn.style.color = "var(--strong-red)";
        RejectSVG.style.filter = "var(--svg-red)";
        setApproveText("Approved");
      }
    }
  }, [approve]);

  return (
    <div className="ApprovalDetailsView content">
      <div className="approve-user-info flex">
        <div className="approve-user-avatar flex">
          <div className="approve-avatar">
            <img src={Avatar} width="60px" alt="avatar" />
            <div className="approve-camera">
              <img src={Camera} width="20px" alt="camera" />
            </div>
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
          <img src={Tick} alt="Tick" width="25px" /> {approveText}
        </button>
        <button
          className="approve-btn red flex"
          onClick={() => {
            setApprove("Reject");
          }}
        >
          <img src={Plus} alt="Times" width="25px" /> {rejectText}
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
      </div>
    </div>
  );
};

export default StudentApprovalView;
