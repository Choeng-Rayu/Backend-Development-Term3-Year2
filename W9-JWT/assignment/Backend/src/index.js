import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import db from './models/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Change Swagger docs route from /docs to /api-docs for standard access
// app.use('/api-docs', serveSwagger, setupSwagger);

app.use(express.json());

// Allow all origins (for dev)
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

// Or fine-tuned:
// app.use(cors());

// Swagger UI
app.use('/api/docs', serveSwagger, setupSwagger);

// Routes
app.use('/api/auth', authRoutes);

// Protected routes with /api prefix
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);

app.get('/', (req, res) => res.send('Welcome to School API!'));

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
}).catch(err => {
    console.error('Sequelize sync error:', err);
});

const User = db.User;
