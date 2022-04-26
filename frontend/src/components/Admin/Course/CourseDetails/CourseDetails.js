import "./CourseDetails.css";
import Back from "../../../UI/Back/Back";
import CourseDetailsTable from "./CourseDetailsTable";

const  CourseDetails = () => {
     return(
        <div className="course-details-main">
        <div className="course-details-header">
            <Back/>
            <div className="course-details-content">
                <h2>BCA</h2>
                <p>3 Years</p>
            </div>
        </div>
        <div className="course-details-table-wrapper">
            <CourseDetailsTable/>
            <CourseDetailsTable/>
            <CourseDetailsTable/>
            <CourseDetailsTable/>
        </div>
      </div>
     )
}

export default CourseDetails;