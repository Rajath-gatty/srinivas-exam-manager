
import "./AttendanceStatement.css";
import AttendanceStatementList from "./AttendanceStatementList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const AttendanceStatement = () => {
   return (
      <div className="evaluator-main">
         <FilterSearch />

         <table className="evaluator-table-wrapper">
            <thead className="thead">
               <tr>
                  <th>SubjectName</th>
                  <th>SubjectCode</th>
                  <th>Total No Students</th>
                  <th>No of absenties</th>
                  <th>Date</th>
               </tr>
            </thead>
            <tbody>
               <AttendanceStatementList></AttendanceStatementList>

            </tbody>
         </table>
      </div>
   );
};

export default AttendanceStatement;




