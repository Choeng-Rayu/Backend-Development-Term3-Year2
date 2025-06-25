import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Student = sequelize.define('Student', {
  name: DataTypes.STRING
});

const Class = sequelize.define('Class', {
  name: DataTypes.STRING
});

const AttendanceRecord = sequelize.define('AttendanceRecord', {
  date: DataTypes.DATE,
  present: DataTypes.BOOLEAN
});



// Get Attendance for a Student on a Specific Date
export const attendance = await AttendanceRecord.findOne({
  where: {
    StudentId: studentId,
    date: new Date(date)
  }
});


// List Attendance for All Students in a Class
export const classInstance = await Class.findByPk(classId, {
  include: [{
    model: AttendanceRecord,
    include: [Student]
  }]
});

// Get Attendance Summary for a Student
export const student = await Student.findByPk(studentId, {
  include: [AttendanceRecord]
});

// Many-to-many between Student and Class
Student.belongsToMany(Class, { through: 'StudentClass' });
Class.belongsToMany(Student, { through: 'StudentClass' });

// AttendanceRecord relationships
AttendanceRecord.belongsTo(Student);
AttendanceRecord.belongsTo(Class);
Student.hasMany(AttendanceRecord);
Class.hasMany(AttendanceRecord);

export {Student, Class, AttendanceRecord}

