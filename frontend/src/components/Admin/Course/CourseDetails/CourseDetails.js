import "./CourseDetails.css";
import Back from "../../../UI/Back/Back";
import CourseDetailsTable from "./CourseDetailsTable";
import { useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const  CourseDetails = () => {
    const [semDetails,setSemDetails] = useState([]);
    const [resData,setResData] = useState([]);
    const [maxSem,setMaxSem] = useState("");

    const param = useParams();
    const reqData = {
        courseId: param.courseId,
        deptId: 11
    }

   
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await axios.post('/admin/course-details',reqData);
                setResData(result.data);
                console.log(resData);

                // Get max no. of sems dynamically
                resData.map(sems =>{
                    var semNum = sems.sem_name.replace("SEM ","");
                    if(semNum >= maxSem){
                        setMaxSem(semNum)
                    }
                })
            } catch(err) {
                console.log(err);
            }
        }
        fetchCourses();

        for(var i=1; i<=maxSem; i++){
            var semNum = "SEM " + i; 
            var tmpArr = resData.filter(obj => obj.sem_name === semNum)

            if(Object.keys(semDetails).length === 0){
                semDetails.push({semNo:semNum, value:tmpArr})
            } 
            else{
                if(semDetails[i-2].semNo !== semNum){
                    semDetails.push({semNo:semNum, value:tmpArr})
                }
            }
        }
    },[maxSem])
    console.log(semDetails)

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
            {
                semDetails.map(obj =>{
                    console.log(obj);
                    return (
                        <CourseDetailsTable sem={obj}/>
                    )
                })
            }
        </div>
      </div>
     )
}

export default CourseDetails;
