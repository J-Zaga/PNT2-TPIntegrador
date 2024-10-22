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
    let usuarioEncontrado = store.usuarios.find(user => user.usuario === username.value)
    if (!usuarioEncontrado) {
      if (username.value.length > 4 && password.value.length > 4) {
        store.addUser({
          usuario: username.value,
          password: password.value,
          tipo: prestador.value ? 'prestador' : 'usuario',
        })
        alert('Cuenta creada')
        router.push('/login')
      } else {
        errorMessage.value = "El nombre de usuario y la contraseña deben tener mas de 4 caracteres"
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
  <div class="form-container">
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="SignIn">
      <input v-model="username" type="text" id="username" placeholder="Nombre usuario" required />
      <input v-model="password" type="password" id="password" placeholder="Contraseña" required />
      Prestador<input type="checkbox" v-model="prestador" />
      <button type="submit">Crear</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div class="links">
      <button class="text-button" @click="GoToLogin">Log-In</button>
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
  box-sizing: border-box;
}

input:focus {
  border-color: #9a67e2;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  background-color: #9a67e2;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #9a67e2;
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
  color: #9a67e2;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
}

.text-button:hover {
  color: #9a67e2;
}

.text-button:focus {
  outline: none;
}

span {
  display: inline-block;
}
</style>
