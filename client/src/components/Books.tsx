import { IBook } from '../types';
import { Book } from './Book';

interface BookProps {
  books: IBook[];
}
export const Books = ({ books }: BookProps) => {
  return (
    <div className='books-list'>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};
