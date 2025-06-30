import Student from './models/student.js';
import sequelize from "./db/database.js";
import { Op } from "sequelize";

// Sync database and seed data
await sequelize.sync({ force: true });

// Seed 20 mock students
await Student.bulkCreate([
  { name: 'Alice', age: 22, group: 2, score: 55 },
  { name: 'Bob', age: 21, group: 1, score: 40 },
  { name: 'Charlie', age: 23, group: 2, score: 62 },
  { name: 'Dara', age: 24, group: 5, score: 58 },
  { name: 'Eric', age: 25, group: 5, score: 45 },
  { name: 'Fanny', age: 22, group: 3, score: 72 },
  { name: 'George', age: 24, group: 2, score: 80 },
  { name: 'Hannah', age: 20, group: 1, score: 50 },
  { name: 'Ivy', age: 23, group: 5, score: 90 },
  { name: 'Jack', age: 22, group: 2, score: 49 },
  { name: 'Kali', age: 24, group: 2, score: 70 },
  { name: 'Leo', age: 26, group: 5, score: 65 },
  { name: 'Mina', age: 22, group: 5, score: 52 },
  { name: 'Nico', age: 21, group: 3, score: 61 },
  { name: 'Olga', age: 23, group: 2, score: 45 },
  { name: 'Paul', age: 24, group: 2, score: 95 },
  { name: 'Quin', age: 22, group: 5, score: 35 },
  { name: 'Rita', age: 23, group: 4, score: 76 },
  { name: 'Sara', age: 24, group: 2, score: 88 },
  { name: 'Tom', age: 23, group: 5, score: 60 },
]);

// TODO : 
// Find the students whose:
// -age between 22 and 24
// - group is 2 or 5
// - score >= 50
const results = await Student.findAll({
  where: {
    // Your job
    age: {
      [Op.between]: [22, 24]
    },
    group: {
      [Op.in]: [2, 5]
    },
    score: {
      [Op.gte]: 50
    }
  }
});

console.log("Students matching the criteria:");
results.forEach(student => {
  console.log(`${student.name} (age ${student.age}, group ${student.group}, score ${student.score})`);
});

await sequelize.close();
