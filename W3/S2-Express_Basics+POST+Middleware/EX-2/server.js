// // server.js
// import express from 'express';
// import courses from "./course.js";
// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/departments/:dept/courses', (req, res) => {
//     const { dept } = req.params;
//     const { level, minCredits, maxCredits, semester, instructor } = req.query;
//     // Implementing the filter logic
//     // Hint: Use the filter method to filter the courses array based on the provided criteria
//     let filteredCourses = courses.filter(courses =>courses.department === dept);
//     if(minCredits && isNaN(Number(minCredits)) || maxCredits && isNaN(Number(maxCredits)) || minCredits && maxCredits && minCredits < 0 || maxCredits < 0){

//         return res.status(400).send('Invalid Credits');
//     }
//     if(level){
//         filteredCourses = filteredCourses.filter(courses => courses.level === level);
//     }
//     if(minCredits){
//         filteredCourses = filteredCourses.filter(courses => courses.credits >= minCredits);
//     }
//     if(maxCredits){
//         filteredCourses = filteredCourses.filter(courses => courses.credits <= maxCredits);
//     }
//     if(semester){
//         filteredCourses = filteredCourses.filter(courses => courses.semester === semester);
//     }
//     if(instructor){
//         filteredCourses = filteredCourses.filter(courses => courses.instructor === instructor);
//     }
//     //res.send.json(filteredCourses);
//     if(filteredCourses.length === 0){
//         return res.status(400).send('No courses found');
//     }
//     //res.send(filteredCourses
//     // res.send(JSON.stringify(filteredCourses));
//     res.json(filteredCourses);
        
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });































// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function logger( req, res, next){
    console.log(`Recieve request method: ${req.method} \nFrom Path: ${req.url} \nQuery parameters ${JSON.stringify(req.query)} \nat time: [ ${new Date().toISOString()} ]`);
    next();
}
function validateQueryParameters(req, res, next){
    const {minCredits, maxCredits} = req.query;
    if(
        minCredits && isNaN(Number(minCredits)) || 
        maxCredits && isNaN(Number(maxCredits)) || 
        minCredits && maxCredits && minCredits < 0 && maxCredits < 0 || 
        minCredits && maxCredits && minCredits >= maxCredits
    ){
        return res.status(400).send('Error Invalid Credits');
    }
    next();
}
function validateTokenAPI(req, res, next){
    const {token} = req.query;
    const TOKEN_KEY = 'xyz123';
    if (token === TOKEN_KEY){
        return next();
    }else {
        return res.status(401).send('Error Invalid Token/ Unauthorized.');
    }
}
app.use(logger);

app.get('/departments/:dept/courses', validateQueryParameters, validateTokenAPI, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    let filteredCourses = courses.filter(courses =>courses.department === dept);
    if(level){
        filteredCourses = filteredCourses.filter(courses => courses.level === level);
    }
    if(minCredits){
        filteredCourses = filteredCourses.filter(courses => courses.credits >= minCredits);
    }
    if(maxCredits){
        filteredCourses = filteredCourses.filter(courses => courses.credits <= maxCredits);
    }
    if(semester){
        filteredCourses = filteredCourses.filter(courses => courses.semester === semester);
    }
    if(instructor){
        filteredCourses = filteredCourses.filter(courses => courses.instructor === instructor);
    }
    //res.send.json(filteredCourses);
    if(filteredCourses.length === 0){
        return res.status(400).send('No courses found');
    }
    //res.send(filteredCourses
    // res.send(JSON.stringify(filteredCourses));
    res.json(filteredCourses);
        
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
