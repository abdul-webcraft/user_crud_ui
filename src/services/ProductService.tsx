import axios, { AxiosResponse } from 'axios';

const BASE_API_URL = 'http://localhost:8085/api/';

interface Product {
  id?: number; // Optional, as it may not exist when creating a product
  name: string;
  // Add other relevant properties based on your product model
}

class ProductService {
  createProduct(product: Product): Promise<AxiosResponse> {
    return axios.post(`${BASE_API_URL}product`, product);
  }

  getAllProducts(): Promise<AxiosResponse<Product[]>> {
    return axios.get(`${BASE_API_URL}products`);
  }

  getProductById(id: number): Promise<AxiosResponse<Product>> {
    return axios.get(`${BASE_API_URL}product/${id}`);
  }

  deleteProduct(id: number): Promise<AxiosResponse> {
    return axios.delete(`${BASE_API_URL}product/${id}`);
  }

  updateProduct(product: Product): Promise<AxiosResponse> {
    if (!product.id) {
      throw new Error('Product ID is required for update');
    }
    return axios.put(`${BASE_API_URL}product/${product.id}`, product);
  }
}

export default new ProductService();
