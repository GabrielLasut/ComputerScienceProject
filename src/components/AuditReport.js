import React from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
export default function AuditReport(input){
    console.log(input.file)
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return(
        <div>
            file here
            {
            // console.log(input.file)
            // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            // console.log(input.file) &&
            // <Viewer fileUrl={input.file}
            // plugins={[defaultLayoutPluginInstance]}></Viewer>
            // </Worker>
            }
            <embed src={input.file} className="pdfView"/>
        </div>
    )
}