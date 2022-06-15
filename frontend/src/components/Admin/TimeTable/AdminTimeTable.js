
import { TextField } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "./AdminTimeTable.css";
import Modal from "../../UI/Modal/Modal";
import AdminTimeTableList from "./AdminTimeTableList";

const AdminTimeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [inputFields, setInputFields] = useState([
        { subjectName: '', subjectCode: '', examDate: '', examTime: '' }
    ])

    const hideModalHandler = () => {
        setShowModal(false);
    }

    const showModalHandler = () => {
        setShowModal(true);
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { subjectName: '', subjectCode: '', examDate: '', examTime: '' }])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    console.log(inputFields);
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
                    {/* <Skeleton rows={9} cols={7} profile /> */}
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
                        <div className="admin-upload">
                            <table className="indent-table-wrapper">
                                <thead className="thead">
                                    <tr>
                                        <th>Subject Name</th>
                                        <th>Subject Code</th>
                                        <th>Exam Date</th>
                                        <th>Exam Time</th>
                                        <th><HiPlus className="plus"
                                                onClick={() => handleAddFields()}
                                                variant="contained"
                                                bgcolor="grey"
                                                color="var(--strong-green)"
                                                size={20} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {inputFields.map((inputField, index) => (
                                    <tr key={Math.random()}>
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
                                                value={inputField.subjectCode}
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
                                            <HiMinus className="minus"
                                                onClick={() => handleRemoveFields(index)}
                                                color="var(--strong-red)"
                                                size={20} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                                <button className="btn-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default AdminTimeTable;