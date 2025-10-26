// Servicio para interactuar con la API de FakeStore
import axios from 'axios';
import type { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Obtener productos por categoría
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/category/${category}`);
  return response.data;
};

// Obtener todas las categorías
export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

export default api;

