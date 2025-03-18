import { Category } from './category.model';

export interface Budget {
  id: number;
  name: string;
  category: Category;
  amount: number;
  createdAt: string;
}
