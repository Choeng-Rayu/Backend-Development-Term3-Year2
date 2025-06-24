import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";


// TODO - Create the model User  (attributes name and age)

// try {
//   await sequelize.authenticate();
//   console.log("Success");

// } catch (error) {
//   console.error("Error", error);
// }


const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER
});

export default Student;



// TODO - Export the model User


