import React from "react";
import axios from "axios";
import {Button, FilledInput} from "@mui/material"

export default function RequestFile(input){
    let readFile = (e) =>{
        let selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
        let formData = new FormData();
        formData.append("filetoupload", selectedFile);

        axios.post('http://localhost:8080/fileupload', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            }
        })
        }
    }
    return(
        <span>
                Audit this File: 
                <FilledInput type="file" color="cyan" accept="application/pdf" onChange={readFile} sx={{lm:21}}> Click to add File </FilledInput>
                <br/>
                <Button variant="contained" size="large" onClick={() => input.setButton(true)}> Click to read File </Button>
        </span>
    )
}