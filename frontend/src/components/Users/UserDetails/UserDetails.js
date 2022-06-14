import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import Back from "../../UI/Back/Back";
import "./UserDetails.css";

const UserDetails = () => {
  const navigate = useNavigate();
  const [eligible, setEligible] = useState("");
  const [hideBtn, setHideBtn] = useState("");

  // const { eligibility } = location.state;

  // useEffect(() => {
  //   if (eligibility) {
  //     setHideBtn("NotEligibleBtn");
  //     setEligible("Eligible");
  //   } else {
  //     setHideBtn("EligibleBtn");
  //     setEligible("NotEligible");
  //   }
  // }, []);

  return (
    <div className="userinfo-container">
      <Back/>

      <div className="userinfo-profile flex">
        <div className="userinfo-avatar flex">
          <FaUserCircle color="var(--light-grey)" size={70} />
        </div>

        <div className="userinfo-title flex">
          <span className="userinfo-name">John Doe</span>
          <span className="userinfo-data">BCA 3rd Year</span>
        </div>
      </div>

      <div className="userinfo-form">
        <div className="userinfo-form-details">
          <div className="userinfo-row">
            <span>First Name</span> John
          </div>
          <div className="userinfo-row">
            <span>Last Name</span> Doe
          </div>
          <div className="userinfo-row">
            <span>Phone</span> 9584625345
          </div>
          <div className="userinfo-row">
            <span>Email</span> johndoe@gmail.com
          </div>
          <div className="userinfo-row">
            <span>Date of Birth</span> 15/04/2022
          </div>
          <div className="userinfo-row">
            <span>Gender</span> Male
          </div>
          <div className="userinfo-row">
            <span>Blood Group</span> B positive
          </div>
          <div className="userinfo-row">
            <span>Aadhar No.</span> 1234 5678 9123 4567
          </div>
          <div className="userinfo-row">
            <span>Religion</span> Hindu
          </div>
          <div className="userinfo-row">
            <span>Caste</span> GanjaGang
          </div>
          <div className="userinfo-row">
            <span>Place of Birth</span> Mangalore
          </div>
          <div className="userinfo-row">
            <span>District of Birth</span> Dakshina Kannada
          </div>
          <div className="userinfo-row">
            <span>Country of Birth</span> India
          </div>
          <div className="userinfo-row">
            <span>Identity Mark</span> tatoo
          </div>
          <div className="userinfo-row">
            <span>Registratoin No.</span> 3SU19SA011
          </div>
          <div className="userinfo-row">
            <span>Pincode</span> 575028
          </div>
          <div className="userinfo-row">
            <span>Address</span> Mangalore, Karnataka, India sasda ada da sdad
            asdasdasdd
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
