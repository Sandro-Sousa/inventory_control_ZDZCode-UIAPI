<template>
  <v-dialog v-model="modalStore.open" max-width="600px" @click:outside="closeModal">
    <v-card>
      <v-card-title style="text-align: center;" >
        <span class="headline">Você Realmente Deseja Excluir o produto {{name?.toString()}} ?</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="deleteProduct">Sim</v-btn>
        <v-btn color="red darken-1" @click="closeModal">Não</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useDeleteModalStore } from '../../stores/modalStore';
import useProductData from '../../composables/productFetch';

const modalStore = useDeleteModalStore();

const { deleteProductById, fetchAllProducts } = useProductData();

const props = defineProps({
  id: Number,
  name: String
});

const emit = defineEmits(['product-delete']);

const deleteProduct = async () => {
  console.log(props.id, "props.idProduct")
  if (props.id) {
    console.log(props.id, "Id!!!!")
    await deleteProductById(props.id);
    await fetchAllProducts(); 
    modalStore.closeModal();
    emit('product-delete');
  }
  else {
    console.log("Erro ao deletar")
  }
}

const closeModal = () => {
  modalStore.closeModal();
}
</script>