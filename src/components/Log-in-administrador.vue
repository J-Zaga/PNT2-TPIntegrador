<script setup>
import { ref } from 'vue'


const username = ref('')
const password = ref('')
const errorMessage = ref('')

const usuarios = [{
    usuario: "hola",
    password: "123"
}
]

function handleLogin(){
    const usuarioEncontrado = usuarios.find(user => user.usuario === username.value)
if (usuarioEncontrado && usuarioEncontrado.password === password.value) {
  alert('Login exitoso')
  errorMessage.value = ''
  // Aquí podrías redirigir a una página o cambiar el estado de autenticación
} else {
  errorMessage.value = 'Usuario o contraseña incorrectos'
}
}

</script>

<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Usuario:</label>
          <input v-model="username" type="text" id="username" placeholder="Ingresa tu usuario" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input v-model="password" type="password" id="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>
<style>
</style>
