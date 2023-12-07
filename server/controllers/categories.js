import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*
  @ GET /categories
  @ get all categories
  @ Public
*/
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json({
      message: 'Success',
      data: categories,
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
// export const getBook = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const book = await prisma.book.findUnique({
//       where: {
//         slug,
//       },
//       select: {
//         author: true,
//         category: true,
//         cover: true,
//         desc: true,
//         id: true,
//         price: true,
//         slug: true,
//         title: true,
//         categoryId: true,
//         createdAt: true,
//         category: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//     });
//     res.status(200).json({
//       message: 'Success',
//       data: book,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Something went wrong...' });
//   }
// };
