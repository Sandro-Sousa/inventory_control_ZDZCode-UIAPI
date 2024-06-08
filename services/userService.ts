import axios from 'axios';
import type { User, UserAdd } from '../interfaces/User';

const BASE_URL = 'https://localhost:7115/api/User/v1';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/GetAllUsers`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${BASE_URL}/GetUserById/${id}`);
  return response.data;
};

export const addUser = async (user: UserAdd): Promise<User> => {
  const response = await axios.post<User>(`${BASE_URL}/CreateUser`, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put<User>(`${BASE_URL}/UpdateUser/${user.idUser}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/DeleteUser/${id}`);
};
