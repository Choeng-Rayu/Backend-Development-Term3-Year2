import sequelize from "./db/database.js"; 
// import {Student, Class, AttendanceRecord} from "./models/user.js"; // 👈 this line is critical
const express = require('express');
import {AttendanceRecord, ClassInstance, Student} from '../src/Controller/actions.js'
const app = express();
app.use(express.json());

try {
  // TODO - Call sequelize.sync()
 
  // TODO -  Print the result of the sync on console
  // await sequelize.sync();
  // const student = await Student.findByPk(studentId);
  // const classInstance = await Class.findByPk(classId);
  // await AttendanceRecord.create({
  //   date: new Date(date),
  //   present: true,
  //   StudentId: student.id,
  //   ClassId: classInstance.id
  // });


  
  // Mark attendance
  app.post('/attendance', async (req, res) => {
    const { studentId, date } = req.query;
    const { classId, present } = req.body;
    const attendance = await AttendanceRecord.create({
      date: new Date(date),
      present,
      StudentId: studentId,
      ClassId: classId
    });
    res.json(attendance);
  });

  // Get attendance for a student on a specific date
  app.get('/attendance', async (req, res) => {
    const { studentId, date } = req.query;
    const attendance = await AttendanceRecord.findOne({
      where: {
        StudentId: studentId,
        date: new Date(date)
      }
    });
    res.json(attendance);
  });

  // List attendance for all students in a class
  app.get('/classes/:id/attendance', async (req, res) => {
    const classInstance = await Class.findByPk(req.params.id, {
      include: [{
        model: AttendanceRecord,
        include: [Student]
      }]
    });
    res.json(classInstance);
  });

  // Get attendance summary for a student
  app.get('/students/:id/attendance', async (req, res) => {
    const student = await Student.findByPk(req.params.id, {
      include: [AttendanceRecord]
    });
    res.json(student);
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
 
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

