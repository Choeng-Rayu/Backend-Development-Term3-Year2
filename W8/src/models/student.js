import { DataTypes } from 'sequelize';
import sequelize from "../db/database.js";


 const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    group: DataTypes.INTEGER,
    score: DataTypes.FLOAT
  }, {
    timestamps: false
  });

  export default Student;