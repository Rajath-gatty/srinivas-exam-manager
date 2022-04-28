import { useState } from "react";
import { TextField } from "@mui/material";
import { FaUserCircle, FaCamera, FaUserEdit } from "react-icons/fa";
import Back from "../../components/UI/Back/Back";
import "./Profile.css";

const Profile = () => {
  const [allowEdit, setAllowEdit] = useState(false);

  const userValues = {
    firstName: "John",
    lastName: "Doe",
    phone: "9856478925",
    email: "JohnDoe69@gmail.com",
    address: "John Nagar, Doe puram, Bangalore",
  };
  return (
    <div className="profile-container flex">
      <Back />

      <div className="profile-head flex">
        <div className="profile-userinfo flex">
          <div className="profile-avatar flex">
            <FaUserCircle color="var(--light-grey)" size={70} />
            <div
              className="profile-camera"
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

          <div className="profile-title flex">
            <span className="userinfo-name">John Doe</span>
            <span className="userinfo-data">BCA 3rd Year</span>
          </div>
        </div>

        <div
          className="profile-edit flex"
          onClick={() => {
            setAllowEdit(!allowEdit);
          }}
        >
          <FaUserEdit size={20} />
          <span>Edit</span>
        </div>
      </div>

      <div
        className={
          allowEdit ? "profile-userDetails" : "profile-userDetails-ReadOnly"
        }
      >
        <div className="profile-row firstname">
          <label>First Name</label>
          <input type="text" defaultValue={userValues.firstName} />
        </div>

        <div className="profile-row lastname">
          <label>Last Name</label>
          <input type="text" defaultValue={userValues.lastName} />
        </div>

        <div className="profile-row phone">
          <label>Phone</label>
          <input type="text" defaultValue={userValues.phone} />
        </div>

        <div className="profile-row email">
          <label>Email</label>
          <input type="text" defaultValue={userValues.email} />
        </div>

        <div className="profile-row address">
          <label>Address</label>
          <textarea
            defaultValue={userValues.address}
            onInput={(e) => {
              e.target.style.height = "5px";
              e.target.style.height = e.scrollHeight + "px";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
