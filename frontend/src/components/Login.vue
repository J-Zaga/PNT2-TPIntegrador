<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function Login() {
  try {
    let usuarioEncontrado = store.users.find(user => user.usuario === username.value)
    if (usuarioEncontrado && usuarioEncontrado.contraseña === password.value) {
      store.usuarioRegistrado = usuarioEncontrado
      alert('Login exitoso')
      router.push('/reservaciones/nueva')
    } else {
      errorMessage.value = "Usuario o contraseña incorrectos"
    }
  } catch (error) {
    console.error('Error durante el login:', error)
    errorMessage.value = 'Ocurrió un error inesperado'
  }
}

function GoToSignIn() {
  router.push('/signin')
}
</script>

<template>
  <div class="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-4 text-center">Iniciar Sesión</h2>
    <form @submit.prevent="Login" class="flex flex-col gap-4">
      <input
        v-model="username"
        type="text"
        id="username"
        placeholder="Nombre de usuario"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition duration-200"
        required
      />
      <input
        v-model="password"
        type="password"
        id="password"
        placeholder="Contraseña"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition duration-200"
        required
      />
      <button
        type="submit"
        class="w-full bg-purple-700 text-white font-semibold p-3 rounded-lg hover:bg-purple-600 transition-colors duration-200"
      >
        Iniciar Sesión
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>

    <div class="flex justify-center mt-4">
      <button
        @click="GoToSignIn"
        class="text-purple-700 underline hover:text-purple-600 transition-colors duration-200"
      >
        Registrarse
      </button>
    </div>
  </div>
</template>