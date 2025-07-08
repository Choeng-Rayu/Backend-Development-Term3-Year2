import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';

dotenv.config();

const app = express();
app.use(express.json());

// Allow all origins (for dev)
app.use(cors());

// Or fine-tuned:
app.use(cors());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
// Example of a protected route
app.get('/only-authenticated', async (req, res) => {
    res.json({ message: 'You are authenticated!' });
});

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
});
