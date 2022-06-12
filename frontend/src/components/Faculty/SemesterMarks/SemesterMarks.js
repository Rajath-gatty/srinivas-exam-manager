import "./SemesterMarks.css";
import SemesterMarksList from "./SemesterMarksList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const SemesterMarks = () => {
    return (
        <div className="semester-main">
            <FilterSearch />

            <table className="semester-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Coding Sheet No</th>
                        <th>Bundle No</th>
                        <th>Semester</th>
                        <th>Java</th>

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
            <button className="submit">Submit</button>
        </div>

    );
};

export default SemesterMarks;
