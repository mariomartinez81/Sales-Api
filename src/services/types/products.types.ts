export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  createdAt: Date | string;
  categoryId?: number;
}

export interface CreateProductProps {
  name: string;
  image?: string;
  description: string;
  price: number;
  categoryId?: number;
}

export interface ProductQuery {
  limit?: number;
  offset?: number;
  price?: number;
  price_min?: number;
  price_max?: number;
}
