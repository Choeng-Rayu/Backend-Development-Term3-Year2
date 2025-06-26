import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Student;
};