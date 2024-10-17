<script setup>
/* import { ref } from 'vue' */
import { useRouter } from 'vue-router'
const router = useRouter()
function goToLogin() {
  router.push('/usuario');
}

function goToSignIn() {
  router.push('/usuario/signin');
}
</script>

<template>
  <div class="home-container">
    <h1>MascotApp</h1>
    <button class="text-button" @click="goToLogin">Iniciar Sesión</button>
    <button class="text-button" @click="goToSignIn">Registrarse</button>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
}

.text-button {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  outline: none;
}

.text-button:hover {
  color: darkblue;
}

.text-button:focus {
  outline: none; 
  border: none; 
}
</style>
