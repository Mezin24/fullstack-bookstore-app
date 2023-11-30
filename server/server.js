import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import slugify from 'slugify';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as bookRouter } from './routes/books.js';

const __filename = fileURLToPath(import.meta.url);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static('assets'));
app.use('/images', express.static(__dirname, +'assets/images'));

app.use('/books', bookRouter);
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from the server');
// });

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
