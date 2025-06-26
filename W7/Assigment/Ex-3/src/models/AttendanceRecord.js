import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const AttendanceRecord = sequelize.define('AttendanceRecord', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return AttendanceRecord;
};