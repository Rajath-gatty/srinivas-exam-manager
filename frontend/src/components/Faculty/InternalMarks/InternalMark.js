import "./InternalMarks.css";
import "./InternalList";
import InternalList from "./InternalList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const InternalMarks = () => {
  return (
    <div className="internal-main">
      <FilterSearch />

      <table className="internal-table-wrapper">
        <thead className="thead">
          <tr>
            <th>Profile</th>
            <th>RegNo.</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Java</th>
            <th>C++</th>
            <th>PHP</th>
          </tr>
        </thead>
        <tbody>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
        </tbody>
      </table>
    </div>
  );
};

export default InternalMarks;
