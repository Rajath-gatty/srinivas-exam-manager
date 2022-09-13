import { CircularProgress, TextField,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
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
import { toast } from "react-toastify";

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
    const [courseName,setCourseName] = useState('');
    const [classList,setClassList] = useState([]);
    const [selectedClass,setSelectedClass] = useState('');

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
    
      const handleCourseChange = (e) => {
        const courseValue = e.target.value;
        setCourseName(courseValue);
        fetchSemesters(courseValue);
      }

      const fetchSemesters = async (courseName) => {
        try {
          const resp = await axios.post('/semesters',{courseName});
          const data = await resp?.data;
          const semData = new Array(data.course_sem).fill('');
          setSemFilter(semData);
        } catch (error) {
            console.log(error);
        }
      };

      const handleSemesterChange = async(e) => {
        try {
            const resp = await axios.post('/classroom',{courseName,semester:e.target.value});
            const data = await resp?.data;
            setClassList(data);
            console.log(data);
          } catch (error) {
              console.log(error);
          }
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
        let flag=0;
        inputFields.forEach(input => {
            if(input.subjectName===''||input.subjectCode===''||input.examDate===''||input.examTime==='') {
                flag=1;
            }
        })
        if(flag===1) {
            return toast.error('Fill all the Fields',{
                toastId:'admin-timetable',
                autoClose:true
            })
        }
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
            classId:selectedClass,
            tId:tId,
            timetable: inputFields
        }
        try {
            if(course&&semester) {
                const promise = axios.post('/admin/timetable/new',data);
                const result = await promise;
                toast.success("TimeTable Uploaded Successfully")
                console.log(result);
                setLoading(true);
                setShowModal(false);
                const res = await axios.get('admin/timetables');
                setTimetables(res.data);
                setLoading(false);
            }
        } catch(err) {
                toast.error(err.response.data)
                console.log(err);
        }
    }

    const deleteTimetable = async(id)=> {
        try {
            const resp = await axios.post('admin/timetable/delete',{id});
            console.log(resp?.data);
            // const data = await resp?.data;
            setTimetables(prevState => {
                const newArr = [...prevState];
                const updatedState = newArr.filter(tbl => tbl.t_id!==id);
                return updatedState; 
            })
            toast.success('Deleted Successfully!')
          } catch (error) {
              console.log(error);
              toast.error(error.response.data);
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
                            <th>Class Name</th>
                            <th>Total Subjects</th>
                            <th>Created At</th>
                            <th>Approval</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading||timetables.map(item => {
                                return <AdminTimeTableList
                                key={item.t_id} 
                                item={item}
                                deleteTimetable={deleteTimetable}
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

                            <Filter 
                            width="80%" 
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
                            handleSemesterChange={handleSemesterChange}
                            ref={semesterRef}
                            error={semesterError?true:false}
                            helperText={semesterError}
                            />

                            <FormControl className="admin-timetable-classList-menu">
                                <InputLabel>Class Batch</InputLabel>
                                <Select
                                label="Class Batch"
                                placeholder="Class Batch" 
                                size="small"
                                type="number"
                                defaultValue=""
                                required
                                onChange={(e)=>setSelectedClass(e.target.value)}
                                >
                                {classList.map((opt) => (
                                    <MenuItem key={opt.class_id} value={opt.class_id}>
                                    {opt.name}
                                    </MenuItem>
                                ))}
                                {/* <MenuItem value="Hello">Hello</MenuItem> */}
                                </Select>
                            </FormControl>
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