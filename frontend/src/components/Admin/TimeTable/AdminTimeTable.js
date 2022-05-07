import { useState } from "react";
import {FiUpload} from "react-icons/fi";
import {IoMdClose} from "react-icons/io";
import {BsFillFileEarmarkPdfFill} from "react-icons/bs";

import "./AdminTimeTable.css";
import Modal from "../../UI/Modal/Modal";
import AdminTimeTableList from "./AdminTimeTableList";
import Skeleton from "../../UI/Skeleton/Skeleton";

const AdminTimeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState([]);

    const hideModalHandler = () => {
        setShowModal(false);
    }

    const showModalHandler = () => {
        setShowModal(true);
    }

    const handleFileInput = (e) => {
        const file = e.target.files;
        setFiles(prev => [...prev,...file]);
    }

    const removeUploadedPdf = (index) => {
        const newArr = files.filter((_,i) => i !== index);
        setFiles(newArr);
    }

    const convertToMb = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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
                <Skeleton rows={9} cols={7} profile/>
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
                    <div className="display-timetable-wrapper">
                        {files.map((file,index) => {
                            return <div key={index} className="upload-file-info">
                                <div className="info-img">
                                    {/* <img src={PdfIcon} alt="" /> */}
                                    <BsFillFileEarmarkPdfFill size={40} color={"var(--strong-red)"}/>
                                </div>
                                <div className="file-info">
                                    <h4>{file.name}</h4>
                                    <p>{convertToMb(file.size)}</p>
                                </div>
                                <IoMdClose onClick={() => removeUploadedPdf(index)} className="close-icon"/>
                            </div>
                        })}
                    </div>
                    <div className="admin-upload">
                        {files.length ===0 && <label htmlFor="timetable" className="btn-outlined timetable-upload-btn flex">
                            <input type="file" accept="application/pdf" className="input-file" id="timetable" name="timetable" onChange={(e) => handleFileInput(e)}  />
                            <FiUpload size={20}/>
                            <span >Choose Pdf</span>
                        </label>}
                        <button className="timetable-send-btn btn">Upload</button>
                    </div>
                </div>
            </div>
        </Modal>}
    </>
    )
}

export default AdminTimeTable;