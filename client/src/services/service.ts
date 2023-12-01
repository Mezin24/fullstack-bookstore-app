import axios from 'axios';
import { IBook } from '../types';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({ baseURL });

export const getBooks = () => request.get('/books');
export const getBook = (slug: string) => request.get(`/books/${slug}`);
export const createBook = (book: IBook) => request.post('/books', book);
export const updateBook = (book: IBook) =>
  request.put(`/books/${book.id}`, book);
export const deleteBook = (id: string) => request.delete(`/books/${id}`);
export const getCategories = () => request.get('/categories');
