<template>
  <v-container class="mb-5">
    <v-row justify="center">
      <v-col cols="12">
        <v-card-title class="text-center">
          <h1>Cadastro de Produtos</h1>
          <v-divider></v-divider>
        </v-card-title>
      </v-col>
      <v-col cols="12">
        <v-card-title>
          <v-btn color="success" prepend-icon="mdi-plus-box" @click="openAddModal">Incluir</v-btn>
          <AddProductModal v-model="addModalStore.open" @product-added="getAllProducts"/>
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
              <th>Descrição</th>
              <th>Preço de compra</th>
              <th>Valor de venda</th>
              <th>Saldo de estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in data" :key="index" :data-id="product.idProduct">
              <td>{{ product.description }}</td>
              <td>{{ product.purchasePrice }}</td>
              <td>{{ product.saleValue }}</td>
              <td>{{ product.stockBalance }}</td>
              <td>
                <v-btn  class="mr-2" color="primary" @click="editProduct(product)" small>Editar</v-btn>
                <EditProductModal v-if="selectedProduct && selectedProduct.idProduct === product.idProduct" :product="selectedProduct" @product-updated="getAllProducts"/>
                <v-btn color="error" @click="deleteProduct(product.idProduct, product.description)" small>Excluir</v-btn>
                <DeleteProductModal v-if="selectedId === product.idProduct && selectName" :id="selectedId" :name="selectName" @product-delete="getAllProducts"/>
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
import AddProductModal from './AdicionarProdutos.vue';
import EditProductModal from './EditarProdutos.vue';
import DeleteProductModal from './ExcluirProdutos.vue';
import useProductData from '../../composables/productFetch.ts'; 
import { useAddModalStore, useEditModalStore, useDeleteModalStore } from '../../stores/modalStore';
import type { Product } from '../../interfaces/Product.ts';

const addModalStore = useAddModalStore();
const editModalStore = useEditModalStore(); 
const deleteModalStore = useDeleteModalStore(); 

const { data, error, fetchAllProducts} = useProductData(); 

const selectedProduct = ref<Product | null>(null);
const selectedId = ref<number | null>(null);
const selectName = ref<string | null>(null);

const openAddModal = () => {
  selectedProduct.value = null;
  selectedId.value = null;
  selectName.value = null;
  addModalStore.openModal();
};

const editProduct = (product: Product) => {
  selectedProduct.value = product;
  editModalStore.openModal();
};

const deleteProduct = async (id: number, name: string) => { 
  console.log(name, "Nome Descrisao")
  selectedId.value = Number(id);
  selectName.value = name;
  console.log(selectName, "selectName")
  if (!deleteModalStore.open) {
    deleteModalStore.openModal();
  }
};

onMounted(async () => {
  await fetchAllProducts();
});


const getAllProducts = async () => {
  await fetchAllProducts();
}

watch(error, (newError) => {
  if (newError) {
    console.error(newError);
  }
});

</script>