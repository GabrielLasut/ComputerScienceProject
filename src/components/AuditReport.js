
import React from "react";
import jsPDF from 'jspdf'
import {exportcore_gpa,exportfinal_core_courses,exportfinal_elective_courses,exportelective_gpa} from  "../server.js"
export default function AuditReport(){
let pdfGenerate=()=>{
    var doc=new jsPDF('landscape','px','a4','false');
    doc.text({exportcore_gpa}, 10, 10);
    doc.text({exportfinal_core_courses,}, 10, 10);
    doc.text({exportfinal_elective_courses}, 10, 10);
    doc.text({exportelective_gpa}, 10, 10);
    doc.save("a4.pdf");
}


//core_gpa ,final_core_courses,final_elective_courses , elective_gpa
    return(
        <div style={{textAlign:'center'}}> <br/>
           <button onClick={pdfGenerate}> Download pdf
               </button>
        </div>
    );
}











