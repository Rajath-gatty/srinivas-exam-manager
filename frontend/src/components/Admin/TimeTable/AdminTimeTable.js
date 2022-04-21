import { useState } from "react";
import "./AdminTimeTable.css";
import {FiUpload} from "react-icons/fi";
import {IoMdClose} from "react-icons/io";
import Modal from "../../UI/Modal";
import AdminTimeTableList from "./AdminTimeTableList";

const AdminTimeTable = () => {
    const [showModal, setShowModal] = useState(false);

    const hideModalHandler = () => {
        setShowModal(false);
    }

    const showModalHandler = () => {
        setShowModal(true);
    }

    return(
        <>
        <div className="admin-timetable-main">
            <div className="admin-timetable-header">
                <h1>Recent Timetable</h1>
                <button className="admin-timetable-header-btn btn-outlined flex" onClick={showModalHandler} >
                    <FiUpload size={20}/>
                    <span>Upload</span>
                </button>
            </div>
            <div className="admin-timetable-table-wrapper">
                <table className="admin-timetable-table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Batch</th>
                            <th>Semester</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AdminTimeTableList/>
                        <AdminTimeTableList/>
                        <AdminTimeTableList/>
                        <AdminTimeTableList/>
                        <AdminTimeTableList/>
                    </tbody>
                </table>
            </div>
        </div>
        {showModal && <Modal onClose={hideModalHandler} width="65%">
            <div className="upload-timetable-wrapper">
                <IoMdClose size={25} className="timetable-close-icon" onClick={hideModalHandler}/>
                <h2 className="upload-timetable-hdng">Upload Timetable</h2>
                <div className="upload-wrapper">
                    <div className="admin-upload">
                        <button className="btn-outlined timetable-upload-btn flex">
                            <input type="file" accept="application/pdf" className="input-file" id="timetable" name="timetable" />
                            <FiUpload size={20}/>
                            <label htmlFor="timetable">Upload Pdf</label>
                        </button>
                        <button className="timetable-send-btn btn">Send</button>
                    </div>
                    <div className="display-timetable-wrapper">

                    </div>
                </div>
            </div>
        </Modal>}
    </>
    )
}

export default AdminTimeTable;