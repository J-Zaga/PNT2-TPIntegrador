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
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor, complete todos los campos';
    return
  }

  try {
    let usuarioEncontrado = store.usuarios.find(user => user.usuario === username.value)
    if (usuarioEncontrado && usuarioEncontrado.password === password.value) {
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
  <div class="form-container">
    <h2 class="color-titulo-login">Iniciar Sesión</h2>
    <form @submit.prevent="Login">
      <input v-model="username" type="text" id="username" placeholder="Nombre usuario" required />
      <input v-model="password" type="password" id="password" placeholder="Contraseña" required />

      <button type="submit">Iniciar Sesión</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div class="links">
      <button class="text-button" @click="GoToSignIn">Sign-In</button>
    </div>
  </div>
</template>

<style scoped>

.color-titulo-login {
  color: #b496b3; 
}

.form-container {
  width: 360px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3ebec; 
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

input {
  background-color: white;
  color: black;
  width: 100%;
  padding: 15px; 
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px; 
  font-size: 16px;
  box-sizing: border-box; 
  transition: border-color 0.2s ease-in-out;
}

input:focus {
  border-color:  #b496b3e2; 
  outline: none;
}

button[type="submit"] {
  width: 100%;
  background-color: #b496b3; 
  color: white; 
  padding: 15px; 
  font-size: 16px;
  border: none;
  border-radius: 8px; 
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #b496b3; 
}

.error-message {
  color: red; 
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: center; 
  gap: 10px;
}

.text-button {
  background: none;
  border: none;
  color: #b496b3; 
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
}

.text-button:hover {
  color:  #b496b3; 
}

.text-button:focus {
  outline: none;
}
</style>