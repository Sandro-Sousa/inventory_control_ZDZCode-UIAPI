<template>
  <v-dialog v-model="modalStore.open" max-width="500px" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Produto</span>
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
import { ref, defineEmits, defineProps, watch } from 'vue';
import { useEditModalStore } from '../../stores/modalStore.ts';
import useProductData from '../../composables/productFetch.ts';
import type { Product } from '../../interfaces/Product.ts';

const modalStore = useEditModalStore();

const { updateProductById, fetchAllProducts } = useProductData();

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
});

const product = ref<Product>({
  idProduct: props.product.idProduct || 0,
  description: props.product.description || '',
  purchasePrice: props.product.purchasePrice || 0,
  saleValue: props.product.saleValue || 0,
  stockBalance: props.product.stockBalance || 0
});

watch(() => props.product, (productEdit) => {
  if (productEdit) {
    product.value = { ...productEdit };
  }
});

const emit = defineEmits(['product-updated']);

const saveProduct = async () => {
  await updateProductById(product.value);
  await fetchAllProducts(); 
  modalStore.closeModal();
  emit('product-updated');
}

const closeModal = () => {
  modalStore.closeModal();
}
</script>