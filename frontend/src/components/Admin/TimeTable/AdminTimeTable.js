import { CircularProgress, TextField } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import { useState,useRef,useEffect} from "react";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "./AdminTimeTable.css";
import Modal from "../../UI/Modal/Modal";
import AdminTimeTableList from "./AdminTimeTableList";
import Filter from "../../UI/Filter/Filter";
import axios from "axios";
import { useContextData } from "../../../hooks/useContextData";
import { useFetchCourses } from "../../../hooks/useFetchCourses";

const AdminTimeTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [inputFields, setInputFields] = useState([
        { subjectName: '', subjectCode: '', examDate: '', examTime: '' }
    ])
    const [courseError,setCourseError] = useState('');
    const [semesterError,setSemesterError] = useState('');
    const [timetables,setTimetables] = useState([]);
    const [loading,setLoading] = useState(true);
    const [semFilter,setSemFilter] = useState([]);
    const courseRef = useRef();
    const semesterRef = useRef();

    const {user} = useContextData();
    const filterCourses = useFetchCourses(user.deptId);

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

    const fetchSemesters = async (courseName) => {
        try {
          const resp = await axios.post('/semesters',{courseName});
          const data = await resp?.data;
          console.log(data);
          const semData = new Array(data.course_sem).fill('');
          setSemFilter(semData);
        } catch (error) {
            console.log(error);
        }
      };
    
      const handleCourseChange = (e) => {
        const courseValue = e.target.value;
        fetchSemesters(courseValue);
      }

    useEffect(() => {
        const fetchTimetables = async() => {
            try {
                const result = await axios.get('admin/timetables');
                setTimetables(result.data);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchTimetables();
    },[])

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
        const tId = (Math.random() + 1).toString(36).substring(2);
        const data = {
            courseName: course,
            semester: semester,
            tId:tId,
            timetable: inputFields
        }
        try {
            if(course&&semester) {
                const promise = axios.post('/admin/timetable/new',data);
                const result = await promise;
                console.log(result);
            }
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
                    {!loading?<table className="admin-timetable-table">
                        <thead>
                            <tr>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Total Subjects</th>
                            <th>Created At</th>
                            <th>Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading||timetables.map(item => {
                                return <AdminTimeTableList
                                key={item.t_id} 
                                item={item}
                                />
                            })}
                        </tbody>
                    </table>:<div style={{marginTop:140}} className="flex"><CircularProgress thickness={4}/></div>}
                    {!loading&&timetables.length<=0&&<h3 style={{textAlign:'center',marginTop:'6em',color:'var(--light-grey)'}}>No Records Found</h3>}
                </div>
            </div>
            {showModal && <Modal onClose={hideModalHandler} width="75%">
                <div className="upload-timetable-wrapper">
                    <IoMdClose size={25} className="timetable-close-icon" onClick={hideModalHandler} />
                    <h2 className="upload-timetable-hdng">Upload Timetable</h2>
                    <div className="upload-wrapper">
                        <div className="admin-upload">
                            <form onSubmit={handleSubmit}>
                            <div className="select-box ">

                            <Filter width="80%" 
                            data={filterCourses} 
                            filter="course" 
                            label="Choose Course"
                            ref={courseRef}
                            handleCourseChange={handleCourseChange}
                            error={courseError?true:false}
                            helperText={courseError}
                            />

                            <Filter 
                            width="80%" 
                            data={semFilter} 
                            filter="semester" 
                            label="Choose Semester"
                            ref={semesterRef}
                            error={semesterError?true:false}
                            helperText={semesterError}
                            />
                            </div>
                            <table className="admin-form-table-wrapper">
                                <thead className="thead">
                                    <tr>
                                        <th></th>
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
                                        <td className="slno">
                                            {index+1}
                                        </td>
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