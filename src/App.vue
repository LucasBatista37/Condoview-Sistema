<template>
  <div id="app">
    <wrapper /> <!-- Componente que vai incluir o <router-view /> -->
  </div>
</template>

<script>
import Wrapper from './layout/Wrapper.vue'; // Importa o componente Wrapper
export default {
  name: 'App',
  components: {
    Wrapper, // Registra o Wrapper como um componente
  },
};
</script>

<style lang="scss" src="./App.scss"></style>
