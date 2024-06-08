<template>
  <v-dialog v-model="modalStore.open" max-width="500px" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Você Realmente Deseja Excluir o {{ name }}?</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="deleteUser">Sim</v-btn>
        <v-btn color="red darken-1" @click="closeModal">Não</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useDeleteModalStore } from '../../stores/modalStore';
import useUserData from '../../composables/useUserData';

const modalStore = useDeleteModalStore();

const { deleteUserById, fetchAllUsers } = useUserData();

const props = defineProps({
  id: Number,
  name: String
});

const emit = defineEmits(['user-delete']);

const deleteUser = async () => {
  if (props.id) {
    await deleteUserById(props.id);
    await fetchAllUsers(); 
    modalStore.closeModal();
    emit('user-delete');
  }
}

const closeModal = () => {
  modalStore.closeModal();
}
</script>
