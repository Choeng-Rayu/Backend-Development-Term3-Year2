import express from 'express';
import ArticleRoutes from './routes/ArticleRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import journalistRoutes from './routes/journalistRoutes.js';

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.json(articles)
// });

app.use(express.urlencoded({ extended: true }));
app.use('/categories/', categoriesRoutes);
app.use('/articles/', ArticleRoutes);
app.use('/journalists/', journalistRoutes);
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});