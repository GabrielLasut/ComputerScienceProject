
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
var pdfUtil = require('pdf-to-text');
const { PdfReader } = require("pdfreader");
const express = require("express")
const app = express()


http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
  
            var tempFilePath = files.filetoupload.filepath;
            var projectFilePath = __dirname + '/uploaded_file/' + "targetFile.pdf" //files.filetoupload.originalFilename;
                
                fs.rename(tempFilePath, projectFilePath, function (err) {
                if (err) throw err;
                res.write('File has been successfully uploaded' + projectFilePath);
                res.end();

                new PdfReader().parseFileItems(projectFilePath, (err, item) => {
                    if (err) console.error("error:", err);
                    else if (!item) console.warn("end of file");
                    else if (item.text) console.log(item.text);
                  });
            });
        });
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);
