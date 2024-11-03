<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <Header />
  <div class="flex flex-col md:flex-row h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app"></div>
    <div class="md:w-2/3 px-10 py-5 flex-1 overflow-y-scroll">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>