const express = require('express');
const cors = require('cors');
const db = require('./config/db');


require('../initializeDB');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes')

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'https://tasks-manager-frontend.vercel.app/'
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
