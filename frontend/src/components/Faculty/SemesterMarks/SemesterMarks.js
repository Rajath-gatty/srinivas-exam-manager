import "./SemesterMarks.css";
import SemesterMarksList from "./SemesterMarksList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";


const SemesterMarks = () => {
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
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                    <SemesterMarksList></SemesterMarksList>
                </tbody>
            </table>
        </div>
    );
};

export default SemesterMarks;
