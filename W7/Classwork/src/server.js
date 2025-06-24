import sequelize from "./db/database.js"; 
import "./models/user.js"; // 👈 this line is critical

try {
  // TODO - Call sequelize.sync()
  const result = await sequelize.sync();
  console.log(result);

 
  // TODO -  Print the result of the sync on console

 
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
