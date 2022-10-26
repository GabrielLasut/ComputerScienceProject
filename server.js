
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const { PdfReader } = require("pdfreader");


http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
  
            var tempFilePath = files.filetoupload.filepath;
            var projectFilePath = __dirname + '/uploaded_file/' + "targetFile.pdf" //files.filetoupload.originalFilename;
            let textversion = __dirname + '/uploaded_file/' + "textverson.txt" 
                
                fs.rename(tempFilePath, projectFilePath, function (err) {
                if (err) throw err;
                res.write('File has been successfully uploaded' + projectFilePath);
                res.end();

                let holder = "";

                new PdfReader().parseFileItems(projectFilePath, (err, item) => {
                    if (err) console.error("error:", err);
                    else if (!item)
                    { 
                        console.log(holder);
                        // fs.writeFile('/uploaded_file/textversion.txt', holder)
                        fs.writeFile('./uploaded_file/textversion.txt', holder, function (err) {
                            if (err) throw err;
                            console.log('File is created successfully.');
                          });
                        console.warn("end of file");
                    }
                    else if (item.text){
                        holder += item.text + " ";
                    }
                    // { console.log(item.text);}
                  });
            });
        });
    }
    // else {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    //     res.write('<input type="file" name="filetoupload"><br>');
    //     res.write('<input type="submit">');
    //     res.write('</form>');
    //     return res.end();
    // }
}).listen(8080);
