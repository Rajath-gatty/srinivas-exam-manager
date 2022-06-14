import FilterSearch from "../../UI/FilterSearch/FilterSearch";
import PromoteList from "./PromoteList";
import "./Promote.css";
const Promote = () => {
    return (
        <div className="promote-main">
            <FilterSearch />
            <table className="promote-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Profile</th>
                        <th>RegNo</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody>
                    <PromoteList></PromoteList>
                    <PromoteList></PromoteList>
                    <PromoteList></PromoteList>
                    <PromoteList></PromoteList>
                    <PromoteList></PromoteList>
                </tbody>
            </table>
            <button className="promote-submit">Submit</button>
        </div>
    );
}

export default Promote;