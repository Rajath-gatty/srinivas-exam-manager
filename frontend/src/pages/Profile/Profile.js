import { TextField } from "@mui/material";
// import { FiArrowLeft } from "react-icons/fi";
import { FaUserCircle, FaCamera, FaUserEdit } from "react-icons/fa";
import Back from "../../components/UI/Back/Back";
import "./Profile.css";

const Profile = () => {

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

            <div className="profile-edit flex">
                <FaUserEdit size={20} />
                <span>Edit</span>
            </div>
        </div>

        <div className="profile-userDetails">
            <div className="profile-firstname">
<TextField
                className="profile-textfield"
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value="John"
            />
            </div>

            <div className="profile-firstname">
<TextField
                className="profile-textfield"
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value="Doe"
            />
            </div>

            
            <div className="profile-firstname">
<TextField
                className="profile-textfield"
              label="Phone"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value="9856478925"
            />
            </div>

            
            <div className="profile-firstname">
<TextField
                className="profile-textfield"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value="JohnDoe69@gmail.com"
            />
            </div>

            
            <div className="profile-firstname">
<TextField
                className="profile-textfield"
              label="Address"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value="John Nagar, Doe puram, Bangalore"
              multiline
            />
            </div>

        </div>

    </div>
  )
}

export default Profile;