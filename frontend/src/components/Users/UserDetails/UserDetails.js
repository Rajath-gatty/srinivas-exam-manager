import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import "./UserDetails.css";

const UserDetails = () => {
  const navigate = useNavigate();
  const [eligible, setEligible] = useState("");
  const [hideBtn, setHideBtn] = useState("");

  const location = useLocation();
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
    <div className="userinfo-container flex">
      <div className="back-btn flex" onClick={() => navigate(-1)}>
        <FiArrowLeft color="var(--light-grey)" size={25} /> <span>Back</span>
      </div>
      <div className="userinfo-profile flex">
        <div className="userinfo-avatar flex">
          <FaUserCircle color="var(--light-grey)" size={70} />
          <div
            className="userinfo-camera"
            onClick={() => {
              document.querySelector("#imagePicker").click();
            }}
          >
            <FaCamera size={20} color="var(--light-grey)" />
            <input
              type="file"
              id="imagePicker"
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
            />
          </div>
        </div>

        <div className="userinfo-title flex">
          <span className="userinfo-name">John Doe</span>
          <span className="userinfo-data">BCA 3rd Year</span>
        </div>

        <div className="userinfo-buttons flex">
          <button
            className={
              hideBtn === "EligibleBtn"
                ? "hide-btn"
                : eligible === "Eligible"
                ? "eligible-btn active-green flex"
                : "eligible-btn green flex"
            }
            onClick={() => {
              setHideBtn("NotEligibleBtn");
              setEligible("Eligible");
            }}
          >
            <FiCheck size={20} /> <span>Eligible</span>
          </button>
          <button
            className={
              hideBtn === "NotEligibleBtn"
                ? "hide-btn"
                : eligible === "NotEligible"
                ? "eligible-btn active-red flex"
                : "eligible-btn red flex"
            }
            onClick={() => {
              setHideBtn("EligibleBtn");
              setEligible("NotEligible");
            }}
          >
            <FiX size={20} /> <span>Not Eligible</span>
          </button>
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
