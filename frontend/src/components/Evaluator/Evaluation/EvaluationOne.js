import "./Evaluation.css";
import EvaluationList from "./EvaluationList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
const EvaluationOne = () => {
    return (
        <div className="evaluation-main">
            <FilterSearch />

            <table className="evaluation-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Coding Sheet No</th>
                        <th>HTML</th>
                        <th>JAVA</th>
                        <th>PHP</th>
                        <th>C++</th>
                        <th>MySQL</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <EvaluationList></EvaluationList>
                    <EvaluationList></EvaluationList>
                    <EvaluationList></EvaluationList>
                    <EvaluationList></EvaluationList>

                </tbody>
            </table>
        </div>


    )
}

export default EvaluationOne;