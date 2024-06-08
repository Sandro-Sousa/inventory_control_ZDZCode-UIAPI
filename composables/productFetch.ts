import { ref, computed } from 'vue';
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../services/productService';
import type { Product, ProductAdd } from '../interfaces/Product';

export default function useProductData() {
  const data = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);

  const fetchAllProducts = async () => {
    loading.value = true;
    try {
      data.value = await getAllProducts();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id: number) => {
    loading.value = true;
    try {
      product.value = await getProductById(id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (product: ProductAdd) => {
    loading.value = true;
    try {
      const newProduct = await addProduct(product);
      data.value.push(newProduct);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateProductById = async (product: Product) => {
    loading.value = true;
    try {
      const updatedProduct = await updateProduct(product);
      const index = data.value.findIndex(p => p.idProduct === product.idProduct);
      if (index !== -1) {
        data.value[index] = updatedProduct;
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteProductById = async (id: number) => {
    loading.value = true;
    try {
      await deleteProduct(id);
      data.value = data.value.filter(product => product.idProduct !== id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: computed(() => data.value),
    productEdit: computed(() => product.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    fetchAllProducts,
    fetchProductById,
    createProduct,
    updateProductById,
    deleteProductById
  };
}