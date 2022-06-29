import {CircularProgress} from "@mui/material";
import "./ExamcordTimeTable.css";
import Modal from "../../UI/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import {IoMdClose} from "react-icons/io";
import NoData from "../../UI/NoData/NoData";

const ExamcordTimeTable = () => {
    const [modal, setModal] = useState(false);
    const [timetables,setTimetables] = useState([]);
    const [loading,setLoading] = useState(true);
    const [details,setDetails] = useState([]);
    const [detailsLoading,setDetailsLoading] = useState(true);

    const fetchDetails = async(tId) => {
        try {
            const result = await axios.get(`examcoord/timetables/${tId}`);
            setDetails(result.data);
            setDetailsLoading(false);
        } catch(err) {
            console.log(err);
            setDetailsLoading(false);
        }
    }

    const toggleModal = (tId) => {
        setModal(!modal);
        if(typeof(tId)==='string') {
            setDetails([]);
            setDetailsLoading(true);
            fetchDetails(tId);
        }
    };

    useEffect(() => {
        const fetchTimetables = async() => {
            try {
                const result = await axios.get('examcoord/timetables');
                setTimetables(result.data);
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchTimetables();
    },[])

    const handleApprove = async(id) => {
        try {
            setLoading(true);
            const result = await axios.post(`examcoord/timetable/approve/${id}`);
            console.log(result);
            setTimetables(state => {
                return state.filter(item => item.t_id!==id);
            });
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }
    const handleReject = async(id) => {
        try {
            setLoading(true);
            const result = await axios.post(`examcoord/timetable/reject/${id}`);
            console.log(result);
            setTimetables(state => {
                return state.filter(item => item.t_id!==id);
            });
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="admin-timetable-main">
                <div className="admin-timetable-header">
                    <h1>Approve Timetable</h1>
                </div>
                <div className="exam-timetable-table-wrapper">
                    {/* <Skeleton rows={9} cols={7} profile /> */}
                    {!loading?<table className="admin-timetable-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Semester</th>
                                <th>Date</th>
                                <th>Details</th>
                                <th>Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                        {timetables.map(item => {
                            return (
                            <tr key={item.t_id}>
                                <td>{item.course_name}</td>
                                <td>{item.semester}</td>
                                <td>{item.created_at}</td>
                                <td><button className="open-modal" onClick={() => toggleModal(item.t_id)}> view</button></td>
                                <td className="approval">                                            
                                    <div className="flex approve-table-btn-wrapper gap-1">
                                        <button onClick={()=>handleApprove(item.t_id)} className="btn-outlined-green" >Approve</button><button onClick={()=>handleReject(item.t_id)}className="btn-outlined-red">Reject</button>
                                    </div>
                                </td>
                            </tr>
                            )
                        })}
                            {modal &&
                                <Modal onClose={toggleModal}>
                                <div className="modal">
                                <IoMdClose size={25} className="timetable-close-icon" onClick={toggleModal} />
                                    <div className="overlay">
                                    </div>
                                    <div className="modal-content">
                                    {!detailsLoading?<div className="admin-timetable-table-wrapper">
                                            <table className="examcoord-timetable-table">
                                                <thead >
                                                    <tr>
                                                        <th>SubjectName</th>
                                                        <th>SubjectCode</th>
                                                        <th>ExamDate</th>
                                                        <th>ExamTime</th>
                                                    </tr>
                                                </thead>
                                            <tbody>
                                                {details.map(item => (
                                                <tr key={Math.random()+Date.now()} className="timetable-modal">
                                                     <td>{item.subj_name}</td>
                                                     <td>{item.subj_code}</td>
                                                     <td>{item.exam_date}</td>
                                                     <td>{item.exam_time}</td>
                                                 </tr>
                                                ))}                                               
                                            </tbody>
                                            </table>
                                        </div>:<div className="flex"><CircularProgress thickness={4}/></div>}
                                    </div>
                                </div>
                                </Modal>}
                        </tbody>
                    </table>:<div style={{marginTop:100}} className="flex"><CircularProgress thickness={4}/></div>}
                    {!loading&&timetables.length<=0&&<NoData text="No timetable found"/>}
                </div>
            </div>

        </>
    )
}

export default ExamcordTimeTable;