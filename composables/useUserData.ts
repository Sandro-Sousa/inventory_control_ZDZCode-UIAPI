import { ref, computed } from 'vue';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../services/userService';
import type { User, UserAdd } from '../interfaces/User';

export default function useUserData() {
  const data = ref<User[]>([]);
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);

  const fetchAllUsers = async () => {
    loading.value = true;
    try {
      data.value = await getAllUsers();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserById = async (id: number) => {
    loading.value = true;
    try {
      user.value = await getUserById(id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (user: UserAdd) => {
    loading.value = true;
    try {
      const newUser = await addUser(user);
      data.value.push(newUser);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateUserById = async (user: User) => {
    loading.value = true;
    try {
      const updatedUser = await updateUser(user);
      const index = data.value.findIndex(u => u.idUser === user.idUser);
      if (index !== -1) {
        data.value[index] = updatedUser;
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteUserById = async (id: number) => {
    loading.value = true;
    try {
      await deleteUser(id);
      data.value = data.value.filter(user => user.idUser !== id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: computed(() => data.value),
    userEdit: computed(() => user.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUserById,
    deleteUserById
  };
}
