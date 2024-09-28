import axios, { AxiosResponse } from 'axios';

const BASE_API_URL = 'http://localhost:8085/api/';

interface User {
  id?: number; // Optional, as it may not exist when creating a user
  name: string;
  email: string;
  // Add other relevant properties based on your user model
}

interface Address {
  city: string;
  state: string;
  country: string;
  user: {
    id: number; // Assuming id is required for an address
  };
}

class UserService {
  createUser(user: User): Promise<AxiosResponse> {
    return axios.post(`${BASE_API_URL}user`, user);
  }

  createAddress(address: Address): Promise<AxiosResponse> {
    return axios.post(`${BASE_API_URL}address`, address);
  }

  getAllUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get(`${BASE_API_URL}users`);
  }

  getUserById(id: number): Promise<AxiosResponse<User>> {
    return axios.get(`${BASE_API_URL}user/${id}`);
  }

  deleteUser(id: number): Promise<AxiosResponse> {
    return axios.delete(`${BASE_API_URL}user/${id}`);
  }

  updateUser(user: User): Promise<AxiosResponse> {
    if (!user.id) {
      throw new Error('User ID is required for update');
    }
    return axios.put(`${BASE_API_URL}user/${user.id}`, user);
  }
}

export default new UserService();
