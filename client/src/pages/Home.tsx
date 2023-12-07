import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '../assets/search.svg';
import { Books } from '../components/Books';
import { IBook } from '../types';
import { getBooks } from '../services/service';
import { Upsert } from '../components/Upsert';

export const Home = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [filterBooks, setFilterBooks] = useState<IBook[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const { data, status } = await getBooks();
        if (status === 200) {
          setBooks(data.data);
          setFilterBooks(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadAllBooks();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (search) {
      setFilterBooks(
        books.filter(
          (book) =>
            book.title.toLocaleLowerCase().includes(search.toLowerCase()) ||
            book.desc.toLocaleLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilterBooks(books);
    }
  };

  return (
    <div className='home'>
      {open && <Upsert setOpen={setOpen} />}
      <div className='container'>
        <div className='filters'>
          <div className='filter-wrapper'>
            <button onClick={() => setOpen(true)}>Add Book</button>
          </div>
          <div className='search-wrapper'>
            <input type='text' placeholder='Search' onChange={handleSearch} />
            <img src={SearchIcon} alt='search icon' />
          </div>
        </div>
        <div className='booklist'>{<Books books={filterBooks} />}</div>
      </div>
    </div>
  );
};
