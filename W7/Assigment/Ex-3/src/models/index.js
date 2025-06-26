// This file re-exports models and sequelize from user.js for easy importing
import models from './user.js';

export const sequelize = models.sequelize;
export const Student = models.Student;
export const Class = models.Class;
export const AttendanceRecord = models.AttendanceRecord;
