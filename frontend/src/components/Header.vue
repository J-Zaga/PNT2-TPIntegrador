<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "../stores/userStore"

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const usuarioActual = computed(() => user.usuarioRegistrado)
const tipo = computed(() => (usuarioActual.value ? usuarioActual.value.rol : null))
const enLoginOSignin = computed(() => route.path === "/login" || route.path === "/signin")

function logOut() {
  user.setUsuarioRegistrado(null) 
  router.push("/")
}

</script>

<template>
  <header class="header flex justify-between items-center bg-gray-100 p-4">
    <router-link to="/" class="logo text-2xl lg:text-4xl font-black text-gray-700">MascotApp</router-link>

    <nav>
      <ul class="flex items-center space-x-4">
        <li v-if="tipo === 'administrador'" class="text-gray-700 font-semibold">
          <router-link to="/dashboard" class="hover:text-gray-900">Dashboard</router-link>
        </li>

        <li v-if="tipo === 'prestador'" class="text-gray-700 font-semibold">
          <router-link to= '/publicar-servicio' class="hover:text-gray-900">Publicar</router-link>
        </li>

        <li v-if="usuarioActual && tipo === 'usuario'" class="text-gray-700 font-semibold">
          <router-link to =/historial class="hover:text-gray-900">Historial</router-link>
        </li>

        <li v-if="usuarioActual && tipo === 'usuario' " class="text-gray-700 font-semibold">
          <router-link :to="{ name: 'new-appointment' }" class="hover:text-gray-900">Nueva cita</router-link>
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

<style scoped>
.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>