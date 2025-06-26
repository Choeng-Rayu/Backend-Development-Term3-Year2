import express, { json } from 'express';
import { sequelize, Student, Class } from './models/index.js';
import attendanceRoutes from './route/Attendace.js';

const app = express();
app.use(json());

// Mount routes
app.use('/attendance', attendanceRoutes);
const port = 3000;
// Sync database and start server
sequelize.sync({ force: true }).then(async () => {
  // Create a student and include a class after tables are created
  await Student.create({
    name: 'Ronan The Best',
    Classes: [
      { name: 'Math' }
    ]
  }, { include: [Class] });

  app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});