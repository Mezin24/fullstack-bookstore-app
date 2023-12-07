import { Link } from 'react-router-dom';
import { IBook } from '../types';
import DefaultBookImage from '../assets/images/default.jpg';

interface BookProps {
  book: IBook;
}

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export const Book = ({ book }: BookProps) => {
  const { cover, price, title, id } = book;
  return (
    <div className='book-item'>
      <Link to={`/${id}`}>
        <img
          src={book?.cover ? `${IMAGES_URL}/${book.cover}` : DefaultBookImage}
          alt={title}
          className='cover-picture'
        />
      </Link>
      <div className='book-details'>
        <Link to={`/book/${id}`}>
          <h2 className='title'>{title}</h2>
        </Link>
        <h2 className='price'>${price}</h2>
        <button className='cart-btn'>Add Cart</button>
      </div>
    </div>
  );
};
