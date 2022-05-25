import EvaluatorsList from "./EvaluatorsList";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import "./Evaluators.css";
const Evaluators = (props) => {
    return (

        <div className="attendance-main">
            <Link to="/assign-faculty">
                <button className="attendance-button">
                    <HiPlus size={20} />
                    <span>AssignFaculty</span>
                </button>
            </Link>
            <table className="attendance-table">
                <thead className="attendance-thead">
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
                    <EvaluatorsList />
                    <EvaluatorsList />
                    <EvaluatorsList />
                    <EvaluatorsList />

                </tbody>
            </table>
        </div>
    )
}

export default Evaluators;