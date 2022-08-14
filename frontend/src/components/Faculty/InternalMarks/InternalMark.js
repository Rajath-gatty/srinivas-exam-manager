import "./InternalMarks.css";
import InternalList from "./InternalList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import { toast } from "react-toastify";

const InternalMarks = () => {

  const HandleMarksSubmit = () =>{
    toast.success("Internals Marks Updated!", {
      isLoading: false, 
      autoClose: 3000, 
      closeOnClick: true,
      draggable: true
    });
  }

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

          </tr>
        </thead>
        <tbody>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>
          <InternalList></InternalList>

        </tbody>
      </table>
      <button onClick={HandleMarksSubmit} className="submit">Submit</button>
    </div>
  );
};

export default InternalMarks;
