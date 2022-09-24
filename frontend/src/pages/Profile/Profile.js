import "./Profile.css";
import { BiLogOut } from "react-icons/bi";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FiCheck } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Back from "../../components/UI/Back/Back";
import { motion } from "framer-motion";
import { useContextData } from "../../hooks/useContextData";

const Profile = () => {
  // const [allowEdit, setAllowEdit] = useState(false);
  const { setRole, setToken, setUser, user } = useContextData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setToken('');
    setRole('');
    setUser({});
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <Back />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, transition: { duration: 2 } }}
        animate={{ opacity: 1, scale: 1 }}
        className="profile-head flex"
      >
        <div className="profile-userinfo gap-2 flex">
          <div className="profile-avatar  flex">
           {user.imagePath ? <div className="profileImg-container">
              <img className="profile-info-img" src={user.imagePath}  alt="avatar" />
            </div>
            :
            <FaUserCircle color="var(--light-grey)" size={70} />
            }
          </div>

          <div className="profile-title flex">
            <span className="profile-name">{user.first_name +" "+ user.last_name}</span>
            {/* <span className="profile-data">BCA 3rd Year</span> */}
          </div>
        </div>

        <div className="profile-options flex">
          {/* <div
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
          </div> */}

          <div className="logout flex">
            <div onClick={handleLogout} className="btn-outlined-red gap-sm flex">
              <BiLogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, transition: { duration: 2 } }}
        animate={{ opacity: 1, scale: 1 }}
        className="profile-userDetails-ReadOnly flex"
        // className={
        //   allowEdit ? "profile-userDetails" : "profile-userDetails-ReadOnly"
        // }
      >
        <div className="profile-row firstname">
          <label>First Name</label>
          <input type="text" defaultValue={user.first_name} />
        </div>

        <div className="profile-row lastname">
          <label>Last Name</label>
          <input type="text" defaultValue={user.last_name !== "" ? user.last_name : "-"} />
        </div>

        <div className="profile-row phone">
          <label>Phone</label>
          <input type="text" defaultValue={user.phone} />
        </div>

        <div className="profile-row email">
          <label>Email</label>
          <input type="text" defaultValue={user.email} disabled/>
        </div>

        {/* <div className="profile-row address">
          <label>Address</label>
          <textarea
            defaultValue={user.address}
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
