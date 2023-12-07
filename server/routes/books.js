import { Router } from 'express';
import {
  getAllBooks,
  getBook,
  addNewBook,
  updateBook,
  deleteBook,
} from '../controllers/books.js';

export const router = Router();

router.get('/', getAllBooks);
router.post('/', addNewBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
