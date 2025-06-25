// import {Student, Class, AttendanceRecord} from "../models/user.js";


// // Mark Attendance for a Student in a Class on a Given Date
// // const student = await Student.findByPk(studentId);
// // const classInstance = await Class.findByPk(classId);
// // await AttendanceRecord.create({
// //   date: new Date(date),
// //   present: true,
// //   StudentId: student.id,
// //   ClassId: classInstance.id
// // });


// // Get Attendance for a Student on a Specific Date
// export const attendance = await AttendanceRecord.findOne({
//   where: {
//     StudentId: studentId,
//     date: new Date(date)
//   }
// });


// // List Attendance for All Students in a Class
// export const classInstance = await Class.findByPk(classId, {
//   include: [{
//     model: AttendanceRecord,
//     include: [Student]
//   }]
// });

// // Get Attendance Summary for a Student
// export const Student = await Student.findByPk(studentId, {
//   include: [AttendanceRecord]
// });