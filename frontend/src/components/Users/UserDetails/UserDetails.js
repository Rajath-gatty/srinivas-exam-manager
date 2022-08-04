import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import {CircularProgress} from "@mui/material";
import {useContextData} from "../../../hooks/useContextData";
import Back from "../../UI/Back/Back";
import "./UserDetails.css";
import axios from "axios";

const UserDetails = () => {
  const [userData,setUserData] = useState([]);
  const [loading,setLoading] = useState(true);
  const {serverUrl} = useContextData();
  const location = useLocation();
  const {type, userId} = location.state;

  useEffect(()=>{
    setLoading(true);
    setUserData([]);

    const fetchUsers = async() => {
      try {
        const result = await axios.post(`/users/details`, {type, uid:userId.uid, idName:userId.idName})
        setUserData(result.data[0]);
        setLoading(false); 
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  },[type,userId.uid,userId.idName])

  return (
    <div className="userinfo-container">
      <Back/>

      {!loading &&<div>
        <div className="userinfo-profile flex">
          <div className="userinfo-avatar flex">
            {!userData.image_path?<FaUserCircle color="var(--light-grey)" size={70} />:
            <img className="userinfo-details-img" src={serverUrl+userData.image_path} alt="Profile" />}
          </div>

          <div className="userinfo-title flex">
            <span className="userinfo-name">{userData.first_name +" "+ userData.last_name}</span>
            <span className="userinfo-data">BCA 3rd Year</span>
          </div>
        </div>

        <div className="userinfo-form">
          <div className="userinfo-form-details">
            <div className="userinfo-row">
              <span>First Name</span> {userData.first_name}
            </div>
            <div className="userinfo-row">
              <span>Last Name</span> {userData.last_name}
            </div>
            <div className="userinfo-row">
              <span>Phone</span> {userData.phone}
            </div>
            <div className="userinfo-row">
              <span>Email</span> {userData.email}
            </div>
            <div className="userinfo-row">
              <span>Date of Birth</span> {userData.dob}
            </div>
            <div className="userinfo-row">
              <span>Gender</span> {userData.gender}
            </div>
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Blood Group</span> {userData.blood_group}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Aadhar No.</span> {userData.aadhar_no}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Religion</span> {userData.religion}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Caste</span> {userData.caste}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Place of Birth</span> {userData.birth_place}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>District of Birth</span> {userData.birth_district}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Country of Birth</span> {userData.country}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Identity Mark</span> {userData.identity_mark}
            </div>}
            {type!=="examcoordinator"&&<div className="userinfo-row">
              <span>Pincode</span> {userData.pincode}
            </div>}
            <div className="userinfo-row">
              <span>Registratoin No.</span> {type==="student"?userData.regno : type==="faculty"?userData.faculty_id : type==="staff"?userData.staff_id : userData.coord_id }
            </div>
            <div className="userinfo-row">
              <span>Address</span> {userData.address}
            </div>
          </div>
        </div>
      </div>}
      {loading&&<div style={{marginTop:200}} className="flex"><CircularProgress size={45}/></div>}
    </div>
  );
};

export default UserDetails;
