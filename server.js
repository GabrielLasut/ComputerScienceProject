const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const {PdfReader} = require("pdfreader");
const {TableParser} = require("pdfreader")

let course_data = require("./course_data")
//console.log(course_data[0]);

const prompt = require('prompt');
let track = ""
prompt.start();

prompt.get(['track'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Track options');
  console.log("1.Traditional 2.Systems 3.Network and Telecommunication 4.Interactive Computing 5.Intelligent Systems 6.Cyber Security 7.Data Science");
  console.log('Track: ' + result.track);
  track = result.track
});

function onErr(err) {
  console.log(err);
  return 1;
}
 
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
                var rows = {}; // indexed by y-position
                var listStarted = false
                var courseDict = []
                var courseObject = {}
                var instructorList = []
                var courseListEndReached = false
                var pageChanged = false
                var semester = ""
                var isTransfer = false
                var transferCourseList = []
                var studentObject = {}
                function printRows() {
                    Object.keys(rows) // => array of y-positions (type: float)
                      .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
                      .forEach((y) => {

                        let value = String(rows[y]) 

            
                        if(listStarted){
                            //if line doesn't have keyword "Instructor"
                            if(String(rows[y][0]) !== "Instructor: "){
                                //console.log(rows[y] + " tan " + (rows[y][6] !== undefined ));

                                //if line has course name and properties
                                if(rows[y][1] !== undefined && rows[y][2] !== undefined && rows[y][3] !== undefined && rows[y][4] !== undefined && rows[y][5] !== undefined){
                                    
                                    if(!isEmpty(courseObject) && instructorList.length != 0){
                                        courseObject["instructor"] = [...instructorList]
                                        courseDict.push(courseObject)

                                        //console.log("course object-------------" + track);
                                        //console.log(JSON.stringify(courseObject));
                                        console.log("");
                                        
                                        courseObject = {}
                                        instructorList.length = 0
                                    }
                                    //console.log(rows[y][0] + "|" + rows[y][1] + " loco");
                                    courseObject["course_title"] = rows[y][0]
                                    courseObject["course_number"] = rows[y][1]
                                    courseObject["course_description"] = rows[y][2]
                                    courseObject["attempted_credit"] = rows[y][3]
                                    courseObject["earned_credit"] = rows[y][4]
                                    courseObject["grade"] = rows[y][5]
                                    courseObject["point"] = rows[y][6]
                                    courseObject["semester"] = semester

                                    if(isTransfer){
                                        if(String(rows[y][0]).includes("Course")){

                                        }else{
                                            transferCourseList.push(rows[y][0] + " " + rows[y][1])
                                            console.log("transfer course " + rows[y][1]);
                                        }
                                    }

                                //if line has only one instructor name
                                }else{
                                    if(rows[y][0] !== "Attempted"){
                                        instructorList.push(rows[y][0])
                                    }
                                }
                            //if line has keyword "Instructor"    
                            }else{
                                instructorList.push(rows[y][1])                                
                            } 
                        }

                        if(value.includes("Name:") && rows[y].length <= 2){
                            studentObject["name"] = rows[y][1]
                        }
                        if(value.includes("Student ID:") && rows[y].length <= 2){
                            studentObject["id"] = rows[y][1]
                        }

                        if(value.includes("Fall") || value.includes("Spring") || value.includes("Summer")){
                            semester = ""
                            let semester_string = rows[y][0].split(" ")
                            if(isNumeric(semester_string[0])){
                                //console.log("here" + semester_string[0][2] + semester_string[0][3]);
                                semester+=semester_string[0][2] + semester_string[0][3]
                            }

                            if(semester_string[1] === "Fall"){
                                semester+="F"
                            }else if(semester_string[1] === "Spring"){
                                semester+="S"
                            }else{
                                semester+="U"
                            }
                            
                        }

                        if(rows[y][0].split(" ").length == 2 && String(rows[y][0]) === "Transfer Credits"){
                            isTransfer = true
                        }

                        if(rows[y][0].split(" ").length == 3 && String(rows[y][0]) === "Academic Program History"){
                            isTransfer = false
                        }

 
                        if(value.includes("Course")){
                            //console.log("Course list started");
                            courseObject = {}
                            instructorList.length = 0
                            listStarted = true
                        }

                        if(value.includes("Attempted") && !value.includes("Course")){
                            if(pageChanged){
                                instructorList.pop()
                                instructorList.pop()
                                instructorList.pop()
                                pageChanged = false
                            }
                            courseObject["instructor"] = [...instructorList]
                            //console.log("course object-------------+");
                            //console.log(JSON.stringify(courseObject));
                            courseDict.push(courseObject)
                            courseObject = {}
                            instructorList.length = 0

                            //console.log("Course list ended" + value);
                            listStarted = false
                        }
                       
                        
                        /*
                        if(value.includes("Academic")){
                            console.log("This is the course dictionary \n")
                            //console.log(JSON.stringify(courseDict));
                            console.log("\n")
                            listStarted = false
                        }
                        if(listStarted === false){
                            console.log((rows[y] || []).join(''))
                        }
                        */

                    });
                }

                function addSpace(str) {
                    return str.split(' ').join('     ');
                }
                function isEmpty(obj) {
                    return Object.keys(obj).length === 0;
                }
                function isNumeric(str) {
                    if (typeof str != "string") return false // we only process strings!  
                    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
                  }
  
                new PdfReader().parseFileItems(projectFilePath, (err, item) => {
                    if (err) console.error("error:", err);
                    else if (!item || item.page)
                    { 
                        //console.log(holder);
                        
                        printRows();
                        //console.log("------Course Dictionary------");
                        //console.log(JSON.stringify(courseDict));
                        if(item !== undefined){
                            let pageNumber = parseInt(item.page)
                            //console.log('PAGE:', pageNumber);
                            if(pageNumber > 1){
                                pageChanged = true
                            }
                        } 
                        rows = {}; // clear rows for next page
                        let trackIndex = parseInt(track) - 1
                        audit(course_data[trackIndex], courseDict, transferCourseList, studentObject)                        
                        
                        fs.writeFile('./uploaded_file/textversion.txt', holder, function (err) {
                            if (err) throw err;
                            console.log('File is created successfully.');
                          });
                        //console.warn("end of file");
                    }
                    else if (item.text){
                        holder += item.text + " ";
                        (rows[item.y] = rows[item.y] || []).push(item.text);

                    }
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

    //audit(course_data[5], exampleCourseObject)

}).listen(8080);

function audit(courseObject, courseDict, transferCourseList, studentObject){
    console.log("Major track " + courseObject.title);
    let core_course = []
    let partial_course = []
    let elective_course = []
    let levelling_course = []
    courseDict.map((course)=>{
        let {course_title, course_number} = course
        course_number = parseInt(course_number)

        //console.log("course title: " + course_title + " course_number" + ": " + course_number);
        //check course in core list
        let coreLength = courseObject.core.length
        let counter = 0
        let isCore = false

        if(course_title !== undefined){

            //checking if course is core course
            while(counter < coreLength){
                if(courseObject.core[counter].course_title === course_title.trim() && parseInt(courseObject.core[counter].course_number) === course_number){
                    isCore = true
                    core_course.push(course)
                }
                counter+=1
            }

            //checking if track has partial core and adding to partial core
            let partialCoreLength = courseObject.partial_core.length
            counter = 0
            let isPartial = false
            if(partialCoreLength > 0){
                while(counter < partialCoreLength){
                    if(courseObject.partial_core[counter].course_title === course_title.trim() && parseInt(courseObject.partial_core[counter].course_number) === course_number){
                        isPartial = true
                        partial_course.push(course) 
                    }
                    counter+=1
                }
            }
            
            //inserting course into elective or levelling if not found in core or partial core
            if(isCore === false && isPartial === false){ 
                if(course_number < 6000){
                    levelling_course.push(course)   
                }else{
                    elective_course.push(course) 
                }
            }

        }

    })

    if(partial_course.length > 0){
        partial_course.sort((courseX, courseY) => parseFloat(courseX.point) > parseFloat(courseY.point) ? 1:-1)
        let counter = 0
        while(counter < parseInt(courseObject.partial_core_number)){
                if(partial_course.length > 0){
                    core_course.push(partial_course.pop())
                }else{
                    break
                }
            counter+=1
        }
        counter = 0
        while(counter < partial_course.length){
            elective_course.push(partial_course.pop())
            counter+=1
        } 
    } 

    
    console.log("Core course");
    console.log(core_course);
    //console.log("partial course");
    //console.log(partial_course);
    console.log("elective course");
    console.log(elective_course);
    //console.log("levelling course");
    //console.log(levelling_course); 
     

    let final_core_courses = []
    let final_elective_courses = []

    let counter = 0
    let core_total_credit_earned = 0.0
    let core_total_point = 0.0
    while(counter < core_course.length){
        if(core_course[counter].point !== undefined && core_course[counter].grade !== "P"){
            core_total_credit_earned += parseFloat(core_course[counter].earned_credit)
            core_total_point += parseFloat(core_course[counter].point)
        }

        final_core_courses.push(core_course[counter].course_title + core_course[counter].course_number)
        counter+=1
    }

    let core_gpa = core_total_point/core_total_credit_earned
 
    counter = 0
    let elective_total_credit_earned = 0.0
    let elective_total_point = 0.0
    while(counter < elective_course.length){
        if(elective_course[counter].point !== undefined && elective_course[counter].grade !== "P"){
            elective_total_credit_earned += parseFloat(elective_course[counter].earned_credit)
            elective_total_point += parseFloat(elective_course[counter].point)
        }

        final_elective_courses.push(elective_course[counter].course_title + elective_course[counter].course_number)
        counter+=1
    }


    let elective_gpa = elective_total_point/elective_total_credit_earned

    console.log("student name: ", studentObject.name);
    console.log("student id: ", studentObject.id);
    console.log("Core Courses: " + final_core_courses);
    console.log("Elective Courses: " + final_elective_courses);


    console.log("core gpa " + core_gpa);
    console.log("elective gpa " + elective_gpa);
    console.log("Combined gpa " + ((core_gpa+elective_gpa)/2));

    console.log("Outstanding requirement");
    let pass_require = []
    counter = 0
    while(counter < core_course.length){
        if(core_course[counter].point === undefined){
            pass_require.push(core_course[counter].course_title + core_course[counter].course_number)
        }
        counter+=1
    }

    counter = 0
    while(counter < elective_course.length){
        if(elective_course[counter].point === undefined){
            pass_require.push(elective_course[counter].course_title + elective_course[counter].course_number)
        }
        counter+=1
    } 

    if(pass_require.length > 0){
        console.log("The student must pass " + pass_require);
    }

    
    console.log("Transfer courses", transferCourseList);
    


}     

//cyber security track
let exampleCourseObject = [
    //core
    {
        course_title:"CS",
        course_number:"6324",
        point:"12.0",
        earned_credit:"3.0"
    },
    {
        course_title:"CS",
        course_number:"6378",
        point:"11.01",
        earned_credit:"3.0"
    },
    //partial
    {
        course_title:"CS",
        course_number:"6348",
        point:"12.0",
        earned_credit:"3.0"

    },
    {
        course_title:"CS",
        course_number:"6349",
        point:"8.01",
        earned_credit:"3.0"

    },
    {
        course_title:"CS",
        course_number:"6377",
        point:"9.99",
        earned_credit:"3.0"

    },
    //elective
    {
        course_title:"CS",
        course_number:"6375",
        point:"11.01",
        earned_credit:"3.0"

    },
    {
        course_title:"CS",
        course_number:"6390",
        point:"12.0",
        earned_credit:"3.0"

    }
]