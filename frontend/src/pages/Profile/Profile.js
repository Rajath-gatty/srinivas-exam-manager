import "./Profile.css";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { FaUserCircle, FaCamera, FaUserEdit } from "react-icons/fa";
import Back from "../../components/UI/Back/Back";
import { motion } from "framer-motion";

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

      <motion.div
        initial={{ opacity: 0, scale: 0.9, transition: { duration: 2 } }}
        animate={{ opacity: 1, scale: 1 }}
        className="profile-head flex"
      >
        ``
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
            <span className="profile-name">John Doe</span>
            <span className="profile-data">BCA 3rd Year</span>
          </div>
        </div>
        <div
          className="profile-edit flex"
          onClick={() => {
            setAllowEdit(!allowEdit);
          }}
        >
          {allowEdit ? (
            <div className="flex">
              <FiCheck size={20} />
              <span>Save</span>
            </div>
          ) : (
            <div className="flex">
              <FaUserEdit size={20} />
              <span>Edit</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, transition: { duration: 2 } }}
        animate={{ opacity: 1, scale: 1 }}
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

        {/* <div className="profile-row address">
          <label>Address</label>
          <textarea
            defaultValue={userValues.address}
            onInput={(e) => {
              e.target.style.height = "5px";
              e.target.style.height = e.scrollHeight + "px";
            }}
          />
        </div> */}
      </motion.div>
    </div>
  );
};

export default Profile;
