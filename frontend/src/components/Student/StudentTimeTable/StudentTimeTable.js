import { useState, useEffect } from "react";
import {HiDownload} from "react-icons/hi";
import {useContextData} from "../../../hooks/useContextData";
import "./StudentTimeTable.css";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import {toast} from "react-toastify";

const StudentTimeTable = () => {
    const [timetable, setTimetable] = useState([]);
    const [loading,setLoading] = useState(false);
    const {user} = useContextData();
    console.log(user);
    const semester = user.semester;
    const courseId = user.courseId;
    
    useEffect(() =>{
        const fetchTimetables = async () => {
            try {
                setLoading(true);
                const result = await axios.post('/student/timetable',{semester, courseId,classId:user.classId});
                setTimetable(result.data);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchTimetables();
    },[])

    const handleHallticket = async () =>{
        if(user.eligibility){
            try {
                const result = await axios.post('student/hallticket',{classId:user.classId},{responseType:"blob"});
                fileDownload(result.data,`${user.first_name+'-'+user.last_name}-SEM-${user.semester}-hallticket.pdf`);
                const blob = new Blob([result.data], { type: 'application/pdf' });
                const objectUrl = window.URL.createObjectURL(blob);
                console.log(result.data);
                window.open(objectUrl);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }else{
            toast.error("User Not Eligible!")
        }
    }
    
    return (
        <div className="student-timetable-container">
            <div className="timetable-header flex">
                <h1>Time Table</h1>
                <div className="btn-outlined flex" onClick={handleHallticket}>
                    <HiDownload size={25}/>
                    <span>Download Hall Ticket</span>
                </div>
            </div>

            <div className="attendance-main-box">
                <table className="timetable-table">
                    <thead className="thead">
                        <tr>
                            <th>SubjectName</th>
                            <th>SubjectCode</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    {!loading && <tbody>
                        {timetable.map(obj =>{
                            return(<tr className="timetable-row" key={Math.random()+Date.now()+obj.subj_code}>
                                <td>{obj.subj_name}</td>
                                <td>{obj.subj_code}</td>
                                <td>{obj.exam_date}</td>
                                <td>{obj.exam_time}</td>
                            </tr>)
                        })}
                    </tbody>}
                </table> 
                {loading && <div style={{marginTop:140}} className="flex"><CircularProgress thickness={4}/></div>}
            </div>
        </div>
    );
};

export default StudentTimeTable;
