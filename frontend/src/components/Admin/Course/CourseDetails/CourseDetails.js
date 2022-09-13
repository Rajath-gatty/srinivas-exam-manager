import "./CourseDetails.css";
import Back from "../../../UI/Back/Back";
import CourseDetailsTable from "./CourseDetailsTable";
import { useEffect,useState} from "react";
import {useParams,useLocation} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import axios from "axios";

const  CourseDetails = () => {
    const [semDetails,setSemDetails] = useState([]);
    const [loading,setLoading] = useState(false);
    const param = useParams();
    const location = useLocation();
    console.log(location)
    useEffect(() => {
        const fetchCourses = async () => {
            const reqData = {
                courseId: param.courseId
            }
            try {
                setLoading(true);
                const result = await axios.post('/admin/course-details',reqData);
                const newArr = result.data.reduce((acc,cur) =>{
                        if(acc.some((item) => item.semName===cur.sem_name)) {
                            acc.forEach((item,i) =>{
                                if(item.semName===cur.sem_name) {
                                    acc[i].value.push({subName:cur.subj_name,subCode:cur.subj_code})
                                }
                            })
                        } else {
                            acc.push({
                                semName:cur.sem_name,
                                value:[{subName:cur.subj_name,subCode:cur.subj_code}]
                            })
                        }
                    return acc;
                },[])
                setSemDetails(newArr);
                setLoading(false);
                // Get max no. of sems dynamically
                // resData.forEach(sems =>{
                //     var semNum = parseInt(sems.sem_name.replace("SEM ",""));
                //     if(semNum >= maxSem){
                //         setMaxSem(semNum)
                //     }
                // })
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchCourses();

        // for(var i=1; i<=maxSem; i++){
        //     let semNum = "SEM " + i; 
        //     let tmpArr = resData.filter(obj => obj.sem_name === semNum)

        //     if(Object.keys(semDetails).length === 0){
        //         // semDetails.push({semNo:semNum, value:tmpArr})
        //         setSemDetails([...semDetails,{semNo:semNum, value:tmpArr}])
        //     }
        //     else{
        //         if(semDetails[i-2].semNo !== semNum){
        //             // semDetails.push({semNo:semNum, value:tmpArr})
        //             setSemDetails([...semDetails,{semNo:semNum, value:tmpArr}])
        //         }
        //     }
        // }
    },[param.courseId])

     return(
        <div className="course-details-main">
        <div className="course-details-header">
            <Back/>
            <div className="course-details-content">
                <h2>{location.state.courseName}</h2>
            </div>
        </div>
        {!loading?<div className="course-details-table-wrapper">
            {
               semDetails.map(obj =>{
                    return (
                        <CourseDetailsTable key={Math.random()+Date.now()} sem={obj}/>
                    )
                })
            }
        </div>:<div style={{marginTop:150}} className="flex"><CircularProgress thickness={4}/></div>}
      </div>
     )
}

export default CourseDetails;