import { useState,useEffect } from "react";
import axios from "axios";
export const useFetchCourses = (deptId) => {
    const [data,setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios.post('/courses',{deptId});
          const data = await resp?.data;
          setData(data);
        } catch (error) {
            console.log(error);
        }
      };
  
      fetchData();
    }, []);
  
    return data;
  };