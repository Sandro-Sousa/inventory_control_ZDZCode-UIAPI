import axios from 'axios';
import type { Product, ProductAdd } from '../interfaces/Product';

const BASE_URL = 'https://localhost:7115/api/Product/v1';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/GetAllProducts`);
  return response.data;
};

export const getProductById = async (idProduct: number): Promise<Product> => {
  const response = await axios.get<Product>(`${BASE_URL}/GetProductById/${idProduct}`);
  return response.data;
};

export const addProduct = async (product: ProductAdd): Promise<Product> => {
  const response = await axios.post<Product>(`${BASE_URL}/CreateProduct`, product);
  return response.data;
};

export const updateProduct = async (idProduct: Product): Promise<Product> => {
  const response = await axios.put<Product>(`${BASE_URL}/UpdateProduct/${idProduct.idProduct}`, idProduct);
  return response.data;
};

export const deleteProduct = async (idProduct: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/DeleteProduct/${idProduct}`);
};
