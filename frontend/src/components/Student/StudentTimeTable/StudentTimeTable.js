import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import StudentTimeTableList from "./StudentTimeTableList";
import "./StudentTimeTable.css";
const StudentTimeTable = () => {

    return (
        <div className="attendance-filter">
            <FilterSearch />
            <div className="attendance-main-box">
                <table className="marks-table">
                    <thead className="thead">
                        <tr>
                            <th>SubjectName</th>
                            <th>SubjectCode</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <StudentTimeTableList></StudentTimeTableList>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTimeTable;
