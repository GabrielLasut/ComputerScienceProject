/*import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function RequestFile(input){
    const [data, setData] = useState([]);
    let readFile = (e) =>{
        // input.setFile(document.getElementById("file"))
        let selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
        //   input.setFile(e.target.result);
        // console.log(e.target.result);
        let formData = new FormData();
        formData.append("filetoupload", selectedFile);

        axios.post('http://localhost:8080/fileupload', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            }
        });
        }
    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setData(reader.result)
            const arr = data.split(/\r?\n/);
            console.log(arr[0])
        }
        Regexfunc(data);
        reader.onerror = () => {
            console.log('file error', reader.error)
        }
    }
    
    const Regexfunc = (e) =>{   
        let regex = /hi/i;
        console.log(regex.test(data[0]));
    }
    
    
    return(
        <span>
            <input type="file" accept="application/pdf" onChange={readFile}/>
            <button onClick={() => input.setButton(true)}> Select to read File </button>
            <input type="file" accept="application/txt"onChange={handleFileChange} /> 
                <p> {data} </p> 
        </span>
    )
}
*/
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