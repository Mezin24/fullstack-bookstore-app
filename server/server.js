import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import slugify from 'slugify';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as bookRouter } from './routes/books.js';
import { router as categoriesRouter } from './routes/categories.js';

const __filename = fileURLToPath(import.meta.url);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static('assets'));
app.use('/images', express.static(__dirname, +'assets/images'));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage });

app.use('/books', bookRouter);
app.use('/categories', categoriesRouter);
app.post('/images', upload.single('file'), (req, res) => {
  res.status(200).json('image uploaded');
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
