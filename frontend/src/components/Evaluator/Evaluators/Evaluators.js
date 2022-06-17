






import "./Evaluators.css";
import EvaluatorsList from "./EvaluatorsList";

import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const Evaluators = () => {
    return (
        <div className="eval-main">
            <Link to="/evaluators/assign">
                <button className="eval-button">
                    <HiPlus size={20} />
                    <span>AssignFaculty</span>
                </button>
            </Link>

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
                    <EvaluatorsList></EvaluatorsList>

                </tbody>
            </table>
        </div>
    );
};

export default Evaluators;




