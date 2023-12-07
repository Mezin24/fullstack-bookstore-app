import { useEffect, useState } from 'react';
import DefaultBookImage from '../assets/images/default.jpg';
import { IBook } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBook, getBook } from '../services/service';
import { Upsert } from '../components/Upsert';

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export const Details = () => {
  const [book, setBook] = useState<IBook | null>(null);
  const [open, setOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getBook(id)
      .then(({ data }) => setBook(data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async () => {
    try {
      book?.id && (await deleteBook(book.id));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (!book) {
    return <h1>Loading...</h1>;
  }

  const { author, desc, price, title, category, createdAt } = book;

  return (
    <div className='details'>
      {open && <Upsert setOpen={setOpen} book={book} />}

      <div className='container details-wrapper'>
        <div className='details-left'>
          <div className='cover'>
            <img
              src={
                book?.cover ? `${IMAGES_URL}/${book.cover}` : DefaultBookImage
              }
              alt='book'
              className='cover-picture'
            />
          </div>
        </div>
        <div className='details-right'>
          <div className='title-wrapper'>
            <i
              onClick={() => navigate('/')}
              className='fa-solid fa-arrow-left-long'
            ></i>
            <h2 className='title'>{title}</h2>
          </div>

          <div className='book-infos'>
            <div className='author'>
              <span>{author}</span>
              <span>{category?.name}</span>
              <span>{new Date(createdAt).toDateString()}</span>
            </div>
            <div className='actions'>
              <span
                className='fa-solid fa-edit edit-btn'
                onClick={() => setOpen(true)}
              ></span>
              <span
                className='fa-solid fa-trash delete-btn'
                onClick={handleDelete}
              ></span>
            </div>
          </div>

          <p className='body'>{desc}</p>
          <h1 className='price'>${price}</h1>

          <div className='quantity'>
            <span className='sub'>-</span>
            <span className='value'>1</span>
            <span className='add'>+</span>
          </div>
          <button>Add Cart</button>
        </div>
      </div>
    </div>
  );
};
