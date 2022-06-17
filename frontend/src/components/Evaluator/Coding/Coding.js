import "./Coding.css";
import CodingList from "./CodingList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";

const Coding = () => {
    return (
        <div className="coding-main">
            <FilterSearch />

            <table className="coding-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>RegNo.</th>
                        <th>Coding sheet No</th>
                        <th>Bundle No</th>
                    </tr>
                </thead>
                <tbody>
                    <CodingList />
                    <CodingList />
                    <CodingList />
                    <CodingList />
                    <CodingList />

                </tbody>
            </table>
            <button className="submit">Submit</button>
        </div>
    );
};

export default Coding;
