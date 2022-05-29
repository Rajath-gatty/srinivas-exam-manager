import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import AttendanceStatementList from "./AttendanceStatementList";
const AttendanceStatement = () => {
   return (
      <div className="attendance-main">
         <FilterSearch />
         <table className="attendance-table-wrapper">
            <thead className="thead">
               <tr>
                  <th>Subject Name</th>
                  <th>Subject Code</th>
                  <th>Total No Students</th>
                  <th>No of absenties</th>
                  <th>Date</th>
               </tr>
            </thead>
            <tbody>
               <AttendanceStatementList></AttendanceStatementList>
               <AttendanceStatementList></AttendanceStatementList>
               <AttendanceStatementList></AttendanceStatementList>
            </tbody>
         </table>
      </div>
   );
}

export default AttendanceStatement;