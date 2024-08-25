const express = require('express');
const cors = require('cors');
const db = require('./config/db');


require('../initializeDB');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
