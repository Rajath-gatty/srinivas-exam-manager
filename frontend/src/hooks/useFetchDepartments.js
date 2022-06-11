import { useState,useEffect } from "react";
import axios from "axios";
export const useFetchDepartment = () => {
    const [data,setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios.get('/departments');
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
