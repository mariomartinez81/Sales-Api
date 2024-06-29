export interface CategoryProps {
  id: number;
  name: string;
  image?: string;
  createdAt?: any;
}

export interface CreateCategory {
  name: string;
  image?: string;
}
