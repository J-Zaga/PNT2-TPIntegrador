<script setup>
import { computed } from "vue"
import { useRoute }  from 'vue-router'
import { useUserStore } from "../stores/userStore";

const route = useRoute()
const user = useUserStore()


const usuarioActual = computed(() => user.usuarioRegistrado)
const tipo = computed(() => usuarioActual.value ? usuarioActual.value.tipo : null)
const enLoginOSignin = computed(() => route.path === '/login' || route.path === '/signin')


function logOut(){
  user.usuarioRegistrado = null
} 

</script>

<template>
    <header class="header">
      <router-link to="/" class="mascot-button">MascotApp</router-link>
      <nav>
        <ul class="nav-list">
          <li class="nav-item"><router-link to="/dashboard" v-if="tipo == 'admin'">Dashboard</router-link></li>
          <li class="nav-item"><router-link to="/formulario-servicio" v-if="tipo == 'prestador'">Publicar</router-link></li>
          <li class="nav-item" v-if="!usuarioActual && !enLoginOSignin"><router-link to="/login">Iniciar Sesión</router-link></li>
          <li class="nav-item" v-if="!usuarioActual && !enLoginOSignin"><router-link to="/signin">Registrarse</router-link></li>
          <li class="nav-item"><router-link to="/carrito" v-if="tipo == 'usuario'"><i class="fas fa-shopping-cart"></i></router-link></li>
          <li class="nav-item" v-if="usuarioActual"><router-link to="/" @click="logOut">Cerrar Sesión</router-link></li>
        </ul>
      </nav>
    </header>
</template>
  
<style scoped>
  .header {
    background-color: #b496b3; 
    color: rgb(255, 255, 255);
    padding: 10px 20px; 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    z-index: 1000; 
    display: flex;
    justify-content: space-between; 
    align-items: center; 
  }
  
  .nav-list {
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: flex; 
    align-items: center; 
  }
  
  .nav-item {
    margin: 0 15px; 
  }
  
  .mascot-button, .nav-item a {
    color: rgb(255, 255, 255); 
    text-decoration: none; 
    font-size: 16px; 
    cursor: pointer; 
  }
  
  .mascot-button:hover, .nav-item a:hover {
    text-decoration: underline; 
  }


</style>