<template>
  <v-dialog v-model="modalStore.open" max-width="500px" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Produto</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Descrição" v-model="product.description"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Preço de compra" v-model="product.purchasePrice" type="number"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Valor de venda" v-model="product.saleValue" type="number"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Saldo de estoque" v-model="product.stockBalance" type="number"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="saveProduct">Salvar</v-btn>
        <v-btn color="red darken-1" @click="closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { ProductAdd } from '../../interfaces/Product.ts';
import { useAddModalStore } from '../../stores/modalStore.ts';
import useProductData from '../../composables/productFetch.ts';

const modalStore = useAddModalStore();

const { createProduct, fetchAllProducts } = useProductData();

const product = ref<ProductAdd>({
  idProduct: 0,
  description: '',
  purchasePrice: 0,
  saleValue: 0,
  stockBalance: 0,
});

const emit = defineEmits(['product-added']);

const saveProduct = async () => {
  await createProduct(product.value);
  await fetchAllProducts();
  modalStore.closeModal();
  emit('product-added');
}

const closeModal = () => {
  modalStore.closeModal();
  product.value = { idProduct: 0, description: '', purchasePrice: 0, saleValue: 0, stockBalance: 0 }; 
}
</script>