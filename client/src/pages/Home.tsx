import { useEffect, useState } from 'react';
import SearchIcon from '../assets/search.svg';
import { Books } from '../components/Books';
import { IBook } from '../types';
import { getBooks } from '../services/service';

export const Home = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const { data, status } = await getBooks();
        if (status === 200) {
          setBooks(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadAllBooks();
  }, []);

  console.log(books);

  return (
    <div className='home'>
      <div className='container'>
        <div className='filters'>
          <div className='filter-wrapper'>
            <button>Add Book</button>
          </div>
          <div className='search-wrapper'>
            <input type='text' placeholder='Search' />
            <img src={SearchIcon} alt='search icon' />
          </div>
        </div>
        <div className='booklist'>{<Books books={books} />}</div>
      </div>
    </div>
  );
};
