<template>
   <v-navigation-drawer  class="box-navgation" theme="dark" permanent>
  <v-list-item title="Gestão de Estoque" subtitle="Cadastro"></v-list-item>
  <v-divider></v-divider>
  <v-list color="transparent">
    <v-list-item link prepend-icon="mdi-account-box" title="Clientes" @click="component = 'clientes'"></v-list-item>
        <v-list-item link prepend-icon="mdi-cube" title="Produtos" @click="component = 'produtos'"></v-list-item>
    </v-list>
</v-navigation-drawer>
      <v-main>
        <v-container>
        <v-sheet class="ma-10 pa-10">
            <Clientes v-if="component === 'clientes'"/>
            <Produtos v-if="component === 'produtos'"/>
        </v-sheet>
  </v-container>
      </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Clientes from '../components/ClienteComponents/Clientes.vue'
import Produtos from '../components/ProdutoComponets/Produtos.vue'
const component = ref('')

</script>

<style scoped>
   .box-navgation {
        background-color: rgb(86, 102, 117);
   }
</style>