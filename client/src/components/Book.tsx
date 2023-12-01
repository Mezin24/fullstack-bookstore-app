import { Link } from 'react-router-dom';
import { IBook } from '../types';
import DefaultBookImage from '../assets/images/default.jpg';

interface BookProps {
  book: IBook;
}

export const Book = ({ book }: BookProps) => {
  const {
    id,
    author,
    category,
    categoryId,
    cover,
    createdAt,
    desc,
    price,
    slug,
    title,
    updatedAt,
  } = book;
  return (
    <div className='book-item'>
      <Link to={`/${slug}`}>
        <img
          src={cover ? cover : DefaultBookImage}
          alt={title}
          className='cover-picture'
        />
      </Link>
      <div className='book-details'>
        <Link to={`/book/${slug}`}>
          <h2 className='title'>{title}</h2>
        </Link>
        <h2 className='price'>${price}</h2>
        <button className='cart-btn'>Add Cart</button>
      </div>
    </div>
  );
};
