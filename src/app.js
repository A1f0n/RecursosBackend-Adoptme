import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Imprime la variable de entorno para depuración
console.log('MONGO_URL:', process.env.MONGO_URL);

mongoose.connect("mongodb+srv://alfoo1:coderhouse@cluster0.agciy3m.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err.message);
});

app.use(express.json());
app.use(cookieParser());

// Configuración de CORS para permitir el puerto 3000
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
