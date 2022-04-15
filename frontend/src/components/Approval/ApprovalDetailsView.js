import "./ApprovalDetailsView.css";
import { Avatar, Camera, Tick, Plus } from "../../Assets";
import { useContextData } from "../../hooks/useContextData";

const StudentApprovalView = () => {
  const { role } = useContextData();

  return (
    <div className="ApprovalDetailsView content">
      <div className="approve-user-info flex">
        <div className="approve-user-avatar flex">
          <div className="approve-avatar">
            <div className="approve-camera">
              <img src={Camera} width="20px" alt="camera" />
            </div>
            <img src={Avatar} width="60px" alt="avatar" />
          </div>
        </div>

        <div className="approve-user-title flex">
          <span className="approve-user-name">John Doe</span>
          <span className="approve-user-data">BCA 3rd Year</span>
        </div>
      </div>

      <div className="approve-buttons flex">
        <button className="approve-btn green flex">
          <img src={Tick} alt="Tick" width="25px" /> Approve
        </button>
        <button className="approve-btn red flex">
          <img src={Plus} alt="Tick" width="25px" /> Reject
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
