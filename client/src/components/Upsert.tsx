import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultBookImage from '../assets/images/default.jpg';
import { IBook, ICategory } from '../types';
import {
  createBook,
  getCategories,
  updateBook,
  uploadCover,
} from '../services/service';
import { useNavigate } from 'react-router-dom';

interface Props {
  book?: IBook;
  setOpen: (val: boolean) => void;
}

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export const Upsert = ({ book, setOpen }: Props) => {
  const [inputs, setInputs] = useState({
    title: book?.title || '',
    desc: book?.desc || '',
    author: book?.author || '',
    categoryId: book?.categoryId || '',
    price: book?.price || 0,
  });
  const [cover, setCover] = useState(
    book?.cover ? `${IMAGES_URL}/${book.cover}` : ''
  );

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [image, setImage] = useState<{
    file: File;
    filename: string;
    url: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'price' ? +e.target.value : e.target.value,
    }));
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        if (res.status === 200) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filename = await handleUploadImage();

    try {
      if (book) {
        await updateBook({
          ...inputs,
          id: book.id,
          slug: book.slug,
          cover: filename ? filename : book.cover,
          createdAt: new Date().toISOString(),
          price: +inputs.price,
        });
        setOpen(false);
        navigate('/');
      } else {
        const { data } = await createBook({
          ...inputs,
          cover: filename ? filename : '',
          createdAt: new Date().toISOString(),
          price: +inputs.price,
        });
        setOpen(false);
        navigate(`/${data.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length === 0) return;

    const file = e.target.files[0];
    const tmpImage = {
      file,
      filename: new Date().getTime() + '-' + file.name,
      url: URL.createObjectURL(file),
    };
    setImage(tmpImage);
  };

  const handleUploadImage = async () => {
    if (!image) return undefined;

    try {
      const formData = new FormData();
      formData.append('filename', image.filename);
      formData.append('file', image.file);

      const res = await uploadCover(formData);
      if (res.status == 200) {
        return image.filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='upsert' onClick={() => setOpen(false)}>
      <div className='upsert-wrapper' onClick={(e) => e.stopPropagation()}>
        <div className='heading-wrapper'>
          <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
          <div onClick={() => setOpen(false)}>
            <i className='fa-solid fa-rectangle-xmark'></i>
          </div>
        </div>

        <div className='upsert-form'>
          <div className='upsert-left'>
            <div className='upsert-cover'>
              <img
                src={image ? image?.url : cover ? cover : DefaultBookImage}
                alt=''
              />
            </div>
            <label htmlFor='cover' className='cover'>
              <input
                type='file'
                style={{ display: 'none' }}
                id='cover'
                accept='.jpg,.jpeg,.png'
                onChange={handleImage}
              />
              <i className='fa-solid fa-upload btn'>
                <span>Upload</span>
              </i>
            </label>
          </div>

          <form className='upsert-right' onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Title'
              required
              onChange={handleChange}
              value={inputs.title}
            />
            <input
              type='text'
              name='author'
              placeholder='Author'
              required
              onChange={handleChange}
              value={inputs.author}
            />
            <select
              onChange={handleChange}
              value={inputs.categoryId}
              name='categoryId'
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type='number'
              name='price'
              placeholder='Price'
              required
              onChange={handleChange}
              value={inputs.price}
              min={0.01}
              step={0.01}
            />
            <textarea
              name='desc'
              placeholder='Description'
              required
              onChange={handleChange}
              value={inputs.desc}
            />

            <div className='actions'>
              <button className='cancel-btn' onClick={handleCancel}>
                Cancel
              </button>
              <button className='save-btn' type='submit'>
                {book ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
