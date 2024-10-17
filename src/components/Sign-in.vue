<script setup>
import { ref } from 'vue'
import { userStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function SignIn() {
  const usuarioEncontrado = await userStore.usuarios.find(user => user.usuario === username.value)
  if (usuarioEncontrado) {
    alert('Esa cuenta ya existe')
  } else if (username.value.length > 4 && password.value.length > 4) {
    const user = {
      usuario: username.value,
      password: password.value
    }
    userStore.addUser(user)
    alert('Usuario Creado')
  } else {
    errorMessage.value = 'El nombre de usuario y la contraseña deben tener más de 4 caracteres'
  }
}

function GoToLogin() {
  router.push('/usuario')
}
function GoToHome(){
  router.push('/')
}

</script>

<template>
  <div class="form-container">
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="SignIn">
      <input v-model="username" type="text" id="username" placeholder="Nombre usuario" required />
      <input v-model="password" type="password" id="password" placeholder="Contraseña" required />

      <button type="submit">Crear</button>
    </form>

    <div class="links">
      <button class="text-button" @click="GoToLogin">Log-In</button>
      <span>&nbsp;&nbsp;</span>
      <button class="text-button" @click="GoToHome">Regresar</button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 360px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 8px;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  border-color: #0073b1;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  background-color: #0073b1;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #005582;
}

.links {
  margin-top: 20px;
}

.text-button {
  background: none;
  border: none;
  color: #0073b1;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
}

.text-button:hover {
  color: #005582;
}

.text-button:focus {
  outline: none;
}

span {
  display: inline-block;
}
</style>
