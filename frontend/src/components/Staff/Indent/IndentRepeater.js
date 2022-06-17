import "./Indent.css";
import IndentRepeaterList from "./IndentRepeaterList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
const IndentRepeater = () => {
  return (
    <div className="indent-main">
      <FilterSearch search />
      <div className="main-box">
        <div className="main-header">
          <h3>SEM1</h3>
        </div>
        <table className="indent-table-wrapper">
          <thead className="thead">
            <tr>
              <th>Subject</th>
              <th>SubjectCode</th>
              <th>TotalStudents</th>
              <th>Question Papers</th>
            </tr>
          </thead>
          <tbody>
            <IndentRepeaterList></IndentRepeaterList>
            <IndentRepeaterList></IndentRepeaterList>
            <IndentRepeaterList></IndentRepeaterList>
            <IndentRepeaterList></IndentRepeaterList>
            <IndentRepeaterList></IndentRepeaterList>
          </tbody>
        </table>
        <button className="submit">Submit</button>
      </div>
    </div>
  );
};

export default IndentRepeater;
