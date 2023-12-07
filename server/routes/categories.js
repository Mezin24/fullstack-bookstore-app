import { Router } from 'express';
import { getAllCategories } from '../controllers/categories.js';

export const router = Router();

router.get('/', getAllCategories);
