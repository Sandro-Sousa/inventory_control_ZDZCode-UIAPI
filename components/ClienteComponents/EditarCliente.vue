<template>
  <v-dialog v-model="modalStore.open" max-width="500px" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Cliente</span>
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
import { ref, defineEmits, defineProps, watch } from 'vue';
import { useEditModalStore } from '../../stores/modalStore.ts';
import useUserData from '../../composables/useUserData.ts';
import type { User } from '../../interfaces/User.ts';

const modalStore = useEditModalStore();

const { updateUserById, fetchAllUsers } = useUserData();

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true
  }
});

const user = ref<User>({
  idUser: props.user.idUser || 0,
  name: props.user.name || '',
  email: props.user.email || '',
  fone: props.user.fone || ''
});

watch(() => props.user, (userEdit) => {
  if (userEdit) {
    user.value = { ...userEdit };
  }
});

const emit = defineEmits(['user-updated']);

const saveUser = async () => {
  await updateUserById(user.value);
  await fetchAllUsers(); 
  modalStore.closeModal();
  emit('user-updated');
}

const closeModal = () => {
  modalStore.closeModal();
}
</script>
