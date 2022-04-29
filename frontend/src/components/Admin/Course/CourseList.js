import {BiEditAlt} from "react-icons/bi";
import {Link} from "react-router-dom";
const CourseList = () => {
    return(
        <tr>
                <td>BCA</td>
                <td>3 years</td>
                <td>6 Semesters</td>
                <td><Link to="/courses/course-details">view</Link></td>
                <td>
                    <button className="course-edit-btn btn-outlined flex">
                        <BiEditAlt size={15} color="var(--primary-color) :hover{color:var(--white)}"/>
                        <span>Edit</span>
                    </button>
                </td>
        </tr>
    )
}

export default CourseList;