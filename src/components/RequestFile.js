import React from "react";
import axios from "axios";
export default function RequestFile(input){
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
    return(
        <span>
            <input type="file" accept="application/pdf" onChange={readFile}/>
            <button onClick={() => input.setButton(true)}> Select to read File </button>
        </span>
    )
}