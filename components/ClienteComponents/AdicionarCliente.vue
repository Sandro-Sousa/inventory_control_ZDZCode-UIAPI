<template>
  <v-dialog v-model="modalStore.open" max-width="500px" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Cliente</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nome" v-model="user.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email" v-model="user.email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Telefone" v-model="user.fone"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="saveUser">Salvar</v-btn>
        <v-btn color="red darken-1" @click="closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { UserAdd } from '../../interfaces/User.ts';
import { useAddModalStore } from '../../stores/modalStore.ts';
import useUserData from '../../composables/useUserData.ts';

const modalStore = useAddModalStore();

const { createUser, fetchAllUsers } = useUserData();

const user = ref<UserAdd>({
  idUser: 0,
  name: '',
  email: '',
  fone: '',
});

const emit = defineEmits(['user-added']);

const saveUser = async () => {
  await createUser(user.value);
  await fetchAllUsers();
  modalStore.closeModal();
  emit('user-added');
}

const closeModal = () => {
  modalStore.closeModal();
  user.value = { idUser: 0, name: '', email: '', fone: '' }; 
}
</script>
