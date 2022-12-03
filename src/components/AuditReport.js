
import React, {useEffect, useState} from "react";
import axios from "axios";
export default function AuditReport(){
const[data, setData] = useState(null);
useEffect(() => {
    axios.post(("http://localhost:8080/fileupload").then((resp) => {
            setData(resp);
        }));
    },[]);


//core_gpa ,final_core_courses,final_elective_courses , elective_gpa
    return(
        <p>{data}</p>
        

    );
}










