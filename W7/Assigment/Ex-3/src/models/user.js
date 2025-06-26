import { Sequelize } from 'sequelize';
import createStudent from './Student.js';
import createClass from './Class.js';
import createAttendanceRecord from './AttendanceRecord.js';
import sequelize from "../db/database.js";

const Student = createStudent(sequelize);
const Class = createClass(sequelize);
const AttendanceRecord = createAttendanceRecord(sequelize);

// Define relationships
Student.belongsToMany(Class, { through: 'StudentClass' });
Class.belongsToMany(Student, { through: 'StudentClass' });

AttendanceRecord.belongsTo(Student);
AttendanceRecord.belongsTo(Class);
Student.hasMany(AttendanceRecord);
Class.hasMany(AttendanceRecord);

// Export models and sequelize instance
export default {
  sequelize,
  Student,
  Class,
  AttendanceRecord
};