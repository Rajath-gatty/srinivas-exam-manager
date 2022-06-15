
import { TextField } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

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



    const removeUploadedPdf = (index) => {
        const newArr = files.filter((_, i) => i !== index);
        setFiles(newArr);
    }

    const convertToMb = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    const [inputFields, setInputFields] = useState([
        { subjectName: '', subjectCode: '', examDate: '', examTime: '' },
    ])

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values)
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { subjectName: '', subjectcode: '', examDate: '', examTime: '' }])
    }
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <>
            <div className="admin-timetable-main">
                <div className="admin-timetable-header">
                    <h1>Recent Timetable</h1>
                    <button className="admin-timetable-header-btn btn-outlined flex" onClick={showModalHandler} >
                        <FiUpload size={20} />
                        <span>Upload</span>
                    </button>
                </div>
                <div className="admin-timetable-table-wrapper">
                    <Skeleton rows={9} cols={7} profile />
                    <table className="admin-timetable-table">
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Subject Code</th>
                                <th>Exam Date</th>
                                <th>Exam Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AdminTimeTableList />
                            <AdminTimeTableList />
                            <AdminTimeTableList />
                            <AdminTimeTableList />
                            <AdminTimeTableList />
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && <Modal onClose={hideModalHandler} width="65%">
                <div className="upload-timetable-wrapper">
                    <IoMdClose size={25} className="timetable-close-icon" onClick={hideModalHandler} />
                    <h2 className="upload-timetable-hdng">Upload Timetable</h2>
                    <div className="upload-wrapper">
                        <div className="display-timetable-wrapper">
                            {files.map((file, index) => {
                                return <div key={index} className="upload-file-info">
                                    <div className="info-img">
                                        {/* <img src={PdfIcon} alt="" /> */}
                                        <BsFillFileEarmarkPdfFill size={40} color={"var(--strong-red)"} />
                                    </div>
                                    <div className="file-info">
                                        <h4>{file.name}</h4>
                                        <p>{convertToMb(file.size)}</p>
                                    </div>
                                    <IoMdClose onClick={() => removeUploadedPdf(index)} className="close-icon" />
                                </div>
                            })}
                        </div>
                        <div className="admin-upload">

                            <table className="indent-table-wrapper">
                                <thead className="thead">
                                    <tr>
                                        <th>Subject Name</th>
                                        <th>Subject Code</th>
                                        <th>Exam Date</th>
                                        <th>Exam Time</th>

                                    </tr>
                                </thead>
                                {inputFields.map((inputField, index) => (

                                    <tr>
                                        <td>
                                            <TextField
                                                name="subjectName"

                                                value={inputField.subjectName}
                                                onChange={event => handleChangeInput(index, event)}
                                            ></TextField>
                                        </td>

                                        <td>
                                            <TextField
                                                name="subjectCode"

                                                value={inputField.subjectcode}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                name="examDate"

                                                value={inputField.examDate}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                name="examTime"

                                                value={inputField.examTime}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <HiPlus className="plus"
                                                onClick={() => handleAddFields()}
                                                variant="contained"
                                                bgcolor="grey"
                                                color="var(--strong-green)"
                                                size={20} />

                                            <HiMinus className="minus"
                                                onClick={() => handleRemoveFields(index)}
                                                color="var(--strong-red)"
                                                size={20} />
                                        </td>

                                    </tr>


                                ))}


                                <tbody>
                                    <button className="btn-submit">Submit</button>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default AdminTimeTable;