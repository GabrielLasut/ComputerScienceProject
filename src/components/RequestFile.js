import React from "react";
export default function RequestFile(input){
    let readFile = (e) =>{
        // input.setFile(document.getElementById("file"))
        let selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
          input.setFile(e.target.result);
        }
    }
    return(
        <span>
            <input type="file" accept="application/pdf" onChange={readFile}/>
            <button onClick={() => input.setButton(true)}> Select to read File </button>
        </span>
    )
}