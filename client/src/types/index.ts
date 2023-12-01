export interface IBook {
  id?: string;
  title: string;
  slug?: string;
  desc: string;
  cover: string;
  author: string;
  price: number;
  category?: string;
  categoryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
