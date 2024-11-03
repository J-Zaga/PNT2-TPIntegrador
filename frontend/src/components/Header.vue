<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "../stores/userStore"

const route = useRoute()
const user = useUserStore()

const usuarioActual = computed(() => user.usuarioRegistrado)
const tipo = computed(() => (usuarioActual.value ? usuarioActual.value.tipo : null))
const enLoginOSignin = computed(() => route.path === "/login" || route.path === "/signin")

const totalServicios = computed(() => carritoStore.totalServicios)

function logOut() {
  user.usuarioRegistrado = null
}
</script>

<template>
  <header class="flex justify-between items-center bg-gray-100 p-4">
    <router-link to="/reservaciones" class="text-2xl lg:text-4xl font-black text-gray-700">MascotApp</router-link>
    
    <nav>
      <ul class="flex items-center space-x-4">
        <li v-if="tipo === 'admin'" class="text-gray-700 font-semibold">
          <router-link to="/dashboard" class="hover:text-gray-900">Dashboard</router-link>
        </li>
        
        <li v-if="tipo === 'prestador'" class="text-gray-700 font-semibold">
          <router-link to="/formulario-servicio" class="hover:text-gray-900">Publicar</router-link>
        </li>
        <li v-if="usuarioActual">
          <RouterLink>Mis citas</RouterLink>
        </li>
        <li v-if="usuarioActual">
          <RouterLink :to="{ name: 'new-appointment' }" class="text-gray-700 font-semibold">Nueva cita</RouterLink>
        </li>
        
        <li v-if="!usuarioActual && !enLoginOSignin" class="text-gray-700 font-semibold">
          <router-link to="/login" class="hover:text-gray-900">Iniciar Sesión</router-link>
        </li>
        
        <li v-if="!usuarioActual && !enLoginOSignin" class="text-gray-700 font-semibold">
          <router-link to="/signin" class="hover:text-gray-900">Registrarse</router-link>
        </li>
        
        <li v-if="usuarioActual" class="text-gray-700 font-semibold">
          <router-link to="/" @click="logOut" class="hover:text-gray-900">Cerrar Sesión</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
