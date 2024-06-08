<template>
  <v-container class="mb-5">
    <v-row justify="center">
      <v-col cols="12">
        <v-card-title class="text-center">
          <h1>Cadastro de Clientes</h1>
          <v-divider></v-divider>
        </v-card-title>
      </v-col>
      <v-col cols="12">
        <v-card-title>
          <v-btn color="success" prepend-icon="mdi-account-plus" @click="openAddModal">Incluir</v-btn>
          <AddClientModal v-model="addModalStore.open" @user-added="updateUsers"/>
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in data" :key="index" :data-id="user.idUser">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.name }}</td>
              <td>
                <v-btn  class="mr-2" color="primary" @click="editUser(user)" small>Editar</v-btn>
                <EditarModal v-if="selectedUser && selectedUser.idUser === user.idUser" :user="selectedUser" @user-updated="updateUsers"/>
                <v-btn color="error" @click="deleteUser(user.idUser, user.name)" small>Excluir</v-btn>
                <ExcluirClienteModal v-if="selectedId === user.idUser && selectName" :id="selectedId" :name="selectName" @user-delete="updateUsers"/>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import AddClientModal from './AdicionarCliente.vue';
import EditarModal from './EditarCliente.vue';
import ExcluirClienteModal from './ExcluirCliente.vue';
import useUserData from '../../composables/useUserData.ts'; 
import { useAddModalStore, useEditModalStore, useDeleteModalStore } from '../../stores/modalStore';
import type { User } from '../../interfaces/User.ts';

const addModalStore = useAddModalStore();
const editModalStore = useEditModalStore(); 
const deleteModalStore = useDeleteModalStore(); 

const { data, error, fetchAllUsers} = useUserData(); 

const selectedUser = ref<User | null>(null);
const selectedId = ref<number | null>(null);
const selectName = ref<string | null>(null);

const openAddModal = () => {
  selectedUser.value = null;
  selectedId.value = null;
  selectName.value = null;
  addModalStore.openModal();
};

const editUser = (user: User) => {
  selectedUser.value = user;
  editModalStore.openModal();
};

const deleteUser = async (id: number, name: string) => { 
  selectedId.value = Number(id);
  selectName.value = name;
  if (!deleteModalStore.open) {
    deleteModalStore.openModal();
  }
};

onMounted(async () => {
  await fetchAllUsers();
});


const updateUsers = async () => {
  await fetchAllUsers();
}

watch(error, (newError) => {
  if (newError) {
    console.error(newError);
  }
});

</script>
