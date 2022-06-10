import "./CourseDetails.css";
import Back from "../../../UI/Back/Back";
import CourseDetailsTable from "./CourseDetailsTable";
import { useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const  CourseDetails = () => {
    const [semDetails,setSemDetails] = useState([]);
    const param = useParams();
    const reqData = {
        courseId: param.courseId,
        deptId: 11
    }

    useEffect(() => {
        const fetchCourses = async() => {
            try {
                const result = await axios.post('/admin/course-details',reqData);
                console.log(result.data);
                setSemDetails(result.data);
            //    const newArr= result.data.reduce((acc,cur,i) => {
            //       return  [{
            //             semName:cur.sem_name,
            //             subjects: [{subjName:cur.subj_name,subjCode:cur.subj_code}]
            //         }]
            //     },{})
            //     console.log(newArr);
            } catch(err) {
                console.log(err);
            }
        }
        fetchCourses();
    },[])

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

// data = [
//     {
//         semName: 'SEM 1',
//         value: [{subj_name:'HTML',subj_code:'19BCASD23'},{subj_name:'HTML', subj_code:'19BCASD23'}]
//     }
// ]
