
// import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Button, Typography} from "@mui/material"
import Pdf from "../businesscard.pdf"

export default function AuditReport(){
//core_gpa ,final_core_courses,final_elective_courses , elective_gpa
    return(
        // <p>{data}</p>
        <Typography >
            <div style={{marginTop:10}}>
            Download Audit Report: 
            <Button variant="contained" size="small" href={Pdf} target="_blank" download>
                Click Button to download
            </Button>
            </div>
            <object data={Pdf} type="application/pdf" className='pdf-container'></object>
        </Typography>
        // <a href={Pdf} target="_blank" download> click to download</a>
    );
}










