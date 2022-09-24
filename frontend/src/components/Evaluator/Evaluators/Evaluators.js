import "./Evaluators.css";
import EvaluatorsList from "./EvaluatorsList";

import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const Evaluators = () => {
    return (
        <div className="eval-main">
            <div className="eval-header">
                <h1>Evaluators</h1>
                <Link to="/evaluators/assign" className="eval-button flex gap-sm">
                    <HiPlus size={20} />
                    <span>Assign Faculty</span>
                </Link>
            </div>

            <table className="eval-table-wrapper">
                <thead className="thead">
                    <tr>
                        <th>Course</th>
                        <th>Semester</th>
                        <th>Faculty</th>
                        <th>Subject</th>
                        <th>Evaluator</th>
                    </tr>
                </thead>
                <tbody>
                    <EvaluatorsList />
                </tbody>
            </table>
        </div>
    );
};

export default Evaluators;




