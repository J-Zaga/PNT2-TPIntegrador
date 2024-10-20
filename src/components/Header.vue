<script setup>
import { ref } from "vue"
import { useRouter }  from 'vue-router'

const router = useRouter()

const props = defineProps({
    hideButtons: {type: Boolean, default: false}
})


const usuarioActual =  ref(JSON.parse(localStorage.getItem('usuarioActual')) || null)
const tipoUsuario = ref(usuarioActual.value ? usuarioActual.value.tipo : null)

function logOut(){
  localStorage.removeItem('usuarioActual')
  usuarioActual.value = null
  tipoUsuario.value = null
} 

</script>

<template>
    <header class="header">
      <router-link to="/" class="mascot-button">MascotApp</router-link>
      <nav>
        <ul class="nav-list">
          <li class="nav-item"><router-link to="/dashboard" v-if="!hideButtons && tipoUsuario == 'administrador'">Dashboard</router-link></li>
          <li class="nav-item"><router-link to="/formulario-servicio" v-if="!hideButtons && tipoUsuario == 'prestador'">Publicar</router-link></li>
          <li class="nav-item" v-if="!usuarioActual"><router-link to="/login" v-if="!hideButtons">Iniciar Sesión</router-link></li>
          <li class="nav-item" v-if="!usuarioActual"><router-link to="/signin" v-if="!hideButtons">Registrarse</router-link></li>
          <li class="nav-item"><router-link to="/carrito" v-if="!hideButtons && tipoUsuario == 'usuario'"><i class="fas fa-shopping-cart"></i></router-link></li>
          <li class="nav-item" v-if="usuarioActual"><router-link to="/" @click="logOut">Cerrar Sesión</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #9a67e2; 
    color: white;
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
    color: white; 
    text-decoration: none; 
    font-size: 16px; 
    cursor: pointer; 
  }
  
  .mascot-button:hover, .nav-item a:hover {
    text-decoration: underline; 
  }


  </style>