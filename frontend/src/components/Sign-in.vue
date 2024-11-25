<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const prestador = ref(false)

async function SignIn() {
  try {
    let usuarioEncontrado = store.getUsers().find(user => user.usuario === username.value)
    
    if (!usuarioEncontrado) {
      if (username.value.length > 4 && password.value.length > 4) {
        store.addUser({
          usuario: username.value,
          contraseña: password.value,
          rol: prestador.value ? 'prestador' : 'usuario',
          serviciosComprados: []
        })
        alert('Cuenta creada')
        window.location.href = '/login'
      } else {
        errorMessage.value = "El nombre de usuario y la contraseña deben tener más de 4 caracteres"
      }
    } else {
      errorMessage.value = "Esa cuenta ya existe"
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Ocurrió un error inesperado'
  }
}

function GoToLogin() {
  router.push('/login')
}

</script>

<template>
  <div class="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-4 text-center">Crear Cuenta</h2>
    <form @submit.prevent="SignIn" class="flex flex-col gap-4">
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
      <div class="flex items-center justify-center">
        <input
          type="checkbox"
          v-model="prestador"
          class="mr-2"
        />
        <label class="text-gray-700">Prestador</label>
      </div>
      <button
        type="submit"
        class="w-full bg-purple-700 text-white font-semibold p-3 rounded-lg hover:bg-purple-600 transition-colors duration-200"
      >
        Crear
      </button>
    </form>
    <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">{{ errorMessage }}</p>

    <div class="flex justify-center mt-4">
      <button
        class="text-purple-700 underline hover:text-purple-600 transition-colors duration-200"
        @click="GoToLogin"
      >
        Iniciar Sesión
      </button>
    </div>
  </div>
</template>