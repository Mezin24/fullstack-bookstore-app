export interface IBook {
  id?: string;
  title: string;
  slug?: string;
  desc: string;
  cover: string;
  author: string;
  price: number;
  categoryId?: string;
  createdAt: string;
  updatedAt?: string;
  category?: { id: string; name: string };
}

export interface ICategory {
  id: string;
  name: string;
  books: IBook[];
}
