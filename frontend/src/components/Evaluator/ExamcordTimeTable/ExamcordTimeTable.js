
import "./ExamcordTimeTable.css";

import { useState } from "react";
const ExamcordTimeTable = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="admin-timetable-main">
                <div className="admin-timetable-header">
                    <h1>Recent Timetable</h1>

                </div>
                <div className="admin-timetable-table-wrapper">
                    {/* <Skeleton rows={9} cols={7} profile /> */}
                    <table className="admin-timetable-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Semester</th>
                                <th>Details</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td>BCA</td>
                                <td>V</td>

                                <td><button className="open-modal" onClick={toggleModal}> view</button></td>
                                <td className="approval">Approved</td>
                            </tr>
                            {modal && (
                                <div className="modal">
                                    <div onClick={toggleModal} className="overlay">
                                    </div>
                                    <div className="modal-content">
                                        <div className="admin-timetable-table-wrapper">
                                            <table className="admin-timetable-table">
                                                <thead >

                                                    <tr>
                                                        <th>SubjectName</th>
                                                        <th>SubjectCode</th>
                                                        <th>ExamDate</th>
                                                        <th>ExamTime</th>

                                                    </tr>
                                                    <tr>
                                                        <td>HTML</td>
                                                        <td>3SU19SD62</td>
                                                        <td>10-09-2022</td>
                                                        <td>9:00-10:00</td>
                                                    </tr>


                                                </thead>
                                            </table>
                                            <div className="flex approve-table-btn-wrapper gap-1">
                                                <button className=" btn-green float-right" >Approve</button><button className="btn-red">Reject</button>
                                            </div>
                                            <button className="close-modal"
                                                onClick={toggleModal}>close</button>

                                        </div>
                                    </div>

                                </div>
                            )}

                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )
}

export default ExamcordTimeTable;