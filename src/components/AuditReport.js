
// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import '../uploaded_file/textversion.txt'
import {Button, Typography} from "@mui/material"
// import Pdf from "../uploaded_file/targetFile.pdf"
import Pdf from "../businesscard.pdf"

export default function AuditReport(){

//core_gpa ,final_core_courses,final_elective_courses , elective_gpa
    return(
        // <p>{data}</p>
        <Typography>
            Download Audit Report: 
            <Button variant="contained" href={Pdf} target="_blank" download>
                Click Button to download
            </Button>
        </Typography>
        // <a href={Pdf} target="_blank" download> click to download</a>
    );
}










