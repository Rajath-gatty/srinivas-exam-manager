import { TextField } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useState,useRef} from "react";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "./AdminTimeTable.css";
import Modal from "../../UI/Modal/Modal";
import AdminTimeTableList from "./AdminTimeTableList";
import Filter from "../../UI/Filter/Filter";
import axios from "axios";

const AdminTimeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [inputFields, setInputFields] = useState([
        { subjectName: '', subjectCode: '', examDate: '', examTime: '' }
    ])
    const [courseError,setCourseError] = useState('');
    const [semesterError,setSemesterError] = useState('');

    const courseRef = useRef();
    const semesterRef = useRef();

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const course = courseRef.current.value;
        const semester = semesterRef.current.value;

        if(course==='') {
           return setCourseError('Select Course');
        } else if(semester==='') {
            setCourseError('');
           return setSemesterError('Select Semester');
        }
        setSemesterError('');

        const data = {
            courseName: course,
            semester: semester,
            timetable: inputFields
        }
        try {
            const result = axios.post('/admin/timetable/new',data);
            console.log(result);
        } catch(err) {
            console.log(err);
        }
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
                    {/* <Skeleton rows={9} cols={7} profile /> */}
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
                            <AdminTimeTableList status="approved"/>
                            <AdminTimeTableList  status="rejected"/>
                            <AdminTimeTableList />
                            <AdminTimeTableList status="approved"/>
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
                            <form onSubmit={handleSubmit}>
                            <div className="select-box flex">

                            <Filter width="90%" 
                            data={[{course_name:'BCA',course_id:'1'}]} 
                            filter="course" 
                            label="Choose Course"
                            ref={courseRef}
                            error={courseError&&true}
                            helperText={courseError}
                            />

                            <Filter 
                            width="90%" 
                            data={[{sem_name:1,sem_id:'2'}]} 
                            filter="semester" 
                            label="Choose Semester"
                            ref={semesterRef}
                            error={semesterError&&true}
                            helperText={semesterError}
                            />
                            </div>
                            <table className="admin-form-table-wrapper">
                                <thead className="thead">
                                    <tr>
                                        <th >Subject Name</th>
                                        <th>Subject Code</th>
                                        <th >Exam Date</th>
                                        <th >Exam Time</th>
                                        <th style={{background:'#fff',border:"none"}} ><HiPlus className="plus btn btn-outlined"
                                                onClick={() => handleAddFields()}
                                                variant="contained"
                                                bgcolor="grey"
                                                size={20} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {inputFields.map((inputField, index) => (
                                    <tr key={index} className="table-form-row">
                                        <td>
                                            <TextField
                                                name="subjectName"
                                                placeholder="Subject name"
                                                value={inputField.subjectName}
                                                onChange={event => handleChangeInput(index, event)}
                                            ></TextField>
                                        </td>
                                        <td>
                                            <TextField
                                                name="subjectCode"
                                                placeholder="Subject Code"
                                                value={inputField.subjectCode}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                name="examDate"
                                                placeholder="exam Date"
                                                value={inputField.examDate}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                name="examTime"
                                                placeholder="exam Time"
                                                value={inputField.examTime}
                                                onChange={event => handleChangeInput(index, event)}
                                            />
                                        </td>
                                        <td className="delete-row">
                                            <HiMinus className="minus"
                                                onClick={() => handleRemoveFields(index)}
                                                color="var(--strong-red)"
                                                size={20} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                                <button type="submit" className="btn-submit">Submit</button>
                               </form>
                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default AdminTimeTable;