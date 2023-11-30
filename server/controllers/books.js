import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

/*
  @ GET /books
  @ get all books
  @ Public
*/
export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json({
      message: 'Success',
      data: books,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};

/*
  @ GET /books/:slug
  @ get current book
  @ Public
*/
export const getBook = async (req, res) => {
  try {
    const { slug } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        slug,
      },
    });
    res.status(200).json({
      message: 'Success',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};

/*
  @ POST /books
  @ add new book
  @ Public
*/
export const addNewBook = async (req, res) => {
  try {
    const { title, desc, cover, author, price, categoryId } = req.body;

    if (!title || !desc || !cover || !author || !price || !categoryId) {
      return res.status(404).json({ message: 'Please, fill in all fields' });
    }
    const book = await prisma.book.create({
      data: {
        title,
        desc,
        cover,
        author,
        price: +price,
        categoryId,
        slug: slugify(title, { lower: true, strict: true }),
      },
    });

    res.status(200).json({
      message: 'Success',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};

/*
  @ DELETE /books/:slug
  @ delete book
  @ Public
*/
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await prisma.book.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: `Book ${id} was successfully deleted`,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};
/*
  @ PUT /books
  @ add new book
  @ Public
*/
export const updateBook = async (req, res) => {
  try {
    const { slug } = req.params;
    const updatedBook = await prisma.book.update({
      where: {
        slug,
      },
      data: {
        ...req.body,
        slug: req.body.title
          ? slugify(req.body.title, { lower: true, strict: true })
          : slug,
      },
    });

    res.status(200).json({
      message: `Book ${updatedBook.slug} was successfully updated`,
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};
